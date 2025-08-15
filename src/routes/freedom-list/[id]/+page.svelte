<script lang="ts">
	import FreedomListForm from '../FreedomListForm.svelte';
	import type { ActionData, PageData } from './$types';

	let { data, form }: { data: PageData; form: ActionData } = $props();
</script>

<FreedomListForm
	{form}
	freedomListItem={data.freedomListItem}
	submitText="Update"
	title="Update Your Reason"
/>
