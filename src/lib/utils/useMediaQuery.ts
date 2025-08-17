import { readable } from 'svelte/store';

export function useMediaQuery(query: string) {
	return readable(false, (set) => {
		if (typeof window === 'undefined') return;

		const mql = window.matchMedia(query);
		set(mql.matches);

		const handler = (event: MediaQueryListEvent) => set(event.matches);
		mql.addEventListener('change', handler);

		return () => mql.removeEventListener('change', handler);
	});
}
