<script lang="ts">
	import Button from '$lib/components/Button/index.svelte';
	import Input from '$lib/components/Input/index.svelte';
	import Switch from '$lib/components/Switch/index.svelte';
	import { ButtonVariantsEnum } from '$lib/components/Button/types';

	import type { ActionData } from './create/$types';
	import type { FreedomListItem } from '$lib/server/db/schema';

	let {
		form,
		submitText = 'Submit',
		title = 'Fortify Motivation',
		freedomListItem
	}: {
		form?: ActionData;
		freedomListItem?: FreedomListItem;
		submitText?: string;
		title?: string;
	} = $props();

	let polarity = $state(freedomListItem?.polarity === 'positive' ? true : false);
	let reason = $state(freedomListItem?.reason ?? '');
	const faPolarityClass = $derived(polarity ? 'fa-plus' : 'fa-minus');

	const handleDelete = async () => {
		if (freedomListItem) {
			const res = await fetch(`/freedom-list/${freedomListItem.id}/delete`, { method: 'DELETE' });

			if (res.ok) {
				window.location.href = '/freedom-list';
			}
		}
	};
</script>

<form class="mx-auto my-10 max-w-2xl rounded-lg bg-primary-100 p-10" method="post">
	<h1 class="mb-10 text-center font-mono text-5xl tracking-wider">{title}</h1>
	{#if form?.message}
		<p class="mb-3 font-mono text-red-600 underline">{form.message}</p>
	{/if}
	<Switch
		bind:checked={polarity}
		className="[&_.switch-container]:flex [&_.switch-container]:items-center [&_.switch-container]:gap-8 mb-7"
		description="Toggle the switch if your input below represents a positive reason to abstain; otherwise, leave it up to indicate a negative aspect or memory related to use."
		label="Polarity"
		name="polarity"
		withField
		><div
			class="flex size-12 items-center justify-center rounded-full bg-primary-800 text-xl text-primary-100"
			aria-hidden="true"
			role="presentation"
		>
			<i class={[faPolarityClass, 'fa-solid']}></i>
		</div></Switch
	>
	<Input
		bind:value={reason}
		className="mb-7 [&_textarea:focus_~_label]:bg-primary-100 [&_textarea]:data-[raise-label=true]:[&_~_label]:bg-primary-100"
		description="Please describe your reason for abstaining from the substance or activity. This will help you remember why you chose to abstain in the first place."
		isTextArea
		label="Reason"
		name="reason"
	/>
	<div
		class={[
			'mt-10 flex flex-col items-center justify-center gap-4 xs:flex-row xs:justify-between',
			freedomListItem ? '' : ''
		]}
	>
		<Button className="w-full xs:w-52" type="submit" variant={ButtonVariantsEnum.Emphasis}
			>{submitText}</Button
		>
		{#if freedomListItem}
			<Button className="w-full xs:w-auto" onclick={handleDelete} type="submit">Delete</Button>
		{/if}
	</div>
</form>
