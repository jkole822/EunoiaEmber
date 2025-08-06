<script lang="ts">
	import FileUpload from './index.svelte';
	import { ParagraphStyles, SubHeadingStyles } from '$lib/styles';
	import type { Props } from './types';

	let props: Props = $props();
	let files: File[] = $state([]);

	function fileToJSON(file: File) {
		return {
			name: file.name,
			type: file.type,
			size: file.size,
			lastModified: file.lastModified
		};
	}

	function handleFilesChange(newFiles: File[]) {
		files = newFiles;
	}
</script>

<FileUpload {...props} onFileChange={(details) => handleFilesChange(details.acceptedFiles)} />
<p class={SubHeadingStyles}>Binding Check</p>
<p class={[ParagraphStyles, 'flex flex-col gap-3']}>
	{#each files as file, index (index)}
		{JSON.stringify(fileToJSON(file))}
	{/each}
</p>
