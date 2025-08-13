<script module>
	import dayjs from 'dayjs';
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { faker } from '@faker-js/faker';
	import UrgeLineChart from './index.svelte';

	const today = dayjs();

	const generateUrgeData = () =>
		Array.from({ length: 370 }, (_, index) => ({
			date: today.subtract(index + 1, 'day').format('YYYY-MM-DD'),
			id: String(index),
			intensity: Math.ceil(Math.random() * 10),
			notes: faker.lorem.paragraph(),
			time: index % 2 === 0 ? '00:00' : '15:30',
			userId: 'user',
			createdAt: today.subtract(index + 1, 'day').toDate()
		}));

	const { Story } = defineMeta({
		title: 'UrgeLineChart',
		component: UrgeLineChart,
		tags: ['autodocs'],
		args: {
			anchorDate: today.subtract(6, 'month').format('YYYY-MM-DD'),
			className: '',
			urges: generateUrgeData()
		},
		argTypes: {
			className: {
				control: 'text',
				description: 'Optional custom class for styling the chart container.'
			},
			urges: {
				control: 'object',
				description: 'Array of Urge objects.',
				table: {
					type: {
						summary: `{
							id: string,
							date: string,
							time: string,
							intensity: number,
							notes: string
							userId: string (reference)
							createdAt: Date
						}[]`
					}
				}
			}
		}
	});
</script>

<Story name="Default" />

<Story name="One Year" args={{ anchorDate: today.subtract(1, 'year').format('YYYY-MM-DD') }} />
