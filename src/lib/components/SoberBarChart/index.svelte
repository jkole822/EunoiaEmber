<script lang="ts">
	import dayjs from 'dayjs';
	import {
		Chart,
		BarController,
		BarElement,
		CategoryScale,
		LinearScale,
		Tooltip,
		Legend,
		Title
	} from 'chart.js';
	import { onDestroy, onMount } from 'svelte';
	import Pagination from '$lib/components/Pagination/index.svelte';
	import type { Props } from './types';

	let { anchorDate, className = '', slipDates = [] }: Props = $props();

	Chart.register(BarController, BarElement, CategoryScale, LinearScale, Tooltip, Legend, Title);
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
			const monthYear = dayjs(`${month} ${activeYear}`);

			if (dayjs().isBefore(monthYear) || dayjs(anchorDate).isAfter(monthYear.endOf('month'))) {
				return { slipCount: 0, soberCount: 0 };
			}

			const slipCount = slipDates.reduce((acc, curr) => {
				const currentSlipDate = dayjs(curr);

				if (
					currentSlipDate.isAfter(monthYear.startOf('month')) &&
					currentSlipDate.isBefore(monthYear.endOf('month'))
				) {
					return acc + 1;
				}

				return acc;
			}, 0);

			const soberCount = monthYear.daysInMonth() - slipCount;

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
						backgroundColor: 'rgb(202,53,0,0.6)',
						borderColor: '#9f2d00',
						borderWidth: 1.5,
						data: [],
						label: 'Sober Days'
					},
					{
						backgroundColor: 'rgb(255,105,0,0.6)',
						borderColor: '#9f2d00',
						borderSkipped: 'bottom',
						borderWidth: 1.5,
						data: [],
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
