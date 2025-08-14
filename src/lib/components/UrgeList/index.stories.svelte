<script module>
	import dayjs from 'dayjs';
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { faker } from '@faker-js/faker';
	import UrgeList from './index.svelte';

	const today = dayjs();

	const generateUrgeData = () =>
		Array.from({ length: 10 }, (_, index) => ({
			date: today.subtract(index + 1, 'day').format('MM/DD/YYYY'),
			id: String(index),
			intensity: Math.ceil(Math.random() * 10),
			notes: index === 0 ? '' : faker.lorem.paragraph(),
			time: index % 2 === 0 ? '00:00' : '15:30',
			userId: 'user',
			createdAt: today.subtract(index + 1, 'day').toDate()
		}));

	const { Story } = defineMeta({
		title: 'UrgeList',
		component: UrgeList,
		tags: ['autodocs'],
		args: {
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
							date: string (MM/DD/YYYY format),
							time: string (24 hour format),
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

<Story name="Dashboard" />

<Story name="Listing Page" args={{ anchorDate: today.subtract(1, 'year').format('YYYY-MM-DD') }} />
