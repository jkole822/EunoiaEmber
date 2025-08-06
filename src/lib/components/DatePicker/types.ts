import type { DateValue } from '@ark-ui/svelte';
import type { ValidationState } from '$lib/types';
import { useDatePickerContext } from '@ark-ui/svelte/date-picker';

export type DatePickerContext = ReturnType<typeof useDatePickerContext>;

export type DateView = 'day' | 'month' | 'year';

interface ViewChangeDetails {
	view: DateView;
}

interface OpenChangeDetails {
	open: boolean;
}

interface ValueChangeDetails {
	value: DateValue[];
	valueAsString: string[];
	view: DateView;
}

interface FocusChangeDetails extends ValueChangeDetails {
	focusedValue: DateValue;
	view: DateView;
}

export interface Props {
	className?: string;
	closeOnSelect?: boolean;
	defaultView?: DateView;
	description?: string;
	disabled?: boolean;
	errorMessage?: string;
	fixedWeeks?: boolean;
	focusedValue?: DateValue;
	id?: string;
	inline?: boolean;
	isDateUnavailable?: (date: DateValue, locale: string) => boolean;
	label?: string;
	lazyMount?: boolean;
	locale?: string;
	max?: DateValue;
	maxView?: DateView;
	min?: DateValue;
	minView?: DateView;
	name?: string;
	numOfMonths?: number;
	onExitComplete?: () => void;
	onFocusChange?: (details: FocusChangeDetails) => void;
	onOpenChange?: (details: OpenChangeDetails) => void;
	onValueChange?: (details: ValueChangeDetails) => void;
	onViewChange?: (details: ViewChangeDetails) => void;
	open?: boolean;
	outsideDaySelectable?: boolean;
	placeholder?: string;
	present?: boolean;
	readOnly?: boolean;
	required?: boolean;
	selectionMode?: 'single' | 'multiple' | 'range';
	skipAnimationOnMount?: boolean;
	startOfWeek?: number;
	timeZone?: string;
	unmountOnExit?: boolean;
	validationState?: ValidationState;
	value?: DateValue[];
	view?: DateView;
	withField?: boolean;
}
