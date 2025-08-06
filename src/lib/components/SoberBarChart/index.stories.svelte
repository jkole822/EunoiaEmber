<script module>
	import dayjs from 'dayjs';
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import SoberBarChart from './index.svelte';

	const today = dayjs();
	const mockSlipDates = [
		today.subtract(1, 'day').format('YYYY-MM-DD'),
		today.subtract(2, 'day').format('YYYY-MM-DD'),
		today.subtract(3, 'day').format('YYYY-MM-DD'),
		today.subtract(1, 'month').subtract(1, 'day').format('YYYY-MM-DD'),
		today.subtract(1, 'month').subtract(2, 'day').format('YYYY-MM-DD'),
		today.subtract(1, 'month').subtract(3, 'day').format('YYYY-MM-DD'),
		today.subtract(1, 'month').subtract(4, 'day').format('YYYY-MM-DD'),
		today.subtract(1, 'month').subtract(5, 'day').format('YYYY-MM-DD'),
		today.subtract(1, 'month').subtract(6, 'day').format('YYYY-MM-DD'),
		today.subtract(2, 'month').subtract(1, 'day').format('YYYY-MM-DD'),
		today.subtract(2, 'month').subtract(2, 'day').format('YYYY-MM-DD'),
		today.subtract(2, 'month').subtract(3, 'day').format('YYYY-MM-DD'),
		today.subtract(2, 'month').subtract(4, 'day').format('YYYY-MM-DD'),
		today.subtract(2, 'month').subtract(5, 'day').format('YYYY-MM-DD'),
		today.subtract(2, 'month').subtract(6, 'day').format('YYYY-MM-DD'),
		today.subtract(2, 'month').subtract(7, 'day').format('YYYY-MM-DD'),
		today.subtract(2, 'month').subtract(8, 'day').format('YYYY-MM-DD'),
		today.subtract(2, 'month').subtract(9, 'day').format('YYYY-MM-DD')
	];

	const { Story } = defineMeta({
		title: 'SoberBarChart',
		component: SoberBarChart,
		tags: ['autodocs'],
		args: {
			anchorDate: today.subtract(6, 'month').format('YYYY-MM-DD'),
			className: '',
			slipDates: mockSlipDates
		},
		argTypes: {
			anchorDate: {
				control: 'text',
				description: 'The starting date for sobriety tracking (YYYY-MM-DD format).'
			},
			className: {
				control: 'text',
				description: 'Optional custom class for styling the chart container.'
			},
			slipDates: {
				control: 'object',
				description:
					'An array of slip date strings (YYYY-MM-DD) used to calculate slip/sober days.',
				table: {
					type: { summary: 'string[]' }
				}
			}
		}
	});
</script>

<Story name="Default" />

<Story
	name="Multiple Years"
	args={{
		anchorDate: today.subtract(2, 'year').format('YYYY-MM-DD'),
		slipDates: [
			...mockSlipDates,
			today.subtract(1, 'month').subtract(1, 'day').format('YYYY-MM-DD'),
			today.subtract(1, 'year').subtract(2, 'month').subtract(2, 'day').format('YYYY-MM-DD'),
			today.subtract(1, 'year').subtract(2, 'month').subtract(3, 'day').format('YYYY-MM-DD'),
			today.subtract(1, 'year').subtract(2, 'month').subtract(4, 'day').format('YYYY-MM-DD'),
			today.subtract(1, 'year').subtract(2, 'month').subtract(5, 'day').format('YYYY-MM-DD'),
			today.subtract(1, 'year').subtract(2, 'month').subtract(6, 'day').format('YYYY-MM-DD'),
			today.subtract(1, 'year').subtract(4, 'month').subtract(1, 'day').format('YYYY-MM-DD'),
			today.subtract(1, 'year').subtract(4, 'month').subtract(2, 'day').format('YYYY-MM-DD'),
			today.subtract(1, 'year').subtract(4, 'month').subtract(3, 'day').format('YYYY-MM-DD'),
			today.subtract(1, 'year').subtract(4, 'month').subtract(4, 'day').format('YYYY-MM-DD'),
			today.subtract(1, 'year').subtract(6, 'month').subtract(5, 'day').format('YYYY-MM-DD'),
			today.subtract(1, 'year').subtract(6, 'month').subtract(6, 'day').format('YYYY-MM-DD'),
			today.subtract(1, 'year').subtract(6, 'month').subtract(7, 'day').format('YYYY-MM-DD'),
			today.subtract(1, 'year').subtract(6, 'month').subtract(8, 'day').format('YYYY-MM-DD'),
			today.subtract(1, 'year').subtract(6, 'month').subtract(9, 'day').format('YYYY-MM-DD')
		]
	}}
/>
