<script lang="ts">
	import Input from './index.svelte';
	import { ParagraphStyles, SubHeadingStyles } from '$lib/styles';
	import type { Props } from './types';

	let props: Props = $props();

	let value = $state('');
</script>

<Input {...props} bind:value />
<p class={SubHeadingStyles}>Binding Check</p>
<p class={ParagraphStyles}>{value}</p>
