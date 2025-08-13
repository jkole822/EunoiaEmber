<script module>
	import dayjs from 'dayjs';
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import SoberPieChart from './index.svelte';

	const today = dayjs();
	const mockSlipDates = [
		today.subtract(1, 'day').format('YYYY-MM-DD'),
		today.subtract(3, 'day').format('YYYY-MM-DD'),
		today.subtract(7, 'day').format('YYYY-MM-DD')
	];

	const { Story } = defineMeta({
		title: 'SoberPieChart',
		component: SoberPieChart,
		tags: ['autodocs'],
		args: {
			anchorDate: today.subtract(6, 'month').format('YYYY-MM-DD'),
			anchorTime: '08:00',
			className: '',
			slipDates: mockSlipDates
		},
		argTypes: {
			anchorDate: {
				control: 'text',
				description: 'The starting date for sobriety tracking (YYYY-MM-DD format).'
			},
			anchorTime: {
				control: 'text',
				description: 'The time associated with the anchor date (HH:mm format).'
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

<Story name="One Year" args={{ anchorDate: today.subtract(1, 'year').format('YYYY-MM-DD') }} />

<Story name="Widget" args={{ className: 'w-full md:w-1/2' }} />
