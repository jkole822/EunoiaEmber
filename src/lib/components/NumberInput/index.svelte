<script lang="ts">
	import { Field } from '@ark-ui/svelte/field';
	import { NumberInput } from '@ark-ui/svelte/number-input';
	import {
		ControlStyles,
		DecrementTriggerStyles,
		IncrementTriggerStyles,
		InputContainerStyles,
		InputStyles
	} from './styles';
	import { DescriptionStyles, ErrorMessageStyles, LabelStyles } from '$lib/styles';
	import { ValidationStateEnum } from '$lib/types';
	import type { Props } from './types';

	let {
		className = '',
		description,
		disabled,
		errorMessage,
		label,
		readOnly,
		required,
		validationState,
		value = $bindable(),
		withField,
		...rest
	}: Props = $props();
</script>

{#snippet base()}
	<NumberInput.Root {...rest} {disabled} bind:value>
		{#if label}
			<NumberInput.Label class={LabelStyles}>
				{label}
			</NumberInput.Label>
		{/if}
		<div class={InputContainerStyles}>
			<NumberInput.Input class={InputStyles} />
			<NumberInput.Control class={ControlStyles}>
				<NumberInput.IncrementTrigger class={IncrementTriggerStyles}>
					<i aria-hidden="true" class="fa-solid fa-chevron-up"></i>
				</NumberInput.IncrementTrigger>
				<NumberInput.DecrementTrigger class={DecrementTriggerStyles}>
					<i aria-hidden="true" class="fa-solid fa-chevron-down"></i>
				</NumberInput.DecrementTrigger>
			</NumberInput.Control>
		</div>
	</NumberInput.Root>
{/snippet}

{#if withField}
	<Field.Root
		class={className}
		invalid={validationState === ValidationStateEnum.Invalid}
		{disabled}
		{readOnly}
		{required}
	>
		<div class="mt-2">
			{#if description}
				<Field.HelperText class={DescriptionStyles}>
					{description}
				</Field.HelperText>
			{/if}
			{#if errorMessage}
				<Field.ErrorText class={ErrorMessageStyles}>
					{errorMessage}
				</Field.ErrorText>
			{/if}
		</div>
	</Field.Root>
{:else}
	<div class={className}>
		{@render base()}
	</div>
{/if}
