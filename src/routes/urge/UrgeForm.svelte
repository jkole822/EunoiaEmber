<script lang="ts">
	import dayjs from 'dayjs';
	import { onMount } from 'svelte';
	import { parseDate } from '@ark-ui/svelte/date-picker';
	import Button from '$lib/components/Button/index.svelte';
	import DatePicker from '$lib/components/DatePicker/index.svelte';
	import Input from '$lib/components/Input/index.svelte';
	import NumberInput from '$lib/components/NumberInput/index.svelte';
	import { ButtonVariantsEnum } from '$lib/components/Button/types';
	import { InputTypeEnum } from '$lib/components/Input/types';
	import type { ActionData } from './create/$types';
	import type { Urge } from '$lib/server/db/schema';

	let {
		form,
		submitText = 'Submit',
		title = 'Log an Urge',
		urge
	}: { form?: ActionData; submitText?: string; title?: string; urge?: Urge } = $props();

	let date = $state(
		urge?.date ? [parseDate(dayjs(urge.date, 'MM/DD/YYYY').format('YYYY-MM-DD'))] : undefined
	);
	let intensity = $state(urge?.intensity ? String(urge?.intensity) : '1');
	let isiOS = $state(false);
	let notes = $state(urge?.notes ?? '');
	let time = $state(urge?.time ?? '00:00');

	const handleDelete = async () => {
		if (urge) {
			const res = await fetch(`/urge/${urge.id}/delete`, { method: 'DELETE' });

			if (res.ok) {
				window.location.href = '/urge';
			}
		}
	};

	onMount(() => {
		isiOS =
			/iPad|iPhone|iPod/.test(navigator.userAgent) ||
			(navigator.userAgent.includes('Mac') && 'ontouchend' in document);
	});
</script>

<form class="mx-auto my-10 max-w-2xl rounded-lg bg-primary-100 p-10" method="post">
	<h1 class="mb-10 text-center font-mono text-5xl tracking-wider">{title}</h1>
	{#if form?.message}
		<p class="mb-3 text-center font-mono text-red-600">{form.message}</p>
	{/if}
	<DatePicker
		bind:value={date}
		className="mb-7"
		isDateUnavailable={(date) => dayjs(`${date.year}-${date.month}-${date.day}`).isAfter(dayjs())}
		label="Date"
		name="date"
		outsideDaySelectable
		required
	/>
	<Input
		bind:value={time}
		className="mb-7 [&_input:focus_~_label]:bg-primary-100 [&_input]:data-[raise-label=true]:[&_~_label]:bg-primary-100 [&_[type=time]_~_label]:bg-primary-100!"
		description={isiOS ? '24-Hour Format: HH:mm' : undefined}
		label="Time"
		name="time"
		required
		type={isiOS ? InputTypeEnum.text : InputTypeEnum.time}
	/>
	<NumberInput
		bind:value={intensity}
		className="mb-7"
		defaultValue="1"
		description="Rate the intensity of your urge on a scale from 1 to 10"
		label="Intensity"
		max={10}
		min={1}
		name="intensity"
		withField
	/>
	<Input
		bind:value={notes}
		className="mb-7 [&_textarea:focus_~_label]:bg-primary-100 [&_textarea]:data-[raise-label=true]:[&_~_label]:bg-primary-100"
		description="Describe anything relevant surrounding the urge such as triggers and coping mechanisms attempted. Was there success or failure?"
		isTextArea
		label="Notes"
		name="notes"
	/>
	<div
		class={[
			'mt-10 flex flex-col items-center justify-center gap-4 xs:flex-row xs:justify-between',
			urge ? '' : ''
		]}
	>
		<Button className="w-full xs:w-52" type="submit" variant={ButtonVariantsEnum.Emphasis}
			>{submitText}</Button
		>
		{#if urge}
			<Button className="w-full xs:w-auto" onclick={handleDelete} type="submit">Delete</Button>
		{/if}
	</div>
</form>
