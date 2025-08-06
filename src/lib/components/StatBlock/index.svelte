<script lang="ts">
	let {
		className = '',
		iconClass,
		stat,
		title
	}: { className?: string; iconClass: string; stat: string; title: string } = $props();
</script>

<div class={[className, 'flex items-center gap-3 rounded-xl bg-primary-300 px-5 py-3']}>
	<i aria-hidden="true" class={[iconClass, 'fa-solid text-4xl text-primary-900']}></i>
	<div class="flex flex-col gap-1">
		<p class="font-mono text-sm text-primary-950">{title}</p>
		<p class="text-2xl font-black text-primary-700 [@media(min-width:450px)]:text-xl">
			{stat}
		</p>
	</div>
</div>
