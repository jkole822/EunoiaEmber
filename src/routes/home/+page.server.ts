import { and, desc, eq, gt, sql } from 'drizzle-orm';
import { db } from '$lib/server/db';
import { requireLogin } from '$lib/utils';
import { freedomListItem, slipDate, tracker, urge } from '$lib/server/db/schema';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const user = requireLogin();
	const existingTracker = await db.query.tracker.findFirst({
		where: eq(tracker.userId, user.id)
	});

	const existingSlipDates = await db.query.slipDate.findMany({
		where: eq(slipDate.trackerId, existingTracker?.id ?? '')
	});

	const existingFreedomListItems = await db.query.freedomListItem.findMany({
		where: eq(freedomListItem.userId, user.id),
		orderBy: [sql`RANDOM()`],
		limit: 5
	});

	const oneYearAgo = new Date();
	oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
	const existingUrges = await db
		.select()
		.from(urge)
		.where(and(gt(urge.createdAt, oneYearAgo), eq(urge.userId, user.id)))
		.orderBy(sql`to_timestamp(${urge.date} || ' ' || ${urge.time}, 'MM/DD/YYYY HH24:MI') DESC`);

	return {
		freedomListItems: existingFreedomListItems,
		slipDates: existingSlipDates,
		tracker: existingTracker,
		urges: existingUrges,
		user
	};
};
