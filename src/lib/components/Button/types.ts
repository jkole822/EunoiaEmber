import type { Snippet } from 'svelte';

export enum ButtonVariantsEnum {
	Default = 'default',
	Emphasis = 'emphasis'
}

export type ButtonVariants = ButtonVariantsEnum.Default | ButtonVariantsEnum.Emphasis;

export interface Props {
	'aria-controls'?: string;
	'aria-expanded'?: boolean;
	'aria-haspopup'?:
		| boolean
		| 'dialog'
		| 'menu'
		| 'grid'
		| 'listbox'
		| 'tree'
		| 'false'
		| 'true'
		| undefined;
	'aria-hidden'?: boolean;
	'aria-label'?: string;
	children: Snippet;
	className?: string;
	disabled?: boolean;
	href?: string;
	id?: string;
	onclick?: () => void;
	tabIndex?: number;
	target?: '_blank' | '_self' | '_parent' | '_top' | '_unfencedTop';
	type?: 'button' | 'submit' | 'reset';
	variant?: ButtonVariants;
}
