<script lang="ts">
	import dayjs from 'dayjs';
	import { onMount } from 'svelte';
	import Button from '$lib/components/Button/index.svelte';
	import Input from '$lib/components/Input/index.svelte';
	import NumberInput from '$lib/components/NumberInput/index.svelte';
	import Step from './Step.svelte';
	import { steps } from './steps';
	import { ParagraphStyles, SlipDateTimeInputContainer, TitleStyles } from './styles';
	import { SubHeadingStyles } from '$lib/styles';
	import { formatDate } from '$lib/utils/formatDate';
	import { ButtonVariantsEnum } from '$lib/components/Button/types';
	import { InputTypeEnum } from '$lib/components/Input/types';
	import type { ActionData } from './create/$types';
	import type { SlipDate, Tracker } from '$lib/server/db/schema';

	let {
		slipDates,
		tracker,
		form,
		title = 'Create Progress Tracker',
		submitText = 'Submit'
	}: {
		slipDates?: SlipDate[];
		tracker?: Tracker;
		form?: ActionData;
		title?: string;
		submitText?: string;
	} = $props();

	let anchorDate = $state(tracker?.anchorDate || dayjs().format('YYYY-MM-DD'));
	let anchorTime = $state(tracker?.anchorTime || '00:00');
	let isiOS = $state(false);
	let page = $state(1);
	let previousPage = $state(1);
	let slipCount = $state(slipDates ? String(slipDates.length) : '0');
	let slipDatesArray = $state(slipDates || []);

	let formattedAnchorDateTime = $derived(
		anchorDate && anchorTime ? formatDate(anchorDate, anchorTime) : ''
	);

	let formattedSlipDates = $derived(
		slipDatesArray.map((slipDate) => formatDate(slipDate.date, slipDate.time))
	);

	let paginationDirection: 'forward' | 'backward' = $derived(
		page > previousPage ? 'forward' : 'backward'
	);

	let slipCountNumber = $derived(Number(slipCount));

	const handleSlipDateChange = (event: Event, index: number) => {
		const { value } = event.target as HTMLInputElement;
		const slipDatesArrayCopy = [...slipDatesArray];
		slipDatesArrayCopy[index] = {
			...slipDatesArrayCopy[index],
			time: slipDatesArrayCopy[index]?.time ?? '00:00',
			date: value
		};
		slipDatesArray = slipDatesArrayCopy;
	};

	const handleSlipTimeChange = (event: Event, index: number) => {
		const { value } = event.target as HTMLInputElement;
		const slipDatesArrayCopy = [...slipDatesArray];
		slipDatesArrayCopy[index] = {
			...slipDatesArrayCopy[index],
			time: value
		};
		slipDatesArray = slipDatesArrayCopy;
	};

	const handlePrevious = () => {
		previousPage = page;
		page -= 1;
	};

	const handleNext = () => {
		previousPage = page;
		page += 1;
	};

	$effect(() => {
		if (slipCountNumber > slipDatesArray.length) {
			const newSlipDates = Array.from(
				{ length: slipCountNumber - slipDatesArray.length },
				(_, i) => ({
					createdAt: new Date(),
					date: dayjs().format('YYYY-MM-DD'),
					id: '',
					time: '00:00',
					trackerId: ''
				})
			);
			slipDatesArray = [...slipDatesArray, ...newSlipDates];
		} else if (slipCountNumber < slipDatesArray.length) {
			slipDatesArray = slipDatesArray.slice(0, slipCountNumber);
		}
	});

	onMount(() => {
		isiOS =
			/iPad|iPhone|iPod/.test(navigator.userAgent) ||
			(navigator.userAgent.includes('Mac') && 'ontouchend' in document);
	});
</script>

{#snippet submitButton()}
	<Button className="mt-10" type="submit" variant={ButtonVariantsEnum.Emphasis}>
		{submitText}
	</Button>
{/snippet}

<form class="my-10 max-w-3xl" method="post">
	<input name="anchorDate" required type="hidden" value={anchorDate} />
	<input name="anchorTime" required type="hidden" value={anchorTime} />
	{#each Array.from({ length: slipCountNumber }) as _, index (index)}
		<input name="slipDate" required type="hidden" value={slipDatesArray[index]?.date} />
		<input name="slipTime" required type="hidden" value={slipDatesArray[index]?.time || '00:00'} />
	{/each}

	<h1 class={TitleStyles}>{title}</h1>
	{#if form?.message}
		<p class="mb-3 text-center font-mono text-red-600">{form.message}</p>
	{/if}
	{#if tracker?.id}
		<input name="id" type="hidden" value={tracker.id} />
	{/if}
	{#if page === 1}
		<Step
			disableNext={!anchorDate || !anchorTime}
			disablePrev
			onNext={handleNext}
			{paginationDirection}
		>
			<p class={ParagraphStyles}>
				{steps[0].text}
			</p>
			<div class="flex flex-col gap-6 xs:flex-row xs:items-center xs:gap-4">
				<Input
					bind:value={anchorDate}
					className="xs:w-50"
					description={isiOS ? 'Format: YYYY-MM-DD' : undefined}
					label={steps[0].label}
					required
					type={isiOS ? InputTypeEnum.text : InputTypeEnum.date}
				/>
				<Input
					bind:value={anchorTime}
					className="xs:w-50"
					description={isiOS ? '24-Hour Format: HH:mm' : undefined}
					label={steps[0].labelTwo}
					required
					type={isiOS ? InputTypeEnum.text : InputTypeEnum.time}
				/>
			</div>
		</Step>
	{:else if page === 2}
		<Step onNext={handleNext} onPrev={handlePrevious} {paginationDirection}>
			<p class={ParagraphStyles}>
				{steps[1].text}
			</p>
			<NumberInput
				bind:value={slipCount}
				className="xs:w-50"
				label={steps[1].label}
				min={0}
				required
				step={1}
			/>
		</Step>
	{:else if page === 3 && slipCountNumber > 0}
		<Step
			disableNext={slipDatesArray.length !== slipCountNumber ||
				slipDatesArray.some((item) => !item.date || !item.time)}
			onNext={handleNext}
			onPrev={handlePrevious}
			{paginationDirection}
		>
			<p class={ParagraphStyles}>
				{steps[2].text}
			</p>
			<div class="flex flex-col gap-8 xs:w-fit">
				{#each Array.from({ length: slipCountNumber }) as _, index (index)}
					<div class={SlipDateTimeInputContainer}>
						<Input
							className="xs:w-50"
							description={isiOS ? 'Format: YYYY-MM-DD' : undefined}
							label={steps[2].label}
							oninput={(e) => handleSlipDateChange(e, index)}
							required
							type={isiOS ? InputTypeEnum.text : InputTypeEnum.date}
							value={slipDatesArray[index]?.date}
						/>
						<Input
							className="xs:w-50"
							description={isiOS ? '24-Hour Format: HH:mm' : undefined}
							label={steps[2].labelTwo}
							oninput={(e) => handleSlipTimeChange(e, index)}
							required
							type={isiOS ? InputTypeEnum.text : InputTypeEnum.time}
							value={slipDatesArray[index]?.time}
						/>
					</div>
				{/each}
			</div>
		</Step>
	{:else if (page === 3 && slipCountNumber === 0) || page === 4}
		<Step disableNext onPrev={handlePrevious} {paginationDirection} {submitButton}>
			<p class={ParagraphStyles}>
				{steps[3].text}
			</p>
			<p class={SubHeadingStyles}>Anchor Date</p>
			<p>{formattedAnchorDateTime}</p>
			<p class={SubHeadingStyles}>Slip Days</p>
			<p>{slipCount}</p>
			<p class={SubHeadingStyles}>Slip Date{slipDatesArray.length > 1 ? 's' : ''}</p>
			{#each formattedSlipDates as slipDate, index (index)}
				<p>{slipDate}</p>
			{/each}
		</Step>
	{/if}
</form>
