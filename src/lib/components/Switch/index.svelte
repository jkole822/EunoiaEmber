<script lang="ts">
	import { Switch } from '@ark-ui/svelte/switch';
	import { Field } from '@ark-ui/svelte/field';
	import {
		ContainerStyles,
		ControlStyles,
		FlexContainerStyles,
		LabelStyles,
		SwitchContainerStyles,
		ThumbStyles
	} from './styles';
	import { DescriptionStyles, ErrorMessageStyles } from '$lib/styles';
	import { ValidationStateEnum } from '$lib/types';
	import type { Props } from './types';

	let {
		checked = $bindable(false),
		children,
		className = '',
		description,
		disabled,
		errorMessage,
		label,
		readOnly,
		required,
		validationState,
		withField,
		...rest
	}: Props = $props();
</script>

{#snippet base()}
	<Switch.Root {...rest} bind:checked class={ContainerStyles} {disabled}>
		<div class={FlexContainerStyles}>
			<div class={SwitchContainerStyles}>
				<Switch.Control class={ControlStyles}>
					<Switch.Thumb class={ThumbStyles} />
				</Switch.Control>
			</div>
			<Switch.Label class={LabelStyles}>{label}</Switch.Label>
		</div>
		{#if children}
			{@render children()}
		{/if}
		<Switch.HiddenInput />
	</Switch.Root>
{/snippet}

{#if withField}
	<Field.Root
		class={className}
		invalid={validationState === ValidationStateEnum.Invalid}
		{disabled}
		{readOnly}
		{required}
	>
		{@render base()}
		<div>
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
	<div class={className}>{@render base()}</div>
{/if}
