<script lang="ts">
	import { TriggerStyles } from './styles';
	import type { Props } from './types';

	let {
		className = '',
		disableNext,
		disablePrev,
		nextLabel,
		onnext,
		onprevious,
		previousLabel,
		text
	}: Props = $props();
</script>

<div class={[className, 'flex items-center justify-center gap-8']}>
	<button
		aria-label={previousLabel}
		class={TriggerStyles}
		disabled={disablePrev}
		onclick={onprevious}
	>
		<i aria-hidden="true" class="fa-solid fa-chevron-left"></i>
	</button>
	<div class="font-mono text-3xl">{text}</div>
	<button aria-label={nextLabel} class={TriggerStyles} disabled={disableNext} onclick={onnext}
		><i aria-hidden="true" class="fa-solid fa-chevron-right"></i></button
	>
</div>
