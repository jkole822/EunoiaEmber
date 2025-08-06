<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Timer from './index.svelte';

	const { Story } = defineMeta({
		title: 'Timer',
		component: Timer,
		tags: ['autodocs'],
		args: {
			interval: 1000,
			separator: '|',
			startMs: 0
		},
		argTypes: {
			autoStart: {
				control: 'boolean',
				description: 'Whether the timer should start automatically.'
			},
			className: {
				control: 'text',
				description: 'CSS class for styling the timer.'
			},
			countdown: {
				control: 'boolean',
				description: 'The unique identifier of the machine.'
			},
			hideDays: {
				control: 'boolean',
				description: "Hides the 'days' segment"
			},
			hideHours: {
				control: 'boolean',
				description: "Hides the 'hours' segment"
			},
			hideMinutes: {
				control: 'boolean',
				description: "Hides the 'minutes' segment"
			},
			hideReset: {
				control: 'boolean',
				description: "Hides the 'reset' control"
			},
			hideToggle: {
				control: 'boolean',
				description: "Hides the control for 'start', 'resume', and 'pause'."
			},
			id: {
				control: 'text',
				description: 'The unique identifier of the machine.'
			},
			interval: {
				control: 'number',
				description: 'The interval in milliseconds to update the timer count.'
			},
			separator: {
				control: 'text',
				description: 'Text that displays between the timer segments.'
			},
			startMs: {
				control: 'number',
				description: 'The total duration of the timer in milliseconds.'
			},
			targetMs: {
				control: 'number',
				description: 'The minimum count of the timer in milliseconds.'
			}
		}
	});
</script>

<Story name="Default" />

<Story name="No Controls" args={{ autoStart: true, hideToggle: true, hideReset: true, startMs: 1000 * 60 * 60 * 24 * 7 + 1000 * 60 * 60 * 6 + 1000 * 60 * 8 }} />
