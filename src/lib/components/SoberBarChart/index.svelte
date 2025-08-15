<script lang="ts">
	import dayjs from 'dayjs';
	import Chart from 'chart.js/auto';
	import { onDestroy, onMount } from 'svelte';
	import Pagination from '$lib/components/Pagination/index.svelte';
	import type { Props } from './types';

	let { anchorDate, className = '', slipDates = [] }: Props = $props();

	let canvasEl: HTMLCanvasElement;
	let chart: Chart | null = $state(null);
	const labels = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December'
	];

	let activeYear = $state(dayjs().year());

	let dataEachMonth = $derived(
		labels.map((month) => {
			const monthIndex = labels.indexOf(month);
			const monthOfYear = dayjs().year(activeYear).month(monthIndex);
			const monthStart = monthOfYear.startOf('month');
			const monthEnd   = monthOfYear.endOf('month');

			// If today is before the start of the month of the current iteration,
			// or if the anchor date is after the end of the month of the current iteration,
			// return 0 slips and 0 sobers to show no data for that month.
			if (dayjs().isBefore(monthStart) || dayjs(anchorDate).isAfter(monthEnd)) {
				return { slipCount: 0, soberCount: 0 };
			}

			const slipCount = slipDates.reduce((acc, curr) => {
				const currentSlipDate = dayjs(curr);

				if (
					currentSlipDate.isAfter(monthStart) &&
					currentSlipDate.isBefore(monthEnd)
				) {
					return acc + 1;
				}

				return acc;
			}, 0);

			const soberCount = monthOfYear.daysInMonth() - slipCount;

			return { slipCount, soberCount };
		})
	);

	$effect(() => {
		if (chart) {
			const slipDays = dataEachMonth.map((item) => item.slipCount);
			const soberDays = dataEachMonth.map((item) => item.soberCount);
			chart.data.datasets[0].data = soberDays;
			chart.data.datasets[1].data = slipDays;
			chart.update();
		}
	});

	onMount(() => {
		let title = 'Sober Days vs. Slips';

		if (typeof window !== 'undefined' && window.matchMedia('(min-width: 480px)').matches) {
			title = 'Monthly Progress: Sober Days vs. Slips';
		}

		chart = new Chart(canvasEl, {
			type: 'bar',
			data: {
				labels,
				datasets: [
					{
						backgroundColor: 'rgba(202, 53, 0, 0.6)',
						borderColor: '#9f2d00',
						borderWidth: 1.5,
						data: [10, 8, 12, 6, 9, 7, 5, 11, 4, 3, 2, 1],
						label: 'Sober Days'
					},
					{
						backgroundColor: 'rgba(255, 105, 0, 0.6)',
						borderColor: '#9f2d00',
						borderSkipped: 'bottom',
						borderWidth: 1.5,
						data: [10, 8, 12, 6, 9, 7, 5, 11, 4, 3, 2, 1].reverse(),
						label: 'Slip Days'
					}
				]
			},
			options: {
				maintainAspectRatio: false,
				scales: {
					x: {
						stacked: true
					},
					y: {
						stacked: true,
						beginAtZero: true
					}
				},
				plugins: {
					legend: { position: 'bottom' },
					title: {
						color: '#9f2d00',
						display: true,
						font: { size: 24 },
						text: title
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
	<Pagination
		className="mb-5"
		nextLabel="increment year"
		onnext={() => activeYear++}
		onprevious={() => activeYear--}
		previousLabel="decrement year"
		text={String(activeYear)}
	/>
	<div class="relative w-full max-w-full overflow-x-auto">
		<canvas bind:this={canvasEl} class="h-auto w-full"></canvas>
	</div>
</div>
