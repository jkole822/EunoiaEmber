<script lang="ts">
	import NumberInput from './index.svelte';
	import { ParagraphStyles, SubHeadingStyles } from '../../styles';
	import type { Props } from './types';

	let props: Props = $props();

	let value = $state('1');
</script>

<NumberInput {...props} {value} onValueChange={(details) => (value = details.value)} />
<p class={SubHeadingStyles}>Binding Check</p>
<p class={ParagraphStyles}>{value}</p>
