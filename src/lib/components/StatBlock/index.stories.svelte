<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { faker } from '@faker-js/faker';
	import StatBlock from './index.svelte';

	const { Story } = defineMeta({
		title: 'StatBlock',
		component: StatBlock,
		tags: ['autodocs'],
		args: {
			className: '',
			iconClass: 'fa-fire',
			stat: '97%',
			title: faker.lorem.words(3)
		},
		argTypes: {
			className: {
				control: 'text',
				description: 'Optional custom class for styling the stat block.'
			}
		}
	});
</script>

<Story name="Default" />
