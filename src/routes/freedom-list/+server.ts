import { and, asc, desc, eq, gt, lt, SQL } from 'drizzle-orm';
import { db } from '$lib/server/db';
import { freedomListItem } from '$lib/server/db/schema';
import { requireLogin } from '$lib/utils';
import { FREEDOM_LIST_ITEM_LIMIT } from '$lib/constants';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ url }) => {
	const user = requireLogin();
	const cursor = url.searchParams.get('cursor');
	const direction = url.searchParams.get('direction') ?? 'next';

	const baseWhereClause = eq(freedomListItem.userId, user.id);
	let whereClause = baseWhereClause;
	let orderByClause = desc(freedomListItem.createdAt);

	if (cursor) {
		if (direction === 'next') {
			whereClause = lt(freedomListItem.createdAt, new Date(cursor));
		} else {
			whereClause = gt(freedomListItem.createdAt, new Date(cursor));

			orderByClause = asc(freedomListItem.createdAt);
		}

		whereClause = and(whereClause, baseWhereClause) as SQL<unknown>;
	}

	const query = db.query.freedomListItem.findMany({
		where: whereClause,
		orderBy: [orderByClause],
		limit: FREEDOM_LIST_ITEM_LIMIT
	});

	const freedomListItems = await query;

	if (direction === 'prev') freedomListItems.reverse();

	const lastItemCreatedAt =
		freedomListItems.length > 0 ? freedomListItems[freedomListItems.length - 1].createdAt : null;
	const firstItemCreatedAt = freedomListItems.length > 0 ? freedomListItems[0].createdAt : null;
	const nextCursor = lastItemCreatedAt ? lastItemCreatedAt.toISOString() : null;
	const prevCursor = firstItemCreatedAt ? firstItemCreatedAt.toISOString() : null;

	return new Response(
		JSON.stringify({
			freedomListItems,
			nextCursor,
			prevCursor
		}),
		{
			headers: { 'Content-Type': 'application/json' }
		}
	);
};
