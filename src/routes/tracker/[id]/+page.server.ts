import customParseFormat from 'dayjs/plugin/customParseFormat';
import dayjs from 'dayjs';
import { eq } from 'drizzle-orm';
import { fail, redirect } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { requireLogin, validateAndRecordSlipDateTime } from '$lib/utils';
import { slipDate, tracker } from '$lib/server/db/schema';
import type { Actions, PageServerLoad } from './$types';

dayjs.extend(customParseFormat);

export const load: PageServerLoad = async ({ params }) => {
	const user = requireLogin();
	const trackerId = params.id;

	const [existingTracker] = await db
		.select()
		.from(tracker)
		.where(eq(tracker.id, trackerId))
		.limit(1);

	if (!existingTracker) {
		return fail(404, { message: 'Page not found.' });
	}

	const existingSlipDates = await db
		.select()
		.from(slipDate)
		.where(eq(slipDate.trackerId, trackerId));

	const sortedSlipDates = existingSlipDates.toSorted((a, b) =>
		dayjs(`${a.date} ${a.time}`).isBefore(dayjs(`${b.date} ${b.time}`)) ? -1 : 1
	);

	return {
		user,
		tracker: existingTracker,
		slipDates: sortedSlipDates
	};
};

export const actions: Actions = {
	default: async (event) => {
		const formData = await event.request.formData();
		const trackerId = event.params.id;
		const anchorDate = formData.get('anchorDate');
		const anchorTime = formData.get('anchorTime');
		const slipDates = formData.getAll('slipDate');
		const slipTimes = formData.getAll('slipTime');

		if (!anchorDate || !anchorTime) {
			return fail(400, { message: 'Anchor date and time are required.' });
		}

		if (typeof anchorDate !== 'string' || typeof anchorTime !== 'string') {
			return fail(400, { message: 'Invalid form data.' });
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
