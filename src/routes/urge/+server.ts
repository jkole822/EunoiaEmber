import { and, eq, sql, lt, gt, SQL } from 'drizzle-orm';
import { db } from '$lib/server/db';
import { urge } from '$lib/server/db/schema';
import { requireLogin } from '$lib/utils';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ url }) => {
	const user = requireLogin();
	const cursor = url.searchParams.get('cursor');
	const direction = url.searchParams.get('direction') ?? 'next';

	const baseWhereClause = eq(urge.userId, user.id);
	let whereClause = baseWhereClause;

	if (cursor) {
		if (direction === 'next') {
			whereClause = lt(
				sql`to_date(${urge.date}, 'MM/DD/YYYY')`,
				sql`to_date(${cursor}, 'MM/DD/YYYY')`
			);
		} else {
			whereClause = gt(
				sql`to_date(${urge.date}, 'MM/DD/YYYY')`,
				sql`to_date(${cursor}, 'MM/DD/YYYY')`
			);
		}

		whereClause = and(whereClause, baseWhereClause) as SQL<unknown>;
	}

	const query = db
		.select()
		.from(urge)
		.where(whereClause)
		.orderBy(sql`to_timestamp(${urge.date} || ' ' || ${urge.time}, 'MM/DD/YYYY HH24:MI') DESC`)
		.limit(10);

	const urges = await query;
	const nextCursor = urges.length > 0 ? urges[urges.length - 1].date : null;
	const prevCursor = urges.length > 0 ? urges[0].date : null;

	return new Response(JSON.stringify({ urges, nextCursor, prevCursor }), {
		headers: { 'Content-Type': 'application/json' }
	});
};
