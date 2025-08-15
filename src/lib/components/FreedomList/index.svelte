<script lang="ts">
	import { IntensityCircleStyles, ItemStyles } from './styles';
	import type { Props } from './types';
	import type { FreedomListItem } from '$lib/server/db/schema';

	let { className = '', freedomListItems }: Props = $props();
</script>

{#snippet item(freedomListItem: FreedomListItem)}
	<li>
		<a class={ItemStyles} href={`/freedom-list/${freedomListItem.id}`}>
			<div class={IntensityCircleStyles} aria-hidden="true" role="presentation">
				<i class={[freedomListItem.polarity === 'positive' ? 'fa-plus' : 'fa-minus', 'fa-solid']}></i>
			</div>
			<div class="text-lg">{freedomListItem.reason}</div>
		</a>
	</li>
{/snippet}

<ul class={[className, 'flex list-none flex-col gap-3']}>
	{#each freedomListItems as freedomListItem, index (index)}
		{@render item(freedomListItem)}
	{/each}
</ul>
