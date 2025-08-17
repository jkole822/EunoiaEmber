import { and, eq } from 'drizzle-orm';
import { fail, redirect } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { freedomListItem } from '$lib/server/db/schema';
import { getRequiredSting } from '$lib/utils';
import { requireLogin } from '$lib/utils';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const user = requireLogin();
	const freedomListItemId = params.id;

	const [existingFreedomListItem] = await db
		.select()
		.from(freedomListItem)
		.where(and(eq(freedomListItem.userId, user.id), eq(freedomListItem.id, freedomListItemId)))
		.limit(1);

	if (!existingFreedomListItem) {
		return fail(404, { message: 'Page not found.' });
	}

	return {
		freedomListItem: existingFreedomListItem
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
				.update(freedomListItem)
				.set({
					polarity: isPositive ? 'positive' : 'negative',
					reason
				})
				.where(eq(freedomListItem.id, freedomListItemId));
		} catch {
			return fail(500, { message: 'Failed to update freedom list item entry.' });
		}

		return redirect(302, '/home');
	}
};
