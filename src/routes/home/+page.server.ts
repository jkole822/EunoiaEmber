import { and, eq, gt, sql } from 'drizzle-orm';
import { db } from '$lib/server/db';
import { requireLogin } from '$lib/utils';
import { freedomListItem, tracker, urge } from '$lib/server/db/schema';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const user = requireLogin();
	const trackerWithSlips = await db.query.tracker.findFirst({
		where: eq(tracker.userId, user.id),
		with: { slipDates: true }
	});

	const existingFreedomListItems = await db.query.freedomListItem.findMany({
		where: eq(freedomListItem.userId, user.id),
		orderBy: [sql`RANDOM()`],
		limit: 5
	});

	const oneYearAgo = new Date();
	oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
	const existingUrges = await db.query.urge.findMany({
		where: and(gt(urge.createdAt, oneYearAgo), eq(urge.userId, user.id)),
		orderBy: sql`to_timestamp(${urge.date} || ' ' || ${urge.time}, 'MM/DD/YYYY HH24:MI') DESC`
	});

	return {
		freedomListItems: existingFreedomListItems,
		tracker: trackerWithSlips,
		urges: existingUrges,
		user
	};
};
