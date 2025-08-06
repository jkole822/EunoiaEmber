<script lang="ts">
	import Button from '$lib/components/Button/index.svelte';
	import DatePicker from './index.svelte';
	import { parseDate } from '@ark-ui/svelte/date-picker';
	import { ParagraphStyles, SubHeadingStyles } from '$lib/styles';
	import type { Props } from './types';
	import { type ValidationState, ValidationStateEnum } from '$lib/types';

	let { withField, ...props }: Props = $props();

	let value = $state([parseDate('2022-01-01')]);
	let validationState = $state<ValidationState>(ValidationStateEnum.Valid);

	const toggleValidationState = () => {
		validationState =
			validationState === ValidationStateEnum.Valid
				? ValidationStateEnum.Invalid
				: ValidationStateEnum.Valid;
	};
</script>

<DatePicker {...props} bind:value {validationState} {withField} />
<p class={SubHeadingStyles}>Binding Check</p>
<p class={ParagraphStyles}>{value}</p>
{#if withField}
	<Button onclick={toggleValidationState} className="mt-10">Toggle Validation State</Button>
{/if}
