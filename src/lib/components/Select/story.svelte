<script lang="ts">
	import Button from '$lib/components/Button/index.svelte';
	import Select from './index.svelte';
	import { SubHeadingStyles } from '$lib/styles';
	import { ValidationStateEnum } from '$lib/types';
	import type { Props } from './types';
	import type { ValidationState } from '$lib/types';

	let { options, withField, ...rest }: Props = $props();
	let value = $state<string[]>([]);
	let validationState = $state<ValidationState>(ValidationStateEnum.Valid);

	const toggleValidationState = () => {
		validationState =
			validationState === ValidationStateEnum.Valid
				? ValidationStateEnum.Invalid
				: ValidationStateEnum.Valid;
	};
</script>

<Select
	{...rest}
	{options}
	{value}
	{validationState}
	{withField}
	onValueChange={(details) => (value = details.value)}
></Select>
<p class={SubHeadingStyles}>Binding Check</p>
<div class="mt-1 flex flex-col gap-0.5 text-sm">
	{#each value as id (id)}
		<span>{options.find((option) => option.id === id)?.label ?? ''}</span>
	{/each}
</div>
{#if withField}
	<Button onclick={toggleValidationState} className="mt-10">Toggle Validation State</Button>
{/if}
