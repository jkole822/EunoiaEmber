<script lang="ts">
	import dayjs from 'dayjs';
	import Button from '$lib/components/Button/index.svelte';
	import SoberBarChart from '$lib/components/SoberBarChart/index.svelte';
	import SoberPieChart from '$lib/components/SoberPieChart/index.svelte';
	import SoberTimer from '$lib/components/SoberTimer/index.svelte';
	import StatBlock from '$lib/components/StatBlock/index.svelte';
	import { ButtonVariantsEnum } from '$lib/components/Button/types';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
	let { anchorDate, anchorTime } = data.tracker;

	const slipDates = $derived(data.slipDates.map((date) => date.date));

	const stats = $derived.by(() => {
		const daysSinceAnchor = dayjs().diff(dayjs(anchorDate), 'day');
		const slipDays = slipDates.length;
		const soberDays = daysSinceAnchor - slipDays;
		const percentSober = Math.round(((soberDays - slipDays) / daysSinceAnchor) * 100);
		const formattedAnchorDate = dayjs(anchorDate).format('MMM D YYYY');

		return [
			{ iconClass: 'fa-calendar', stat: formattedAnchorDate, title: 'Anchor Date' },
			{ iconClass: 'fa-trophy', stat: String(soberDays), title: 'Sober Days' },
			{ iconClass: 'fa-face-sad-tear', stat: String(slipDays), title: 'Slip Days' },
			{ iconClass: 'fa-percent', stat: String(percentSober), title: 'Percent Sober' }
		];
	});
</script>

{#snippet updateTrackerCta()}
	<Button
		className="mt-10"
		href={`/tracker/${data.tracker.id}`}
		variant={ButtonVariantsEnum.Emphasis}
	>
		Update
	</Button>
{/snippet}

<div class="my-10">
	{#if data.tracker}
		<div class="grid grid-cols-1 gap-2.5 mb-5 [@media(min-width:450px)]:grid-cols-2 [@media(min-width:900px)]:grid-cols-4">
			{#each stats as stat, index (index)}
				<StatBlock {...stat} />
			{/each}
		</div>
		<div class="mb-5 grid grid-cols-1 gap-5 md:grid-cols-2">
			<SoberPieChart
				className="[&_canvas]:w-[90%] [@media(min-width:420px)]:[&_canvas]:w-auto"
				{anchorDate}
				{anchorTime}
				{slipDates}
			/>
			<SoberTimer {anchorDate} {anchorTime} cta={updateTrackerCta} slipDates={data.slipDates} />
		</div>
		<SoberBarChart className="[&_canvas]:min-h-[250px]" {anchorDate} {slipDates} />
	{:else}
		<div class="flex flex-col items-center justify-center rounded-xl bg-primary-100 py-20">
			<p class="font-mono text-3xl tracking-widest">
				Your journey <span class="underline">matters</span>.
			</p>
			<p>
				Enter your sobriety <span class="rounded-full bg-primary-800 px-2 py-1 text-primary-100"
					>start date</span
				>
				and any
				<span class="rounded-full bg-primary-800 px-2 py-1 text-primary-100">past slips</span>
				to begin building a
				<span class="font-cursive text-2xl text-primary-600">clear picture</span> of your progress.
			</p>
			<Button className="mt-10" href="/tracker/create" variant={ButtonVariantsEnum.Emphasis}
				>Create</Button
			>
		</div>
	{/if}
</div>
