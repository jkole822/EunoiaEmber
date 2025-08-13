<script lang="ts">
	import dayjs from 'dayjs';
	import { Chart, PieController, ArcElement, Tooltip, Legend, Title } from 'chart.js';
	import { onDestroy, onMount } from 'svelte';
	import { ToggleGroup } from '@ark-ui/svelte';
	import { ToggleItemStyles } from './styles';
	import type { Props } from './types';

	let { anchorDate, anchorTime, className = '', slipDates = [] }: Props = $props();

	Chart.register(PieController, ArcElement, Tooltip, Legend, Title);
	let canvasEl: HTMLCanvasElement;
	let chart: Chart | null = $state(null);

	const isAnchorGreaterThanThirtyDays = $derived.by(() => {
		const today = dayjs();
		const anchor = dayjs(`${anchorDate} ${anchorTime}`);
		return today.diff(anchor, 'day') >= 30;
	});

	const isAnchorDateGreaterThanYear = $derived.by(() => {
		const today = dayjs();
		const anchor = dayjs(`${anchorDate} ${anchorTime}`);
		return today.diff(anchor, 'year') >= 1;
	});

	let timeSelection = $state<string[]>(isAnchorGreaterThanThirtyDays ? ['month'] : ['anchor']);

	const label = $derived(
		timeSelection[0] === 'month'
			? '30 Day Sobriety Overview'
			: timeSelection[0] === 'year'
				? 'Annual Sobriety Overview'
				: 'Sobriety Overview'
	);

	const slipCount = $derived(slipDates.length);

	const data = $derived.by(() => {
		const today = dayjs();
		if (timeSelection[0] === 'month') {
			const thirtyDaysAgo = today.subtract(30, 'day');
			const slipsPastThirtyDays = slipDates
				.map((date) => dayjs(date))
				.filter((date) => date.isAfter(thirtyDaysAgo) && date.isBefore(today)).length;

			return [slipsPastThirtyDays, 30 - slipsPastThirtyDays];
		} else if (timeSelection[0] === 'year') {
			const oneYearAgo = today.subtract(1, 'year');
			const slipsPastYear = slipDates
				.map((date) => dayjs(date))
				.filter((date) => date.isAfter(oneYearAgo) && date.isBefore(today)).length;

			return [slipsPastYear, 365 - slipsPastYear];
		} else {
			const today = dayjs();
			const difference = today.diff(dayjs(anchorDate), 'day');

			return [slipCount, difference - slipCount];
		}
	});

	$effect(() => {
		if (chart) {
			if (chart.options.plugins?.title) {
				chart.options.plugins.title.text = label;
			}

			chart.data.datasets[0].data = data;
			chart.update();
		}
	});

	onMount(() => {
		chart = new Chart(canvasEl, {
			type: 'pie',
			data: {
				labels: ['Slip Days', 'Sober Days'],
				datasets: [
					{
						data: [],
						backgroundColor: ['#ca3500', '#ff6900'],
						hoverOffset: 8
					}
				]
			},
			options: {
				responsive: true,
				plugins: {
					legend: { position: 'bottom' },
					title: {
						display: true,
						text: '',
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
	{#if isAnchorGreaterThanThirtyDays}
		<ToggleGroup.Root bind:value={timeSelection} class="mb-8 flex items-center justify-center">
			<ToggleGroup.Item class={ToggleItemStyles} value="month">30 Day</ToggleGroup.Item>
			{#if isAnchorDateGreaterThanYear}
				<ToggleGroup.Item class={ToggleItemStyles} value="year">Annual</ToggleGroup.Item>
			{/if}
			<ToggleGroup.Item class={ToggleItemStyles} value="anchor">From Anchor</ToggleGroup.Item>
		</ToggleGroup.Root>
	{/if}
	<canvas bind:this={canvasEl} class="mx-auto"></canvas>
</div>
