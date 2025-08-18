import { and, eq } from 'drizzle-orm';
import { error, json, type RequestHandler } from '@sveltejs/kit';
import * as table from '$lib/server/db/schema';
import { db } from '$lib/server/db';
import { requireLogin } from '$lib/utils';

export const DELETE: RequestHandler = async ({ params }) => {
	const user = requireLogin();
	const urgeId = params.id;

	if (!urgeId) {
		throw error(400, 'Entry ID not provided.');
	}

	try {
		await db
			.delete(table.urge)
			.where(and(eq(table.urge.userId, user.id), eq(table.urge.id, urgeId)));
	} catch {
		throw error(400, 'Failed to delete urge entry.');
	}

	return json({ success: true });
};
