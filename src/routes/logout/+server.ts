import { error, redirect } from '@sveltejs/kit';
import * as auth from '$lib/server/auth';

export const GET = async (event) => {
	if (!event.locals.session) {
		throw error(401, 'Unauthorized');
	}

	await auth.invalidateSession(event.locals.session.id);
	auth.deleteSessionTokenCookie(event);

	throw redirect(302, '/login');
};
