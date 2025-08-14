<script lang="ts">
	import Switch from './index.svelte';
	import { ParagraphStyles, SubHeadingStyles } from '$lib/styles';
	import type { Props } from './types';

	let props: Props = $props();

	let checked = $state(props.checked);
</script>

<Switch {...props} bind:checked />
<p class={SubHeadingStyles}>Binding Check</p>
<p class={ParagraphStyles}>{checked ? 'Checked' : 'Not Checked'}</p>
