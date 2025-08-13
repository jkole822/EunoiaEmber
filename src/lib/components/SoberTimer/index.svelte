<script lang="ts">
	import dayjs from 'dayjs';
	import Timer from '$lib/components/Timer/index.svelte';
	import { SubHeadingStyles } from '$lib/styles';
	import type { Props } from './types';

	let { anchorDate, anchorTime, className = '', cta, slipDates = [] }: Props = $props();

	const lastSlipDate = $derived(
		slipDates
			.map((date) => dayjs(`${date.date} ${date.time}`))
			.reduce((latest, current) => (current.isAfter(latest) ? current : latest))
	);

	const millisecondsSinceAnchor = $derived(
		dayjs().diff(dayjs(`${anchorDate} ${anchorTime}`), 'millisecond')
	);

	const millisecondsSinceLastSlip = $derived(
		lastSlipDate ? dayjs().diff(lastSlipDate, 'millisecond') : millisecondsSinceAnchor
	);
</script>

<div class={[className, 'bg-primary-100 flex flex-col items-center justify-center p-10 rounded-xl text-center']}>
	<p class={['mt-0! text-primary-800!', SubHeadingStyles]}>You've been on your journey for:</p>
	<Timer autoStart hideToggle hideReset startMs={millisecondsSinceAnchor} />
	<p class={['text-primary-800!', SubHeadingStyles]}>Time since your last slip:</p>
	<Timer autoStart hideToggle hideReset startMs={millisecondsSinceLastSlip} />
	{#if cta}
		{@render cta()}
	{/if}
</div>
