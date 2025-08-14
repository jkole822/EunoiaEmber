import type { Urge } from '$lib/server/db/schema';

export interface Props {
	className?: string;
	urges: Urge[];
}
