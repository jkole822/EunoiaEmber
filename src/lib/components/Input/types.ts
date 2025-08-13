import type { ValidationState } from '$lib/types';

export enum AutoCompleteEnum {
	name = 'name',
	email = 'email',
	currentPassword = 'current-password',
	newPassword = 'new-password',
	off = 'off',
	username = 'username'
}

export type AutoCompleteType =
	| AutoCompleteEnum.name
	| AutoCompleteEnum.email
	| AutoCompleteEnum.currentPassword
	| AutoCompleteEnum.newPassword
	| AutoCompleteEnum.off
	| AutoCompleteEnum.username;

export enum InputTypeEnum {
	date = 'date',
	email = 'email',
	password = 'password',
	text = 'text',
	time = 'time'
}

export type InputType =
	| InputTypeEnum.date
	| InputTypeEnum.email
	| InputTypeEnum.password
	| InputTypeEnum.text
	| InputTypeEnum.time;

export interface Props {
	autocomplete?: AutoCompleteType;
	className?: string;
	description?: string;
	disabled?: boolean;
	errorMessage?: string;
	id?: string;
	isTextArea?: boolean;
	label: string;
	name?: string;
	oninput?: (e: Event) => void;
	raiseLabel?: boolean;
	readOnly?: boolean;
	required?: boolean;
	type?: InputType;
	validationState?: ValidationState;
	value?: string;
}
