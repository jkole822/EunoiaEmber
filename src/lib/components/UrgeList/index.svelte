<script lang="ts">
	import { formatDate } from '$lib/utils/formatDate';
	import { IntensityCircleStyles, ItemStyles } from './styles';
	import type { Props } from './types';
	import type { Urge } from '$lib/server/db/schema';

	let { className = '', urges }: Props = $props();
</script>

{#snippet item(urge: Urge)}
	<li>
		<a class={ItemStyles} href={`/urge/${urge.id}`}>
			<div>
				<div class="font-mono text-xl">{formatDate(urge.date, urge.time, 'MM/DD/YYYY HH:mm')}</div>
				<div class="text-sm text-primary-700/80">{urge.notes}</div>
			</div>
			<div class="flex flex-col items-center gap-1">
				<div class="font-medium tracking-widest">intensity</div>
				<div class={IntensityCircleStyles}>
					<div>{urge.intensity}</div>
				</div>
			</div>
		</a>
	</li>
{/snippet}

<ul class={[className, 'flex list-none flex-col gap-3']}>
	{#each urges as urge, index (index)}
		{@render item(urge)}
	{/each}
</ul>
