import { fail, redirect } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { freedomListItem } from '$lib/server/db/schema';
import { generateId, requireLogin } from '$lib/utils';
import { getRequiredSting } from '$lib/utils';
import type { Actions } from './$types';
import type { FreedomListItemInsert } from '$lib/server/db/schema';

export const actions: Actions = {
	default: async (event) => {
		const formData = await event.request.formData();
		const user = requireLogin();

		try {
			const reason = getRequiredSting(formData, 'reason', 'Reason');
			const isPositive = formData.has('polarity');

			if (typeof reason !== 'string') {
				return fail(400);
			}

			const freedomListItemValues: FreedomListItemInsert = {
				id: generateId(),
				polarity: isPositive ? 'positive' : 'negative',
				reason,
				userId: user.id
			};

			await db.insert(freedomListItem).values(freedomListItemValues);
		} catch {
			return fail(500, { message: 'Failed to create freedom list item entry.' });
		}

		return redirect(302, '/home');
	}
};
