import customParseFormat from 'dayjs/plugin/customParseFormat';
import dayjs from 'dayjs';
import { and, eq, sql } from 'drizzle-orm';
import { fail, redirect } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import {
	getRequiredSting,
	recordSlipDateTime,
	requireLogin,
	validateAndTrimSlipDateTime
} from '$lib/utils';
import { slipDate, tracker } from '$lib/server/db/schema';
import type { Actions, PageServerLoad } from './$types';
import type { HttpError } from '@sveltejs/kit';

dayjs.extend(customParseFormat);

export const load: PageServerLoad = async ({ params }) => {
	const user = requireLogin();
	const trackerId = params.id;

	const trackerWithSlips = await db.query.tracker.findFirst({
		where: and(eq(tracker.userId, user.id), eq(tracker.id, trackerId)),
		with: {
			slipDates: {
				orderBy: sql`to_timestamp(${slipDate.date} || ' ' || ${slipDate.time}, 'YYYY-MM-DD HH24:MI')`
			}
		}
	});

	return {
		tracker: trackerWithSlips
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

		if (!dayjs(anchorDate, 'YYYY-MM-DD', true).isValid()) {
			return fail(400, { message: 'Invalid anchor date format. Use YYYY-MM-DD.' });
		}

		if (!dayjs(anchorTime, 'HH:mm', true).isValid()) {
			return fail(400, { message: 'Invalid anchor time format. Use HH:mm.' });
		}

		const format = 'YYYY-MM-DD HH:mm';
		const now = dayjs();
		const anchorDateTime = dayjs(`${anchorDate} ${anchorTime}`, format);

		if (anchorDateTime.isAfter(now)) {
			return fail(400, { message: 'Anchor date cannot be in the future.' });
		}

		let slipDateTimes = [];

		try {
			slipDateTimes = slipDates.map((value) =>
				validateAndTrimSlipDateTime({
					anchorDateTime,
					date: value,
					time: slipTimes[slipDates.indexOf(value)]
				})
			);

			await db.update(tracker).set({ anchorDate, anchorTime }).where(eq(tracker.id, trackerId));
		} catch (error) {
			if ((error as HttpError).body?.message) {
				return fail(400, { message: (error as HttpError).body.message });
			}

			return fail(500, { message: 'Failed to update tracker entry.' });
		}

		try {
			await db.delete(slipDate).where(eq(slipDate.trackerId, trackerId));

			slipDateTimes.forEach((value) => {
				recordSlipDateTime({
					...value,
					trackerId
				});
			});
		} catch (error) {
			if ((error as HttpError).body?.message) {
				return fail(400, { message: (error as HttpError).body.message });
			}

			return fail(500, { message: 'Failed to slip date entries.' });
		}

		return redirect(302, '/home');
	}
};
