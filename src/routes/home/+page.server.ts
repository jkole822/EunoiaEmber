import { eq } from 'drizzle-orm';
import { db } from '$lib/server/db';
import { requireLogin } from '$lib/utils';
import { slipDate, tracker } from '$lib/server/db/schema';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const user = requireLogin();
	const [existingTracker] = await db
		.select()
		.from(tracker)
		.where(eq(tracker.userId, user.id))
		.limit(1);

	const existingSlipDates = await db
		.select()
		.from(slipDate)
		.where(eq(slipDate.trackerId, existingTracker?.id));

	return {
		user,
		tracker: existingTracker,
		slipDates: existingSlipDates
	};
};
