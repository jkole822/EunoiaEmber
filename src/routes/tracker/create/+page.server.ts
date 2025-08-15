import customParseFormat from 'dayjs/plugin/customParseFormat';
import dayjs from 'dayjs';
import { db } from '$lib/server/db';
import { eq } from 'drizzle-orm';
import { fail, redirect } from '@sveltejs/kit';
import { generateId, getRequiredSting } from '$lib/utils';
import { requireLogin, validateAndRecordSlipDateTime } from '$lib/utils';
import { tracker } from '$lib/server/db/schema';
import type { Actions, PageServerLoad } from './$types';
import type { TrackerInsert } from '$lib/server/db/schema';

dayjs.extend(customParseFormat);

export const load: PageServerLoad = async () => {
	const user = requireLogin();
	const existingTracker = await db.query.tracker.findFirst({
		where: eq(tracker.userId, user.id)
	})

	if (existingTracker) {
		return redirect(302, `/tracker/${existingTracker.id}`);
	}

	return { user };
};

export const actions: Actions = {
	default: async (event) => {
		const formData = await event.request.formData();
		const user = requireLogin();
		const anchorDate = getRequiredSting(formData, 'anchorDate', 'Anchor Date')
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

		const trackerValues: TrackerInsert = {
			id: generateId(),
			anchorDate,
			anchorTime,
			userId: user.id
		};

		try {
			const [createdTracker] = await db
				.insert(tracker)
				.values(trackerValues)
				.returning({ id: tracker.id });

			slipDates.forEach((value, index) => {
				validateAndRecordSlipDateTime({
					anchorDateTime,
					date: value,
					time: slipTimes[index],
					trackerId: createdTracker.id
				});
			});
		} catch {
			return fail(500, { message: 'Failed to create tracker entry.' });
		}
		return redirect(302, '/home');
	}
};
