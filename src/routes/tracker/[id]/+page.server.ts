import customParseFormat from 'dayjs/plugin/customParseFormat';
import dayjs from 'dayjs';
import { and, eq, sql } from 'drizzle-orm';
import { fail, redirect } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { getRequiredSting, requireLogin, validateAndRecordSlipDateTime } from '$lib/utils';
import { slipDate, tracker } from '$lib/server/db/schema';
import type { Actions, PageServerLoad } from './$types';

dayjs.extend(customParseFormat);

export const load: PageServerLoad = async ({ params }) => {
	const user = requireLogin();
	const trackerId = params.id;

	const [existingTracker] = await db
		.select()
		.from(tracker)
		.where(and(eq(tracker.userId, user.id), eq(tracker.id, trackerId)))
		.limit(1);

	if (!existingTracker) {
		return fail(404, { message: 'Page not found.' });
	}

	const existingSlipDates = await db
		.select()
		.from(slipDate)
		.where(eq(slipDate.trackerId, trackerId))
		.orderBy(sql`to_timestamp(${slipDate.date} || ' ' || ${slipDate.time}, 'YYYY-MM-DD HH24:MI')`);

	return {
		user,
		tracker: existingTracker,
		slipDates: existingSlipDates
	};
};

export const actions: Actions = {
	default: async (event) => {
		const formData = await event.request.formData();
		const trackerId = event.params.id;
		const anchorDate = getRequiredSting(formData, 'anchorDate', 'Anchor Date');
		const anchorTime = getRequiredSting(formData, 'anchorTime', 'Anchor Time');
		const slipDates = formData.getAll('slipDate');
		const slipTimes = formData.getAll('slipTime');

		if (typeof anchorDate !== 'string' || typeof anchorTime !== 'string') {
			return fail(400);
		}

		const format = 'YYYY-MM-DD HH:mm';
		const now = dayjs();
		const anchorDateTime = dayjs(`${anchorDate} ${anchorTime}`, format);

		if (!anchorDateTime.isValid()) {
			return fail(400, { message: 'Invalid anchor date/time format.' });
		}

		if (anchorDateTime.isAfter(now)) {
			return fail(400, { message: 'Anchor date cannot be in the future.' });
		}

		try {
			await db.update(tracker).set({ anchorDate, anchorTime }).where(eq(tracker.id, trackerId));
		} catch {
			return fail(500, { message: 'Failed to update tracker entry.' });
		}

		try {
			await db.delete(slipDate).where(eq(slipDate.trackerId, trackerId));

			slipDates.forEach((value, index) => {
				validateAndRecordSlipDateTime({
					anchorDateTime,
					date: value,
					time: slipTimes[index],
					trackerId
				});
			});
		} catch {
			return fail(500, { message: 'Failed to update slip dates.' });
		}

		return redirect(302, '/home');
	}
};
