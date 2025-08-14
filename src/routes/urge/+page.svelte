<script lang="ts">
	import { SvelteURLSearchParams } from 'svelte/reactivity';
	import Button from '$lib/components/Button/index.svelte';
	import Pagination from '$lib/components/Pagination/index.svelte';
	import UrgeList from '$lib/components/UrgeList/index.svelte';
	import { ButtonVariantsEnum } from '$lib/components/Button/types';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	let nextCursor = $state(data.cursor);
	let page = $state(1);
	let prevCursor: string | undefined = $state();
	let urgeData = $state(data.urges);

	const disableNext = $derived(!nextCursor || urgeData.length < 10);
	const disablePrev = $derived(!prevCursor || page === 1);

	const params = new SvelteURLSearchParams();

	const loadPage = async (cursor: string | null = null, direction: 'next' | 'prev' = 'next') => {
		if (cursor) params.set('cursor', cursor);
		if (direction) params.set('direction', direction);

		const res = await fetch(`/urge?${params.toString()}`);
		const data = await res.json();

		urgeData = data.urges;
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
	{#if urgeData.length > 0}
		<h2 class="mb-10 text-center font-mono text-3xl tracking-wide xs:text-5xl">Urge Log</h2>
		<Button
			className="mb-5 w-full mx-auto 2xs:w-52 xs:hidden"
			href="/urge/create"
			variant={ButtonVariantsEnum.Emphasis}>Log New</Button
		>
		<UrgeList className="mb-5" urges={urgeData} />
		<div class="flex items-center justify-between">
			<Button className="hidden xs:flex" href="/urge/create" variant={ButtonVariantsEnum.Emphasis}
				>Log New</Button
			>
			<Pagination
				{disableNext}
				{disablePrev}
				nextLabel="display next page of urges"
				onnext={handleNext}
				onprevious={handlePrevious}
				previousLabel="display previous page of urges"
				text={String(page)}
			/>
		</div>
	{:else}
		<div class="flex flex-col items-center justify-center rounded-xl bg-primary-100 p-20">
			<h2 class="mb-10 text-center font-mono text-3xl tracking-wide xs:text-5xl">Urge Log</h2>
			<p class="mb-5">
				This section shows the <span class="underline">history of urges</span> you’ve logged in the app.
				When you feel another urge, <span class="font-cursive text-2xl text-primary-600">tap</span> the button below to <span class="rounded-full bg-primary-800 px-2 py-1 text-primary-100"
			>record</span> the details.
			</p>
			<Button href="/urge/create" variant={ButtonVariantsEnum.Emphasis}>Log New</Button>
		</div>
	{/if}
</div>
