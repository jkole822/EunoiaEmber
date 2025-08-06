<script lang="ts">
	import TrackerForm from '../TrackerForm.svelte';
	import type { ActionData, PageData } from './$types';

	let { data, form }: { data: PageData; form: ActionData } = $props();
</script>

<TrackerForm
	{form}
	slipDates={data.slipDates}
	submitText="Update"
	title="Update Progress Tracker"
	tracker={data.tracker}
/>
