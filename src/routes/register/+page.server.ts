import * as auth from '$lib/server/auth';
import { fail, redirect } from '@sveltejs/kit';
import { hash } from '@node-rs/argon2';
import { db } from '$lib/server/db';
import { generateId } from '$lib/utils';
import { user } from '$lib/server/db/schema';
import type { Actions, PageServerLoad } from './$types';
import type { UserInsert } from '$lib/server/db/schema';

export const load: PageServerLoad = async (event) => {
	if (event.locals.user) {
		return redirect(302, '/home');
	}
	return {};
};

export const actions: Actions = {
	default: async (event) => {
		const formData = await event.request.formData();
		const emailRaw = formData.get('email');
		const passwordRaw = formData.get('password');

		if (!emailRaw || !passwordRaw) {
			return fail(400, { message: 'Email and password are required.' });
		}

		if (typeof emailRaw !== 'string' || typeof passwordRaw !== 'string') {
			return fail(400, { message: 'Invalid form data.' });
		}

		const email = emailRaw.trim().toLowerCase();
		const password = passwordRaw.trim();

		if (!isValidEmail(email)) {
			return fail(400, { message: 'Please provide a valid email address.' });
		}

		if (password.length < 6) {
			return fail(400, { message: 'Password must be at least 6 characters long.' });
		}

		const userId = generateId();

		const passwordHash = await hash(password, {
			memoryCost: 19456,
			timeCost: 2,
			outputLen: 32,
			parallelism: 1
		});

		const userValues: UserInsert = {
			id: userId,
			email,
			passwordHash
		};

		try {
			await db.insert(user).values(userValues);
			const sessionToken = auth.generateSessionToken();
			const session = await auth.createSession(sessionToken, userId);
			auth.setSessionTokenCookie(event, sessionToken, session.expiresAt);
		} catch {
			return fail(500, { message: 'An error has occurred' });
		}
		return redirect(302, '/home');
	}
};

function isValidEmail(email: string) {
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
	return emailRegex.test(email);
}
