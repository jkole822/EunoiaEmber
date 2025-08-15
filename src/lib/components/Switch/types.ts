import { Switch } from '@ark-ui/svelte/switch';
import type { Snippet } from 'svelte';
import type { ValidationState } from '$lib/types';

export interface Props {
	checked?: boolean;
	children?: Snippet;
	className?: string;
	defaultChecked?: boolean;
	description?: string;
	disabled?: boolean;
	errorMessage?: string;
	form?: string;
	id?: string;
	label: string;
	name?: string;
	onCheckedChange?: (details: Switch.CheckedChangeDetails) => void;
	readOnly?: boolean;
	required?: boolean;
	validationState?: ValidationState;
	value?: string;
	withField?: boolean;
}
