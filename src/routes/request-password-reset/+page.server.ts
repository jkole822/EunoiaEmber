import { eq } from 'drizzle-orm';
import { fail, redirect } from '@sveltejs/kit';
import { createSession } from '$lib/server/auth';
import { db } from '$lib/server/db';
import { generateSessionToken } from '$lib/server/auth';
import { getRequiredSting } from '$lib/utils';
import { sendResetEmail } from './email';
import { user } from '$lib/server/db/schema';
import type { Actions, PageServerLoad } from './$types';

const FIFTEEN_MIN_IN_MS = 1000 * 60 * 15;

export const load: PageServerLoad = async (event) => {
	if (event.locals.user) {
		return redirect(302, '/home');
	}
	return {};
};

export const actions: Actions = {
	default: async (event) => {
		const formData = await event.request.formData();
		const email = getRequiredSting(formData, 'email', 'Email');

		if (typeof email !== 'string') {
			return fail(400);
		}

		try {
			const existingUser = await db.query.user.findFirst({
				where: eq(user.email, email.toLowerCase())
			});

			if (existingUser) {
				const token = generateSessionToken();
				await createSession(token, existingUser.id, new Date(Date.now() + FIFTEEN_MIN_IN_MS));
				await sendResetEmail(email, token);
			}

			return { message: 'If the email exists, a reset link was sent.' };
		} catch {
			return fail(500, { message: 'An error has occurred' });
		}
	}
};
