import { db } from '$lib/server/db';
import { eq } from 'drizzle-orm';
import { fail, redirect } from '@sveltejs/kit';
import { hash, verify } from '@node-rs/argon2';
import * as table from '$lib/server/db/schema';
import { deleteSessionTokenCookie, invalidateSession } from '$lib/server/auth';
import { getRequiredSting, requireLogin } from '$lib/utils';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	requireLogin();
};

export const actions: Actions = {
	deleteAccount: async (event) => {
		const formData = await event.request.formData();
		const user = requireLogin();
		const confirmationInput = getRequiredSting(formData, 'confirmation', 'Confirmation Text');
		const password = getRequiredSting(formData, 'password', 'Password');

		if (typeof confirmationInput !== 'string' || typeof password !== 'string') {
			return fail(400);
		}

		const confirmation = confirmationInput.toLowerCase().trim();

		if (confirmation !== 'delete my account') {
			return fail(400, { message: 'Invalid confirmation text.' });
		}

		try {
			const existingUser = await db.query.user.findFirst({
				where: eq(table.user.id, user.id)
			});

			if (!existingUser) {
				return fail(404, { message: 'User not found' });
			}

			const validPassword = await verify(existingUser.passwordHash, password, {
				memoryCost: 19456,
				timeCost: 2,
				outputLen: 32,
				parallelism: 1
			});

			if (!validPassword) {
				return fail(400, { message: 'Incorrect password' });
			}

			if (event.locals.session) {
				await db.delete(table.session).where(eq(table.session.userId, user.id));
				await invalidateSession(event.locals.session.id);
				deleteSessionTokenCookie(event);
			}

			await db.delete(table.user).where(eq(table.user.id, user.id));
		} catch {
			return fail(500, { message: 'Failed to delete account.' });
		}

		throw redirect(302, '/login');
	},
	updatePassword: async (event) => {
		const formData = await event.request.formData();
		const user = requireLogin();
		const password = getRequiredSting(formData, 'password', 'Password');
		const confirmPassword = getRequiredSting(formData, 'confirmPassword', 'Confirm Password');

		if (typeof password !== 'string' || typeof confirmPassword !== 'string') {
			return fail(400);
		}

		if (password.length < 6) {
			return fail(400, { message: 'Password must be at least 6 characters long.' });
		}

		if (password !== confirmPassword) {
			return fail(400, { message: 'Passwords do not match.' });
		}

		try {
			const passwordHash = await hash(password, {
				memoryCost: 19456,
				timeCost: 2,
				outputLen: 32,
				parallelism: 1
			});

			await db.update(table.user).set({ passwordHash }).where(eq(table.user.id, user.id));
		} catch {
			return fail(500, { message: 'An error has occurred' });
		}

		return { message: 'Password updated successfully.' };
	}
};
