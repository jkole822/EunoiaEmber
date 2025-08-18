import { and, eq } from 'drizzle-orm';
import { error, json, type RequestHandler } from '@sveltejs/kit';
import * as table from '$lib/server/db/schema';
import { db } from '$lib/server/db';
import { requireLogin } from '$lib/utils';

export const DELETE: RequestHandler = async ({ params }) => {
	const user = requireLogin();
	const freedomListItemId = params.id;

	if (!freedomListItemId) {
		throw error(400, 'Entry ID not provided.');
	}

	try {
		await db
			.delete(table.freedomListItem)
			.where(
				and(
					eq(table.freedomListItem.userId, user.id),
					eq(table.freedomListItem.id, freedomListItemId)
				)
			);
	} catch {
		throw error(400, 'Failed to delete freedom list item entry.');
	}

	return json({ success: true });
};
