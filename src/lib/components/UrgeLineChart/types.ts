import type { Urge } from '$lib/server/db/schema';

export interface Props {
	anchorDate: string;
	className?: string;
	urges: Urge[];
}
