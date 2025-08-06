<script lang="ts">
	import { Field } from '@ark-ui/svelte/field';
	import { ContainerStyles, InputStyles, LabelStyles } from './styles';
	import { DescriptionStyles, ErrorMessageStyles } from '$lib/styles';
	import { InputTypeEnum } from './types';
	import { ValidationStateEnum } from '$lib/types';
	import type { Props } from './types';

	let {
		autocomplete,
		className = '',
		description,
		errorMessage,
		label,
		oninput,
		name,
		raiseLabel,
		type = InputTypeEnum.text,
		validationState = ValidationStateEnum.Valid,
		value = $bindable(),
		...rest
	}: Props = $props();

	function handleInput(e: Event) {
		value = (e.target as HTMLInputElement).value; // updates parent if it's bound
		if (oninput) {
			oninput(e); // call the provided oninput handler if it exists
		}
	}
</script>

<Field.Root
	{...rest}
	class={[className, ContainerStyles]}
	invalid={validationState === ValidationStateEnum.Invalid}
>
	<Field.Input
		class={InputStyles}
		data-raise-label={!!value || raiseLabel}
		oninput={handleInput}
		{autocomplete}
		{name}
		{type}
		{value}
	/>
	<Field.Label class={LabelStyles}>{label}</Field.Label>
	{#if description || errorMessage}
		<div class="mt-2">
			<Field.HelperText class={DescriptionStyles}>
				{description}
			</Field.HelperText>
			<Field.ErrorText class={ErrorMessageStyles}>
				{description}
			</Field.ErrorText>
		</div>
	{/if}
</Field.Root>
