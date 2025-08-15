import { count, desc, eq } from 'drizzle-orm';
import { db } from '$lib/server/db';
import { freedomListItem } from '$lib/server/db/schema';
import { requireLogin } from '$lib/utils';
import { FREEDOM_LIST_ITEM_LIMIT } from '$lib/constants';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const user = requireLogin();

	const existingFreedomListItems = await db.query.freedomListItem.findMany({
		where: eq(freedomListItem.userId, user.id),
		orderBy: [desc(freedomListItem.createdAt)],
		limit: FREEDOM_LIST_ITEM_LIMIT
	});

	const [freedomListItemCount] = await db.select({ count: count() }).from(freedomListItem);

	const cursor =
		existingFreedomListItems.length > 0
			? existingFreedomListItems[existingFreedomListItems.length - 1].createdAt
			: null;

	return {
		count: freedomListItemCount.count,
		cursor: cursor ? cursor.toISOString() : null,
		freedomListItems: existingFreedomListItems
	};
};
