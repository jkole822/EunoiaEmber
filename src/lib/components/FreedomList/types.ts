import type { FreedomListItem } from '$lib/server/db/schema';

export interface Props {
	className?: string;
	freedomListItems: FreedomListItem[];
}
