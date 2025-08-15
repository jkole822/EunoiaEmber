<script lang="ts">
	import dayjs from 'dayjs';
	import Button from '$lib/components/Button/index.svelte';
	import FreedomList from '$lib/components/FreedomList/index.svelte';
	import SoberBarChart from '$lib/components/SoberBarChart/index.svelte';
	import SoberPieChart from '$lib/components/SoberPieChart/index.svelte';
	import SoberTimer from '$lib/components/SoberTimer/index.svelte';
	import StatBlock from '$lib/components/StatBlock/index.svelte';
	import UrgeLineChart from '$lib/components/UrgeLineChart/index.svelte';
	import UrgeList from '$lib/components/UrgeList/index.svelte';
	import { dateRange } from '$lib/utils/dateRange';
	import { ButtonVariantsEnum } from '$lib/components/Button/types';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	const anchorDate = $derived(data.tracker?.anchorDate || dayjs().format('YYYY-MM-DD'));
	const anchorTime = $derived(data.tracker?.anchorTime || dayjs().format('HH:mm'));
	const slipDates = $derived(data.tracker?.slipDates.map((date) => date.date) || []);

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

	const filledUrges = $derived.by(() => {
		const oneYearAgo = dayjs().subtract(1, 'year');
		const startDate = dayjs(anchorDate).isAfter(oneYearAgo) ? dayjs(anchorDate) : oneYearAgo;
		const format = 'MM/DD/YYYY';

		const urgeCopy = [...data.urges];
		for (let date of dateRange(startDate, dayjs())) {
			const formattedDate = date.format(format);
			const match = urgeCopy.find((urge) => dayjs(urge.date).format(format) === formattedDate);

			if (!match) {
				urgeCopy.push({
					createdAt: null,
					date: formattedDate,
					id: '',
					intensity: 0,
					notes: null,
					time: '',
					userId: ''
				});
			}
		}

		return urgeCopy;
	});

	const fiveMostRecentUrges = $derived(data.urges.slice(0, 5));
</script>

{#snippet updateTrackerCta()}
	{#if data.tracker}
		<Button
			className="mt-10"
			href={`/tracker/${data.tracker.id}`}
			variant={ButtonVariantsEnum.Emphasis}
		>
			Update
		</Button>
	{/if}
{/snippet}

<div class="my-10">
	{#if data.tracker}
		<div class="flex flex-col gap-5">
			<div
				class="grid grid-cols-1 gap-2.5 [@media(min-width:450px)]:grid-cols-2 [@media(min-width:900px)]:grid-cols-4"
			>
				{#each stats as stat, index (index)}
					<StatBlock {...stat} />
				{/each}
			</div>
			<div class="grid grid-cols-1 gap-5 md:grid-cols-2">
				<SoberPieChart
					className="[&_canvas]:w-[90%] [@media(min-width:420px)]:[&_canvas]:w-auto"
					{anchorDate}
					{anchorTime}
					{slipDates}
				/>
				<SoberTimer {anchorDate} {anchorTime} cta={updateTrackerCta} slipDates={data.tracker.slipDates} />
			</div>
			<SoberBarChart className="[&_canvas]:min-h-[250px]" {anchorDate} {slipDates} />
			{#if data.freedomListItems.length > 0}
				<h2 class="mt-10 text-center font-mono text-3xl tracking-wide xs:text-5xl">
					Freedom Reflections
				</h2>
				<FreedomList freedomListItems={data.freedomListItems} />
				<Button className="mx-auto" href="/freedom-list" variant={ButtonVariantsEnum.Emphasis}
					>View All</Button
				>
			{/if}
			{#if data.urges.length > 0}
				<h2 class="mt-10 text-center font-mono text-3xl tracking-wide xs:text-5xl">Recent Urges</h2>
				<UrgeList urges={fiveMostRecentUrges} />
				<Button className="mb-10 mx-auto" href="/urge" variant={ButtonVariantsEnum.Emphasis}
					>View All</Button
				>
				<UrgeLineChart className="[&_canvas]:min-h-[250px]" {anchorDate} urges={filledUrges} />
			{/if}
		</div>
	{:else}
		<div class="flex flex-col items-center justify-center rounded-xl bg-primary-100 p-20">
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
