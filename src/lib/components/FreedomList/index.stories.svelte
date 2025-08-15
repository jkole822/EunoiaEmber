<script module>
	import dayjs from 'dayjs';
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { faker } from '@faker-js/faker';
	import FreedomList from './index.svelte';

	const today = dayjs();

	const generateFreedomListData = () =>
		Array.from({ length: 10 }, (_, index) => ({
			id: String(index),
			reason: faker.lorem.paragraph(),
			polarity: index % 2 === 0 ? 'positive' : 'negative',
			userId: 'user',
			createdAt: today.subtract(index + 1, 'day').toDate()
		}));

	const { Story } = defineMeta({
		title: 'FreedomList',
		component: FreedomList,
		tags: ['autodocs'],
		args: {
			className: '',
			freedomListItems: generateFreedomListData()
		},
		argTypes: {
			className: {
				control: 'text',
				description: 'Optional custom class for styling the list container.'
			},
			freedomListItems: {
				control: 'object',
				description: 'Array of FreedomListItem objects.',
				table: {
					type: {
						summary: `{
							id: string,
							polarity: 'positive' | 'negative',
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
