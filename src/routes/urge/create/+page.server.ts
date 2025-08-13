import { fail, redirect } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { generateId, requireLogin } from '$lib/utils';
import { getRequiredSting, getOptionalString } from '$lib/utils';
import { urge } from '$lib/server/db/schema';
import type { Actions } from './$types';
import type { UrgeInsert } from '$lib/server/db/schema';

export const actions: Actions = {
	default: async (event) => {
		const formData = await event.request.formData();
		const user = requireLogin();

		try {
			const date = getRequiredSting(formData, 'date', 'Urge date');
			const time = getRequiredSting(formData, 'time', 'Urge time');
			const intensityRaw = getRequiredSting(formData, 'intensity', 'Intensity');
			const intensity = Number(intensityRaw);
			const notes = getOptionalString(formData, 'notes');

			if (typeof date !== 'string' || typeof time !== 'string') {
				return fail(400);
			}

			if (!Number.isFinite(intensity)) {
				return fail(400, { message: 'Intensity must be a number.' });
			}

			const urgeValues: UrgeInsert = {
				id: generateId(),
				date,
				time,
				intensity,
				notes,
				userId: user.id
			};

			await db.insert(urge).values(urgeValues);
		} catch {
			return fail(500, { message: 'Failed to create urge entry.' });
		}

		return redirect(302, '/home');
	}
};
