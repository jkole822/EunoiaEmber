<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { faker } from '@faker-js/faker';
	import DatePicker from './story.svelte';
	import { ValidationStateEnum } from '$lib/types';

	const { Story } = defineMeta({
		title: 'DatePicker',
		component: DatePicker,
		tags: ['autodocs'],
		args: {
			closeOnSelect: true,
			defaultView: 'day',
			description: faker.lorem.sentence(),
			disabled: false,
			errorMessage: faker.lorem.sentence(),
			fixedWeeks: false,
			inline: false,
			label: faker.lorem.word(),
			lazyMount: false,
			locale: 'en-US',
			name: "date-picker",
			numOfMonths: 1,
			outsideDaySelectable: true,
			readOnly: false,
			required: false,
			selectionMode: 'single',
			skipAnimationOnMount: false,
			startOfWeek: 0,
			unmountOnExit: false,
			validationState: ValidationStateEnum.Valid
		},
		argTypes: {
			className: {
				control: 'text',
				description: 'Custom class name for the component.',
				table: { category: 'Appearance' }
			},
			closeOnSelect: {
				control: 'boolean',
				description: 'Whether to close the calendar popover after a date is selected.',
				table: { category: 'Behavior' }
			},
			defaultView: {
				control: { type: 'select' },
				options: ['day', 'month', 'year'],
				description: 'The default calendar view.',
				table: { category: 'Behavior' }
			},
			description: {
				control: 'text',
				description: 'Optional description for the date picker.',
				table: { category: 'Content' }
			},
			disabled: {
				control: 'boolean',
				description: 'Disables the component.',
				table: { category: 'State' }
			},
			errorMessage: {
				control: 'text',
				description: 'Error message to display when validation fails.',
				table: { category: 'State' }
			},
			fixedWeeks: {
				control: 'boolean',
				description: 'Whether to show a fixed number of weeks in the calendar view.',
				table: { category: 'Behavior' }
			},
			focusedValue: {
				control: 'object',
				description: 'The currently focused date.',
				table: { category: 'State' }
			},
			id: {
				control: 'text',
				description: 'Unique identifier for the input field.',
				table: { category: 'General' }
			},
			inline: {
				control: 'boolean',
				description: 'Renders the calendar inline instead of as a popover.',
				table: { category: 'Appearance' }
			},
			isDateUnavailable: {
				control: false,
				description: 'Function to determine if a date is unavailable.',
				table: { category: 'Behavior' }
			},
			lazyMount: {
				control: 'boolean',
				description: 'Whether to lazy mount the popover content.',
				table: { category: 'Performance' }
			},
			locale: {
				control: 'text',
				description: 'Locale for date formatting (e.g., en-US).',
				table: { category: 'Localization' }
			},
			max: {
				control: 'object',
				description: 'Maximum selectable date.',
				table: { category: 'Constraints' }
			},
			maxView: {
				control: { type: 'select' },
				options: ['day', 'month', 'year'],
				description: 'Maximum calendar view level.',
				table: { category: 'Constraints' }
			},
			min: {
				control: 'object',
				description: 'Minimum selectable date.',
				table: { category: 'Constraints' }
			},
			minView: {
				control: { type: 'select' },
				options: ['day', 'month', 'year'],
				description: 'Minimum calendar view level.',
				table: { category: 'Constraints' }
			},
			name: {
				control: 'text',
				description: 'Name for the input field.',
				table: { category: 'General' }
			},
			numOfMonths: {
				control: 'number',
				description: 'Number of months displayed in the calendar.',
				table: { category: 'Appearance' }
			},
			onExitComplete: {
				action: 'onExitComplete',
				description: 'Callback after the exit transition is complete.',
				table: { category: 'Events' }
			},
			onFocusChange: {
				action: 'onFocusChange',
				description: 'Callback when the focused date changes.',
				table: { category: 'Events' }
			},
			onOpenChange: {
				action: 'onOpenChange',
				description: 'Callback when the open state changes.',
				table: { category: 'Events' }
			},
			onValueChange: {
				action: 'onValueChange',
				description: 'Callback when the selected value changes.',
				table: { category: 'Events' }
			},
			onViewChange: {
				action: 'onViewChange',
				description: 'Callback when the view changes.',
				table: { category: 'Events' }
			},
			outsideDaySelectable: {
				control: 'boolean',
				description: 'Allows selecting days outside the current month.',
				table: { category: 'Behavior' }
			},
			placeholder: {
				control: 'text',
				description: 'Placeholder text for the input field.',
				table: { category: 'Content' }
			},
			present: {
				control: 'boolean',
				description: 'Whether the calendar popover is currently present.',
				table: { category: 'State' }
			},
			readOnly: {
				control: 'boolean',
				description: 'Makes the input field read-only.',
				table: { category: 'State' }
			},
			required: {
				control: 'boolean',
				description: 'Marks the input field as required.',
				table: { category: 'State' }
			},
			selectionMode: {
				control: { type: 'select' },
				options: ['single', 'multiple', 'range'],
				description: 'Specifies the selection mode for dates.',
				table: { category: 'Behavior' }
			},
			skipAnimationOnMount: {
				control: 'boolean',
				description: 'Skips the animation when mounting the component.',
				table: { category: 'Performance' }
			},
			startOfWeek: {
				control: 'number',
				description: 'Specifies the start day of the week (0 = Sunday, 1 = Monday, etc.).',
				table: { category: 'Localization' }
			},
			timeZone: {
				control: 'text',
				description: 'Timezone for date calculations.',
				table: { category: 'Localization' }
			},
			unmountOnExit: {
				control: 'boolean',
				description: 'Unmounts the popover content on exit.',
				table: { category: 'Performance' }
			},
			validationState: {
				control: { type: 'select' },
				options: ['valid', 'invalid', 'none'],
				description: 'Validation state of the input field.',
				table: { category: 'State' }
			},
			value: {
				control: 'object',
				description: 'Selected date(s).',
				table: { category: 'State' }
			},
			view: {
				control: { type: 'select' },
				options: ['day', 'month', 'year'],
				description: 'Current calendar view.',
				table: { category: 'State' }
			},
			withField: {
				control: 'boolean',
				description: 'Wraps the select in a labeled form field.'
			}
		}
	});
</script>

<Story name="Default" />

<Story name="WithField" args={{ withField: true }} />
