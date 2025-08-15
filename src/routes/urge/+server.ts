import { and, eq, sql, lt, gt, SQL } from 'drizzle-orm';
import { db } from '$lib/server/db';
import { urge } from '$lib/server/db/schema';
import { requireLogin } from '$lib/utils';
import { URGE_LIMIT } from '$lib/constants';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ url }) => {
	const user = requireLogin();
	const cursor = url.searchParams.get('cursor');
	const direction = url.searchParams.get('direction') ?? 'next';

	const baseWhereClause = eq(urge.userId, user.id);
	let whereClause = baseWhereClause;
	let orderByClause = sql`to_timestamp(${urge.date} || ' ' || ${urge.time}, 'MM/DD/YYYY HH24:MI') DESC`;

	if (cursor) {
		if (direction === 'next') {
			whereClause = lt(
				sql`to_timestamp(${urge.date} || ' ' || ${urge.time}, 'MM/DD/YYYY HH24:MI')`,
				sql`to_timestamp(${cursor}, 'MM/DD/YYYY HH24:MI')`
			);
		} else {
			whereClause = gt(
				sql`to_timestamp(${urge.date} || ' ' || ${urge.time}, 'MM/DD/YYYY HH24:MI')`,
				sql`to_timestamp(${cursor}, 'MM/DD/YYYY HH24:MI')`
			);

			orderByClause = sql`to_timestamp(${urge.date} || ' ' || ${urge.time}, 'MM/DD/YYYY HH24:MI') ASC`;
		}

		whereClause = and(whereClause, baseWhereClause) as SQL<unknown>;
	}

	const query = db.query.urge.findMany({
		where: whereClause,
		orderBy: [orderByClause],
		limit: URGE_LIMIT
	});

	const urges = await query;

	if (direction === 'prev') urges.reverse();

	const lastUrge = urges.length > 0 ? urges[urges.length - 1] : null;
	const firstUrge = urges.length > 0 ? urges[0] : null;
	const nextCursor = lastUrge ? `${lastUrge.date} ${lastUrge.time}` : null;
	const prevCursor = firstUrge ? `${firstUrge.date} ${firstUrge.time}` : null;

	return new Response(JSON.stringify({ urges, nextCursor, prevCursor }), {
		headers: { 'Content-Type': 'application/json' }
	});
};
