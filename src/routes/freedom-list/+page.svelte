<script lang="ts">
	import { SvelteURLSearchParams } from 'svelte/reactivity';
	import Button from '$lib/components/Button/index.svelte';
	import FreedomList from '$lib/components/FreedomList/index.svelte';
	import Pagination from '$lib/components/Pagination/index.svelte';
	import { FREEDOM_LIST_ITEM_LIMIT } from '$lib/constants';
	import { ButtonVariantsEnum } from '$lib/components/Button/types';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	let nextCursor = $state(data.cursor);
	let page = $state(1);
	let prevCursor: string | undefined = $state();
	let freedomListData = $state(data.freedomListItems);

	const shownItems = $derived((page - 1) * FREEDOM_LIST_ITEM_LIMIT + freedomListData.length);
	const disableNext = $derived(!nextCursor || shownItems >= data.count);
	const disablePrev = $derived(!prevCursor || page === 1);

	const params = new SvelteURLSearchParams();

	const loadPage = async (cursor: string | null = null, direction: 'next' | 'prev' = 'next') => {
		if (cursor) params.set('cursor', cursor);
		if (direction) params.set('direction', direction);

		const res = await fetch(`/freedom-list?${params.toString()}`);
		const data = await res.json();

		freedomListData = data.freedomListItems;
		nextCursor = data.nextCursor;
		prevCursor = data.prevCursor;
	};

	const handleNext = async () => {
		if (disableNext) return;
		await loadPage(nextCursor, 'next');
		page++;
	};

	const handlePrevious = async () => {
		if (disablePrev) return;
		await loadPage(prevCursor, 'prev');
		page--;
	};
</script>

<div class="py-10">
	{#if freedomListData.length > 0}
		<h2 class="mb-10 text-center font-mono text-3xl tracking-wide xs:text-5xl">
			Freedom Reflections
		</h2>
		<Button
			className="mb-5 w-full mx-auto xs:hidden"
			href="/freedom-list/create"
			variant={ButtonVariantsEnum.Emphasis}>Add Motivation</Button
		>
		<FreedomList className="mb-5" freedomListItems={freedomListData} />
		<div class="flex items-center justify-center xs:justify-between">
			<Button
				className="hidden xs:flex"
				href="/freedom-list/create"
				variant={ButtonVariantsEnum.Emphasis}>Add Motivation</Button
			>
			{#if data.count > FREEDOM_LIST_ITEM_LIMIT}
				<Pagination
					{disableNext}
					{disablePrev}
					nextLabel="display next page of freedom list items"
					onnext={handleNext}
					onprevious={handlePrevious}
					previousLabel="display previous page of freedom list items"
					text={String(page)}
				/>
			{/if}
		</div>
	{:else}
		<div class="flex flex-col items-center justify-center rounded-xl bg-primary-100 p-20">
			<h2 class="mb-10 text-center font-mono text-3xl tracking-wide xs:text-5xl">
				Freedom Reflections
			</h2>
			<p class="mb-5">
				This section showcases the many reasons you've chosen to embrace your <span
					class="underline">new life</span
				>. Reflect on these for
				<span class="rounded-full bg-primary-800 px-2 py-1 text-primary-100">motivation</span>
				and <span class="rounded-full bg-primary-800 px-2 py-1 text-primary-100">clarity</span>.
				Challenge yourself to add a new reason each day by
				<span class="font-cursive text-2xl text-primary-600">tapping</span>
				the button below when beginning your journey with
				<span class="font-mono text-lg text-primary-600">EmberEunoia</span>.
			</p>
			<Button href="/freedom-list/create" variant={ButtonVariantsEnum.Emphasis}>Add Reason</Button>
		</div>
	{/if}
</div>
