import { fail, redirect } from '@sveltejs/kit';
import { hash } from '@node-rs/argon2';
import * as table from '$lib/server/db/schema';
import { db } from '$lib/server/db';
import { eq } from 'drizzle-orm';
import { getRequiredSting } from '$lib/utils';
import { validateSessionToken } from '$lib/server/auth';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
	if (event.locals.user) {
		return redirect(302, '/home');
	}
	return {};
};

export const actions: Actions = {
	default: async (event) => {
		const formData = await event.request.formData();
		const password = getRequiredSting(formData, 'password', 'Password');
		const confirmPassword = getRequiredSting(formData, 'confirmPassword', 'Confirm Password');
		const token = event.url.searchParams.get('token');

		if (typeof password !== 'string' || typeof confirmPassword !== 'string') {
			return fail(400);
		}

		if (password.length < 6) {
			return fail(400, { message: 'Password must be at least 6 characters long.' });
		}

		if (password !== confirmPassword) {
			return fail(400, { message: 'Passwords do not match.' });
		}

		if (!token) {
			return fail(400, { message: 'Token is required' });
		}

		try {
			const { session, user } = await validateSessionToken(token, true);

			if (!session || !user) {
				return fail(400, { message: 'Invalid or expired token.' });
			}

			const passwordHash = await hash(password, {
				memoryCost: 19456,
				timeCost: 2,
				outputLen: 32,
				parallelism: 1
			});

			await db.update(table.user).set({ passwordHash }).where(eq(table.user.id, user.id));
			await db.delete(table.session).where(eq(table.session.id, session.id));
		} catch {
			return fail(500, { message: 'An error has occurred' });
		}

		return redirect(302, '/login');
	}
};
