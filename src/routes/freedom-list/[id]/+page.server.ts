import { and, eq } from 'drizzle-orm';
import { fail, redirect } from '@sveltejs/kit';
import * as table from '$lib/server/db/schema';
import { db } from '$lib/server/db';
import { getRequiredSting } from '$lib/utils';
import { requireLogin } from '$lib/utils';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const user = requireLogin();
	const freedomListItemId = params.id;

	const freedomListItem = await db.query.freedomListItem.findFirst({
		where: and(
			eq(table.freedomListItem.userId, user.id),
			eq(table.freedomListItem.id, freedomListItemId)
		)
	});

	if (!freedomListItem) {
		return fail(404, { message: 'Page not found.' });
	}

	return {
		freedomListItem
	};
};

export const actions: Actions = {
	default: async (event) => {
		const formData = await event.request.formData();
		const freedomListItemId = event.params.id;
		const reason = getRequiredSting(formData, 'reason', 'Reason');
		const isPositive = formData.has('polarity');

		if (typeof reason !== 'string') {
			return fail(400);
		}

		try {
			await db
				.update(table.freedomListItem)
				.set({
					polarity: isPositive ? 'positive' : 'negative',
					reason
				})
				.where(eq(table.freedomListItem.id, freedomListItemId));
		} catch {
			return fail(500, { message: 'Failed to update freedom list item entry.' });
		}

		return redirect(302, '/home');
	}
};
