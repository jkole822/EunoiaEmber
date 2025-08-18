import dayjs from 'dayjs';
import { and, eq } from 'drizzle-orm';
import { error, fail, redirect } from '@sveltejs/kit';
import * as table from '$lib/server/db/schema';
import { db } from '$lib/server/db';
import { getOptionalString, getRequiredSting, requireLogin } from '$lib/utils';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const user = requireLogin();
	const urgeId = params.id;

	const urge = await db.query.urge.findFirst({
		where: and(eq(table.urge.userId, user.id), eq(table.urge.id, urgeId))
	});

	if (!urge) {
		return fail(404, { message: 'Page not found.' });
	}

	return {
		urge
	};
};

export const actions: Actions = {
	default: async (event) => {
		const formData = await event.request.formData();
		const urgeId = event.params.id;
		const date = getRequiredSting(formData, 'date', 'Urge date');
		const timeInput = getRequiredSting(formData, 'time', 'Urge time');
		const intensityInput = getRequiredSting(formData, 'intensity', 'Intensity');
		const intensity = Number(intensityInput);
		const notes = getOptionalString(formData, 'notes');

		if (typeof date !== 'string' || typeof timeInput !== 'string') {
			return fail(400);
		}

		const time = timeInput.trim();

		if (!dayjs(time, 'HH:mm', true).isValid()) {
			return fail(400, { message: 'Invalid time format. Use HH:mm.' });
		}

		if (!Number.isFinite(intensity)) {
			return fail(400, { message: 'Intensity must be a number.' });
		}

		try {
			await db
				.update(table.urge)
				.set({
					date,
					time,
					intensity,
					notes
				})
				.where(eq(table.urge.id, urgeId));
		} catch {
			return fail(500, { message: 'Failed to update urge entry.' });
		}

		return redirect(302, '/home');
	}
};
