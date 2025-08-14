<script lang="ts">
	import Select from './index.svelte';
	import { SubHeadingStyles } from '$lib/styles';
	import type { Props } from './types';

	let { options, ...rest }: Props = $props();

	let value = $state<string[]>([]);
</script>

<Select {...rest} bind:value {options}></Select>
<p class={SubHeadingStyles}>Binding Check</p>
<div class="mt-1 flex flex-col gap-0.5 text-sm">
	{#each value as id (id)}
		<span>{options.find((option) => option.id === id)?.label ?? ''}</span>
	{/each}
</div>
