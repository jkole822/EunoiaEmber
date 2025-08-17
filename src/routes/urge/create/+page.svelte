<script lang="ts">
	import UrgeForm from '../UrgeForm.svelte';
	import type { ActionData } from './$types';

	let { form }: { form: ActionData } = $props();
</script>

<UrgeForm {form} />
