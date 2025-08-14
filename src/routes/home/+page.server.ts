import { and, eq, gt, sql } from 'drizzle-orm';
import { db } from '$lib/server/db';
import { requireLogin } from '$lib/utils';
import { slipDate, tracker, urge } from '$lib/server/db/schema';
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

	const oneYearAgo = new Date();
	oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
	const existingUrges = await db
		.select()
		.from(urge)
		.where(and(gt(urge.createdAt, oneYearAgo), eq(urge.userId, user.id)))
		.orderBy(sql`to_timestamp(${urge.date} || ' ' || ${urge.time}, 'MM/DD/YYYY HH24:MI') DESC`);

	return {
		user,
		tracker: existingTracker,
		slipDates: existingSlipDates,
		urges: existingUrges
	};
};
