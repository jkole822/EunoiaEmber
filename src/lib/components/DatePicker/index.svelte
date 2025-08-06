<script lang="ts">
	// WARNING: Does not work on re-renders, only on initial load.
	import { DatePicker } from '@ark-ui/svelte/date-picker';
	import { Field } from '@ark-ui/svelte/field';
	import { Portal } from '@ark-ui/svelte/portal';
	import {
		CenterAbsoluteStyles,
		DescriptionStyles,
		ErrorMessageStyles,
		LabelStyles
	} from '$lib/styles';
	import {
		InputStyles,
		NextPrevTriggerStyles,
		TableCellTriggerStyles,
		TriggerStyles,
		ViewTriggerStyles
	} from './styles';
	import type { DateView, DatePickerContext, Props } from './types';
	import { ValidationStateEnum } from '$lib/types';

	let {
		className = '',
		description,
		disabled,
		errorMessage,
		label,
		readOnly,
		required,
		validationState,
		value = $bindable(),
		withField,
		...rest
	}: Props = $props();

	const dateViews: DateView[] = ['day', 'month', 'year'];
</script>

{#snippet datePickerViewDayTable(datePicker: DatePickerContext)}
	<DatePicker.Table>
		<DatePicker.TableHead>
			<DatePicker.TableRow>
				{#each datePicker().weekDays as weekDay, index (index)}
					<DatePicker.TableHeader class="w-13">{weekDay.short}</DatePicker.TableHeader>
				{/each}
			</DatePicker.TableRow>
		</DatePicker.TableHead>
		<DatePicker.TableBody>
			{#each datePicker().weeks as week, index (index)}
				<DatePicker.TableRow>
					{#each week as day, index (index)}
						<DatePicker.TableCell value={day}>
							<DatePicker.TableCellTrigger class={TableCellTriggerStyles}
								>{day.day}</DatePicker.TableCellTrigger
							>
						</DatePicker.TableCell>
					{/each}
				</DatePicker.TableRow>
			{/each}
		</DatePicker.TableBody>
	</DatePicker.Table>
{/snippet}

{#snippet datePickerViewMonthTable(datePicker: DatePickerContext)}
	<DatePicker.Table>
		<DatePicker.TableBody>
			{#each datePicker().getMonthsGrid({ columns: 4, format: 'short' }) as months, index (index)}
				<DatePicker.TableRow>
					{#each months as month, index (index)}
						<DatePicker.TableCell value={month.value}>
							<DatePicker.TableCellTrigger class={[TableCellTriggerStyles, 'px-6']}
								>{month.label}</DatePicker.TableCellTrigger
							>
						</DatePicker.TableCell>
					{/each}
				</DatePicker.TableRow>
			{/each}
		</DatePicker.TableBody>
	</DatePicker.Table>
{/snippet}

{#snippet datePickerViewYearTable(datePicker: DatePickerContext)}
	<DatePicker.Table>
		<DatePicker.TableBody>
			{#each datePicker().getYearsGrid({ columns: 4 }) as years, index (index)}
				<DatePicker.TableRow>
					{#each years as year, index (index)}
						<DatePicker.TableCell value={year.value}>
							<DatePicker.TableCellTrigger class={[TableCellTriggerStyles, 'px-6']}
								>{year.label}</DatePicker.TableCellTrigger
							>
						</DatePicker.TableCell>
					{/each}
				</DatePicker.TableRow>
			{/each}
		</DatePicker.TableBody>
	</DatePicker.Table>
{/snippet}

{#snippet datePickerView(view: DateView)}
	<DatePicker.View {view}>
		<DatePicker.Context>
			{#snippet render(datePicker)}
				<DatePicker.ViewControl class="mb-2 flex items-center justify-between">
					<DatePicker.PrevTrigger aria-label="previous" class={NextPrevTriggerStyles}
						><i aria-hidden="true" class={[CenterAbsoluteStyles, 'fa-solid fa-chevron-left']}
						></i></DatePicker.PrevTrigger
					>
					<DatePicker.ViewTrigger class={ViewTriggerStyles}>
						<DatePicker.RangeText />
					</DatePicker.ViewTrigger>
					<DatePicker.NextTrigger aria-label="next" class={NextPrevTriggerStyles}
						><i aria-hidden="true" class={[CenterAbsoluteStyles, 'fa-solid fa-chevron-right']}
						></i></DatePicker.NextTrigger
					>
				</DatePicker.ViewControl>
				{#if view === 'day'}
					{@render datePickerViewDayTable(datePicker)}
				{:else if view === 'month'}
					{@render datePickerViewMonthTable(datePicker)}
				{:else if view === 'year'}
					{@render datePickerViewYearTable(datePicker)}
				{/if}
			{/snippet}
		</DatePicker.Context>
	</DatePicker.View>
{/snippet}

{#snippet base()}
	<DatePicker.Root {...rest} bind:value>
		{#if label}
			<DatePicker.Label class={LabelStyles}>{label}</DatePicker.Label>
		{/if}
		<DatePicker.Control>
			<div class="relative">
				<DatePicker.Input class={InputStyles} />
				<DatePicker.Trigger aria-label="open calendar" class={TriggerStyles}
					><i aria-hidden="true" class="fa-solid fa-calendar"></i></DatePicker.Trigger
				>
			</div>
		</DatePicker.Control>
		<Portal>
			<DatePicker.Positioner>
				<DatePicker.Content class="rounded-lg bg-primary-100 p-4 ring-1 ring-primary-500">
					{#each dateViews as view (view)}
						{@render datePickerView(view)}
					{/each}
				</DatePicker.Content>
			</DatePicker.Positioner>
		</Portal>
	</DatePicker.Root>
{/snippet}

{#if withField}
	<Field.Root
		class={className}
		invalid={validationState === ValidationStateEnum.Invalid}
		{readOnly}
		{required}
		{disabled}
	>
		{@render base()}
		{#if description || errorMessage}
			<div class="mt-2">
				{#if description}
					<Field.HelperText class={DescriptionStyles}>
						{description}
					</Field.HelperText>
				{/if}
				{#if errorMessage}
					<Field.ErrorText class={ErrorMessageStyles}>
						{errorMessage}
					</Field.ErrorText>
				{/if}
			</div>
		{/if}
	</Field.Root>
{:else}
	<div class={className}>
		{@render base()}
	</div>
{/if}
