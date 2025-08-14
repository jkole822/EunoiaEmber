<script lang="ts">
	import dayjs from 'dayjs';
	import {
		CategoryScale,
		Chart,
		Legend,
		LineController,
		LineElement,
		LinearScale,
		PointElement,
		Title,
		Tooltip
	} from 'chart.js';
	import { ToggleGroup } from '@ark-ui/svelte';
	import { onDestroy, onMount } from 'svelte';
	import { ToggleItemStyles } from './styles';
	import type { Props } from './types';

	let { anchorDate, className = '', urges }: Props = $props();
	Chart.register(
		CategoryScale,
		Legend,
		LineController,
		LineElement,
		LinearScale,
		PointElement,
		Title,
		Tooltip
	);

	let canvasEl: HTMLCanvasElement;
	let chart: Chart | null = $state(null);
	let timeSelection = $state(['30']);

	const isAnchorGreaterThanNinetyDays = $derived.by(() => {
		const today = dayjs();
		const anchor = dayjs(anchorDate);
		return today.diff(anchor, 'day') >= 90;
	});

	const isAnchorGreaterThanSixMonths = $derived.by(() => {
		const today = dayjs();
		const anchor = dayjs(anchorDate);
		return today.diff(anchor, 'month') >= 6;
	});

	const isAnchorDateGreaterThanYear = $derived.by(() => {
		const today = dayjs();
		const anchor = dayjs(anchorDate);
		return today.diff(anchor, 'year') >= 1;
	});

	const label = $derived(
		timeSelection[0] === '30'
			? '30 Day Urge Overview'
			: timeSelection[0] === '90'
				? '90 Day Urge Overview'
				: timeSelection[0] === '180'
					? 'Semiannual Urge Overview'
					: 'Annual Urge Overview'
	);

	const filteredUrges = $derived.by(() => {
		const timeAgo = dayjs().subtract(Number(timeSelection), 'day');

		return urges.filter((urge) => {
			const urgeDate = dayjs(urge.date);

			return urgeDate.isAfter(timeAgo);
		});
	});

	const sortedUrges = $derived(
		filteredUrges.toSorted((a, b) =>
			dayjs(`${a.date} ${a.time}`).isBefore(dayjs(`${b.date} ${b.time}`)) ? -1 : 1
		)
	);

	const labels = $derived(sortedUrges.map((urge) => urge.date));
	const data = $derived(sortedUrges.map((urge) => urge.intensity));

	$effect(() => {
		if (chart) {
			if (chart.options.plugins?.title) {
				chart.options.plugins.title.text = label;
			}

			chart.data.labels = labels;
			chart.data.datasets[0].data = data;
			chart.update();
		}
	});

	onMount(() => {
		chart = new Chart(canvasEl, {
			type: 'line',
			data: {
				labels,
				datasets: [
					{
						label: 'Intensity',
						data: [],
						borderColor: '#ff6900',
						backgroundColor: '#ffb86a'
					}
				]
			},
			options: {
				maintainAspectRatio: false,
				scales: {
					x: {
						ticks: {
							maxTicksLimit: 10 // Only show up to 10 x-axis ticks
						}
					}
				},
				plugins: {
					title: {
						display: true,
						text: 'Urge Intensity Over Time',
						font: { size: 24 },
						color: '#9f2d00'
					}
				}
			}
		});
	});

	onDestroy(() => {
		chart?.destroy();
	});
</script>

<div class={[className, 'rounded-xl bg-primary-100 p-10']}>
	<canvas bind:this={canvasEl} class="h-auto w-full"></canvas>
	{#if isAnchorGreaterThanNinetyDays}
		<ToggleGroup.Root bind:value={timeSelection} class="mt-8 flex items-center justify-center">
			<ToggleGroup.Item class={ToggleItemStyles} value="30">30 Days</ToggleGroup.Item>
			<ToggleGroup.Item class={ToggleItemStyles} value="90">90 Days</ToggleGroup.Item>
			{#if isAnchorGreaterThanSixMonths}
				<ToggleGroup.Item class={ToggleItemStyles} value="180">6 Months</ToggleGroup.Item>
			{/if}
			{#if isAnchorDateGreaterThanYear}
				<ToggleGroup.Item class={ToggleItemStyles} value="365">One Year</ToggleGroup.Item>
			{/if}
		</ToggleGroup.Root>
	{/if}
</div>
