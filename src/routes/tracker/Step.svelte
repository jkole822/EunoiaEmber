<script lang="ts">
	import { fly } from 'svelte/transition';
	import Button from '$lib/components/Button/index.svelte';
	import type { Snippet } from 'svelte';

	let {
		children,
		disableNext,
		disablePrev,
		onNext,
		onPrev,
		paginationDirection,
		submitButton
	}: {
		children: Snippet;
		disableNext?: boolean;
		disablePrev?: boolean;
		onNext?: () => void;
		onPrev?: () => void;
		paginationDirection: 'forward' | 'backward';
		submitButton?: Snippet;
	} = $props();
</script>

<div
	in:fly={{
		x: paginationDirection === 'forward' ? 300 : -300,
		delay: 300,
		duration: 300
	}}
	out:fly={{
		x: paginationDirection === 'forward' ? -300 : 300,
		duration: 300
	}}
>
	{@render children()}
	<div class="mt-6 flex items-center gap-4">
		<Button disabled={disablePrev} onclick={onPrev}>Previous</Button>
		<Button disabled={disableNext} onclick={onNext}>Next</Button>
	</div>
	{#if submitButton}
		{@render submitButton()}
	{/if}
</div>
