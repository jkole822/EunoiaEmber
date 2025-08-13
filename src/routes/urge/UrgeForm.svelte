<script lang="ts">
	import DatePicker from '$lib/components/DatePicker/index.svelte';
	import Input from '$lib/components/Input/index.svelte';
	import NumberInput from '$lib/components/NumberInput/index.svelte';
	import { InputTypeEnum } from '$lib/components/Input/types';
</script>

<form class="my-10 rounded-lg bg-primary-100 p-10" method="post">
	<h1 class="text-center text-5xl font-mono mb-10 tracking-wider">Log Urge</h1>
	<DatePicker className="mb-7" label="Date" name="date" required />
	<Input
		className="mb-7 [&_[type=time]_~_label]:bg-primary-100!"
		label="Time"
		name="time"
		required
		type={InputTypeEnum.time}
	/>
	<NumberInput
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
		className="mb-7 [&_textarea:focus_~_label]:bg-primary-100 [&_textarea]:data-[raise-label=true]:[&_~_label]:bg-primary-100"
		description="Describe anything relevant surrounding the urge such as triggers and coping mechanisms attempted. Was there success or failure?"
		isTextArea
		label="Notes"
		name="notes"
	/>
</form>
