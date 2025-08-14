import { NumberInput } from '@ark-ui/svelte/number-input';
import type { ValidationState } from "$lib/types";

export enum NumberInputModeEnum {
  Decimal = "decimal",
  Number = "numeric",
  Phone = "tel",
  Text = "text",
}

export type NumberInputMode =
  | NumberInputModeEnum.Decimal
  | NumberInputModeEnum.Number
  | NumberInputModeEnum.Phone
  | NumberInputModeEnum.Text;

export interface Props {
  allowMouseWheel?: boolean;
  allowOverflow?: boolean;
  clampValueOnBlur?: boolean;
  className?: string;
	defaultValue?: string;
  description?: string;
  disabled?: boolean;
  errorMessage?: string;
  focusInputOnChange?: boolean;
  form?: string;
  formatOptions?: Intl.NumberFormatOptions;
  id?: string;
  inputMode?: NumberInputMode;
	label: string;
  locale?: string;
	onFocusChange?: (details: NumberInput.FocusChangeDetails) => void;
	onValueChange?: (details: NumberInput.ValueChangeDetails) => void;
	onValueInvalid?: (details: NumberInput.ValueInvalidDetails) => void;
  max?: number;
  min?: number;
  name?: string;
  pattern?: string;
  readOnly?: boolean;
  required?: boolean;
  spinOnPress?: boolean;
  step?: number;
  validationState?: ValidationState;
	value?: string;
  withField?: boolean;
}
