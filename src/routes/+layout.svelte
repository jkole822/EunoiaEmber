<script lang="ts">
	import { afterNavigate, beforeNavigate } from '$app/navigation';
	import NavigationMenu from '$lib/components/NavigationMenu/index.svelte';
	import { navigationLinks } from '$lib/navigationLinks';
	import '../app.css';
	import { onMount } from 'svelte';

	let { children, data } = $props();

	let isNavigating = $state(false);

	onMount(() => {
		beforeNavigate(() => {
			isNavigating = true;
		});

		afterNavigate(() => {
			isNavigating = false;
		});
	});
</script>

<svelte:head>
	<link
		rel="stylesheet"
		href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
		integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw=="
		crossorigin="anonymous"
		referrerpolicy="no-referrer"
	/>
</svelte:head>

{#if data.user}
	<NavigationMenu {isNavigating} links={navigationLinks} />
{/if}
<div class="mx-auto max-w-7xl px-4 md:px-8">
	{@render children()}
</div>
