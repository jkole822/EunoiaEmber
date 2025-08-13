import { and, eq } from 'drizzle-orm';
import { fail, redirect } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { getOptionalString, getRequiredSting, requireLogin } from '$lib/utils';
import { urge } from '$lib/server/db/schema';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const user = requireLogin();
	const urgeId = params.id;

	const [existingUrge] = await db
		.select()
		.from(urge)
		.where(and(eq(urge.userId, user.id), eq(urge.id, urgeId)))
		.limit(1);

	if (!existingUrge) {
		return fail(404, { message: 'Page not found.' });
	}

	return {
		urge: existingUrge
	};
};

export const actions: Actions = {
	default: async (event) => {
		const formData = await event.request.formData();
		const urgeId = event.params.id;

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

			await db
				.update(urge)
				.set({
					date,
					time,
					intensity,
					notes
				})
				.where(eq(urge.id, urgeId));
		} catch {
			return fail(500, { message: 'Failed to update urge entry.' });
		}

		return redirect(302, '/home');
	}
};
