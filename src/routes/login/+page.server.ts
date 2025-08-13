import { eq } from 'drizzle-orm';
import { fail, redirect } from '@sveltejs/kit';
import { verify } from '@node-rs/argon2';
import * as auth from '$lib/server/auth';
import { db } from '$lib/server/db';
import { getRequiredSting } from '$lib/utils';
import { user } from '$lib/server/db/schema';
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
		const email = getRequiredSting(formData, 'email', 'Email');
		const password = getRequiredSting(formData, 'password', 'Password')

		if (typeof email !== 'string' || typeof password !== 'string') {
			return fail(400);
		}

		const emailToLowerCase = email.toLowerCase();
		const results = await db.select().from(user).where(eq(user.email, emailToLowerCase));

		const existingUser = results.at(0);
		if (!existingUser) {
			return fail(400, { message: 'Incorrect username or password' });
		}

		const validPassword = await verify(existingUser.passwordHash, password, {
			memoryCost: 19456,
			timeCost: 2,
			outputLen: 32,
			parallelism: 1
		});

		if (!validPassword) {
			return fail(400, { message: 'Incorrect username or password' });
		}

		const sessionToken = auth.generateSessionToken();
		const session = await auth.createSession(sessionToken, existingUser.id);
		auth.setSessionTokenCookie(event, sessionToken, session.expiresAt);

		return redirect(302, '/home');
	}
};
