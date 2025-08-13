<script lang="ts">
	import dayjs from 'dayjs';
	import Button from '$lib/components/Button/index.svelte';
	import DatePicker from '$lib/components/DatePicker/index.svelte';
	import Input from '$lib/components/Input/index.svelte';
	import NumberInput from '$lib/components/NumberInput/index.svelte';
	import { ButtonVariantsEnum } from '$lib/components/Button/types';
	import { InputTypeEnum } from '$lib/components/Input/types';
</script>

<form class="my-10 rounded-lg bg-primary-100 p-10" method="post">
	<h1 class="mb-10 text-center font-mono text-5xl tracking-wider">Log Urge</h1>
	<DatePicker
		className="mb-7"
		isDateUnavailable={(date) => dayjs(`${date.year}-${date.month}-${date.day}`).isAfter(dayjs())}
		label="Date"
		name="date"
		outsideDaySelectable
		required
	/>
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
	<Button className="mt-10" type="submit" variant={ButtonVariantsEnum.Emphasis}>Submit</Button>
</form>
