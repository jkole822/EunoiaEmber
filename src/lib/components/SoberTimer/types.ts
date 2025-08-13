import type { Snippet } from 'svelte';
import type { SlipDate } from '$lib/server/db/schema';

export interface Props {
	anchorDate: string;
	anchorTime: string;
	className?: string;
	cta?: Snippet;
	slipDates: SlipDate[];
}