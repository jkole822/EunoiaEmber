import { Select } from '@ark-ui/svelte';
import type { ListboxScrollToIndexDetails } from '@ark-ui/svelte';
import type { ValidationState } from '$lib/types';

export interface SelectItem {
	id: string;
	description?: string;
	disabled?: boolean;
	label: string;
}

export interface Props {
	className?: string;
	closeOnSelect?: boolean;
	composite?: boolean;
	defaultHighlightedValue?: string;
	defaultOpen?: boolean;
	defaultValue?: string[];
	description?: string;
	deselectable?: boolean;
	disabled?: boolean;
	errorMessage?: string;
	form?: string;
	highlightedValue?: string;
	id?: string;
	lazyMount?: boolean;
	loopFocus?: boolean;
	multiple?: boolean;
	name?: string;
	onExitComplete?: () => void;
	onFocusOutside?: () => void;
	onHighlightChange?: (details: Select.HighlightChangeDetails) => void;
	onInteractOutside?: () => void;
	onOpenChange?: (details: Select.OpenChangeDetails) => void;
	onPointerDownOutside?: () => void;
	onSelect?: () => void;
	onValueChange?: (details: Select.ValueChangeDetails) => void;
	options: SelectItem[];
	placeholder?: string;
	positioning?: any;
	readOnly?: boolean;
	required?: boolean;
	scrollToIndexFn?: (details: ListboxScrollToIndexDetails) => void;
	unmountOnExit?: boolean;
	validationState?: ValidationState;
	value?: string[];
	withField?: boolean;
}
