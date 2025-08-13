import { fail } from '@sveltejs/kit';

const getString = (formData: FormData, key: string): string | null => {
	const value = formData.get(key);
	return typeof value === 'string' ? value : null;
};

export const getRequiredSting = (formData: FormData, key: string, label: string) => {
	const value = getString(formData, key);
	if (!value) return fail(400, { message: `${label} is required` });
	return value.trim();
};

export const getOptionalString = (formData: FormData, key: string): string | null => {
	const value = getString(formData, key);
	return value && value.trim() !== '' ? value.trim() : null;
};
