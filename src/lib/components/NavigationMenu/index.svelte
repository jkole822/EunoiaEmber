<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import { slide } from 'svelte/transition';
	import {
		LineStyles,
		LineTopBottomStyles,
		LinkStyles,
		MobileMenuButtonStyles,
		MobilePopoverStyles
	} from './styles';
	import type { Props } from './types';

	let { links, isNavigating = false }: Props = $props();

	let originalOverflow = $state('');
	let popoverOpen = $state(false);

	$effect(() => {
		if (typeof document !== 'undefined' && popoverOpen) {
			document.body.style.overflow = 'hidden';
		} else if (typeof document !== 'undefined') {
			document.body.style.overflow = originalOverflow;
		}
	});

	$effect(() => {
		if (isNavigating) {
			popoverOpen = false
		}
	})

	onDestroy(() => {
		if (typeof document !== 'undefined') document.body.style.overflow = originalOverflow;
	});

	onMount(() => {
		if (typeof document !== 'undefined') originalOverflow = document.body.style.overflow;
	});
</script>

{#snippet navigationLinks()}
	<ul class="flex flex-col gap-5 md:flex-row md:items-center">
		{#each links as { href, title }, index (index)}
			<li class="list-none">
				<a class={LinkStyles} {href}>{title}</a>
			</li>
		{/each}
	</ul>
{/snippet}

<header class="sticky top-0 z-10 w-full bg-primary-950">
	<nav class="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-8">
		<a
			class="rounded-md ring-primary-500 outline-hidden focus-visible:ring-2"
			href="/"
			title="Home"
		>
			<img alt="EunoiaEmber Logo" class="size-15" src="/images/EunoiaEmberLogo.svg" />
		</a>
		<div class="hidden md:block">
			{@render navigationLinks()}
		</div>
		<div class="h-8 md:hidden">
			<button
				aria-label="Open mobile navigation menu"
				class={MobilePopoverStyles}
				data-state={popoverOpen}
				onclick={() => (popoverOpen = !popoverOpen)}
			>
				<div class={MobileMenuButtonStyles}>
					<svg viewBox="0 0 32 32">
						<path
							class={LineTopBottomStyles}
							d="M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22"
						></path>
						<path class={LineStyles} d="M7 16 27 16"></path>
					</svg>
				</div>
			</button>
			{#if popoverOpen}
				<div
					class="absolute top-full left-0 z-10 h-[calc(100vh-84px)] w-full bg-primary-300 p-5"
					transition:slide={{ duration: 200 }}
				>
					{@render navigationLinks()}
				</div>
			{/if}
		</div>
	</nav>
</header>
