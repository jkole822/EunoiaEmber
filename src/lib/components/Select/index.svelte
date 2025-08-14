<script lang="ts">
	import { createListCollection, Select } from '@ark-ui/svelte/select';
	import { Field } from '@ark-ui/svelte/field';
	import { Portal } from '@ark-ui/svelte/portal';
	import {
		ContentStyles,
		ItemDescriptionStyles,
		ItemIndicatorStyles,
		ItemLabelStyles,
		ItemStyles,
		TriggerStyles
	} from './styles';
	import { DescriptionStyles, ErrorMessageStyles, LabelStyles } from '$lib/styles';
	import { ValidationStateEnum } from '$lib/types';
	import type { Props } from './types';

	let {
		className = '',
		description,
		disabled,
		errorMessage,
		name,
		options,
		placeholder,
		readOnly,
		required,
		validationState,
		value = $bindable(),
		withField,
		...rest
	}: Props = $props();

	const collection = createListCollection({
		items: options.map((item) => ({ ...item, value: item.id }))
	});
</script>

{#snippet base()}
	<Select.Root
		{...rest}
		bind:value
		invalid={validationState === ValidationStateEnum.Invalid}
		{collection}
	>
		<Select.Label class={LabelStyles}>
			{name}
		</Select.Label>
		<Select.Trigger class={TriggerStyles} {disabled}>
			<Select.ValueText {placeholder} />
			<Select.Indicator>
				<i aria-hidden="true" class="fa-solid fa-sort"></i>
			</Select.Indicator>
		</Select.Trigger>
		<Portal>
			<Select.Positioner>
				<Select.Content class={ContentStyles}>
					{#each collection.items as item (item.value)}
						<Select.Item class={ItemStyles} {item}>
							<Select.ItemText>
								<span class={ItemLabelStyles}>{item.label}</span>
								<span class={ItemDescriptionStyles}>
									{item.description}
								</span>
							</Select.ItemText>
							<Select.ItemIndicator class={ItemIndicatorStyles}>✓</Select.ItemIndicator>
						</Select.Item>
					{/each}
				</Select.Content>
			</Select.Positioner>
		</Portal>
	</Select.Root>
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
		{#if description || errorMessage}
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
		{/if}
	</Field.Root>
{:else}
	<div class={className}>
		{@render base()}
	</div>
{/if}
