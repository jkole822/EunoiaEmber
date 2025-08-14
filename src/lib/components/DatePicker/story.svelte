<script lang="ts">
	import DatePicker from './index.svelte';
	import { parseDate } from '@ark-ui/svelte/date-picker';
	import { ParagraphStyles, SubHeadingStyles } from '$lib/styles';
	import type { Props } from './types';

	let props: Props = $props();

	let value = $state([parseDate('2022-01-01')]);
</script>

<DatePicker {...props} bind:value />
<p class={SubHeadingStyles}>Binding Check</p>
<p class={ParagraphStyles}>{value}</p>
