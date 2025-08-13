<script lang="ts">
	import UrgeForm from '../UrgeForm.svelte';
	import type { ActionData, PageData } from './$types';

	let { data, form }: { data: PageData; form: ActionData } = $props();
</script>

<UrgeForm {form} submitText="Update" title="Update Urge Log" urge={data.urge} />
