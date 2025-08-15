<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import ResetEmail from './index.svelte';

	const { Story } = defineMeta({
		title: 'ResetEmail',
		component: ResetEmail,
		tags: ['autodocs'],
	});
</script>

<Story name="Default" />
