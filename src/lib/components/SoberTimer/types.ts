import type { Snippet } from 'svelte';

export interface Props {
	anchorDate: string;
	anchorTime: string;
	className?: string;
	cta?: Snippet;
	slipDates: string[];
}