<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Toast from './story.svelte';

	const { Story } = defineMeta({
		title: 'Toast',
		component: Toast,
		tags: ['autodocs']
	});
</script>

<Story name="Default" />
