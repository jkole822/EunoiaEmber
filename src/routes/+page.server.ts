import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (event: PageServerLoad) => {
	if (event.locals.user) {
		return redirect(302, '/home');
	}
	return {};
};
