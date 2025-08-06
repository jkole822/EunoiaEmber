<script lang="ts">
	import { Timer } from '@ark-ui/svelte/timer';
	import {
		AreaStyles,
		ButtonStyles,
		ControlStyles,
		SegmentLabelStyles,
		SegmentStyles,
		SegmentValueStyles,
		SeparatorStyles
	} from './styles';
	import type { Props } from './types';

	const {
		className = '',
		hideDays,
		hideHours,
		hideMinutes,
		hideReset,
		hideToggle,
		separator,
		...rest
	}: Props = $props();

	const segments = [
		!hideDays && !hideHours && !hideMinutes && 'days',
		!hideHours && !hideMinutes && 'hours',
		!hideMinutes && 'minutes',
		'seconds'
	].filter((segment): segment is 'days' | 'hours' | 'minutes' | 'seconds' => Boolean(segment));

	const controls = [
		...(!hideToggle ? ['start', 'resume', 'pause'] : []),
		!hideReset && 'reset'
	].filter((control): control is 'start' | 'resume' | 'pause' | 'reset' => Boolean(control));

	const controlIcons: Record<'start' | 'resume' | 'pause' | 'reset', string> = {
		start: 'fa-play',
		resume: 'fa-play',
		pause: 'fa-pause',
		reset: 'fa-rotate-left'
	};
</script>

<Timer.Root {...rest} class={className}>
	<Timer.Area class={AreaStyles}>
		{#each segments as segment, index (index)}
			<div class={SegmentStyles}>
				<Timer.Item class={SegmentValueStyles} type={segment} />
				<span class={SegmentLabelStyles}>{segment}</span>
			</div>
			{#if segment !== 'seconds'}
				<Timer.Separator class={SeparatorStyles}>{separator}</Timer.Separator>
			{/if}
		{/each}
	</Timer.Area>
	<Timer.Control class={ControlStyles}>
		{#each controls as control, index (index)}
			<Timer.ActionTrigger action={control} class={ButtonStyles}>
				<i aria-hidden="true" class={['fa-solid', controlIcons[control]]}></i>
				<span>{control}</span>
			</Timer.ActionTrigger>
		{/each}
	</Timer.Control>
</Timer.Root>
