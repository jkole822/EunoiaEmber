<script lang="ts">
	import { CircleStyles, DefaultStyles, EmphasisStyles, EmphasisTextStyles, GlowContainerStyles, StarsContainerStyles, StarStyles } from './styles';
	import { ButtonVariantsEnum } from './types';
	import type { Props } from './types';

	let {
		children,
		className = '',
		href,
		target = '_self',
		type = 'button',
		variant = ButtonVariantsEnum.Default,
		...rest
	}: Props = $props();

	const element = $derived(href ? 'a' : 'button');
	const isEmphasis = $derived(variant === ButtonVariantsEnum.Emphasis);
	const rel = $derived(!!href && target === '_blank' ? 'noreferrer' : undefined);
	const variantStyles = $derived(isEmphasis ? EmphasisStyles : DefaultStyles);
</script>

{#snippet emphasis()}
	<strong class={EmphasisTextStyles}>
		{@render children()}
	</strong>
	<div class={StarsContainerStyles}>
		<div class={StarStyles}></div>
	</div>
	<div class={GlowContainerStyles}>
		<div class={CircleStyles}></div>
		<div class={CircleStyles}></div>
	</div>
{/snippet}

<svelte:element
	this={element}
	{...rest}
	{href}
	{rel}
	{target}
	{type}
	class={[className, variantStyles]}
>
	{#if isEmphasis}
		{@render emphasis()}
	{:else}
		{@render children()}
	{/if}
</svelte:element>
