<script lang="ts">
	import TrackerForm from '../TrackerForm.svelte';
	import type { ActionData } from './$types';

	let { form }: { form: ActionData } = $props();
</script>

<TrackerForm {form} />
