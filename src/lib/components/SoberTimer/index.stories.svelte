<script module>
	import dayjs from 'dayjs';
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import SoberTimer from './index.svelte';

	const today = dayjs();
	const mockSlipDates = [
		{ date: today.subtract(1, 'day').format('YYYY-MM-DD'), time: '00:00' },
		{ date: today.subtract(3, 'day').format('YYYY-MM-DD'), time: '00:00' },
		{ date: today.subtract(7, 'day').format('YYYY-MM-DD'), time: '00:00' }
	];

	const { Story } = defineMeta({
		title: 'SoberTimer',
		component: SoberTimer,
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
				description: 'Optional custom class for styling the timer container.'
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

<Story name="Widget" args={{ className: 'w-full md:w-1/2' }} />
