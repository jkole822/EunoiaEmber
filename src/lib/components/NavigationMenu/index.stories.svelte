<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import NavigationMenu from './index.svelte';

	const { Story } = defineMeta({
		title: 'NavigationMenu',
		component: NavigationMenu,
		tags: ['autodocs'],
		args: {
			links: [
				{ href: '#lorem', title: 'Lorem' },
				{ href: '#ipsum', title: 'Ipsum' },
				{ href: '#dolor-sit', title: 'Dolor Sit' },
				{ href: '#sign-out', title: 'Sign Out' }
			]
		},
		argTypes: {
			className: {
				control: 'text',
				description: 'CSS class for styling the navigation.'
			},
			links: {
				control: 'object',
				description: 'The array of navigation links.'
			}
		},
		parameters: {
			layout: 'fullscreen'
		}
	});
</script>

<Story name="Default" />
