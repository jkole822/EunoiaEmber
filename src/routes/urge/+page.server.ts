import { count, eq, sql } from 'drizzle-orm';
import { db } from '$lib/server/db';
import { requireLogin } from '$lib/utils';
import { urge } from '$lib/server/db/schema';
import { URGE_LIMIT } from '$lib/constants';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const user = requireLogin();

	const existingUrges = await db.query.urge.findMany({
		where: eq(urge.userId, user.id),
		orderBy: sql`to_timestamp(${urge.date} || ' ' || ${urge.time}, 'MM/DD/YYYY HH24:MI') DESC`,
		limit: URGE_LIMIT
	});

	const [urgeCount] = await db.select({ count: count() }).from(urge);

	const cursor = existingUrges.length > 0 ? existingUrges[existingUrges.length - 1].date : null;

	return {
		count: urgeCount.count,
		cursor,
		urges: existingUrges
	};
};
