<script lang="ts">
	import { FileUpload, type FileUploadFileError } from '@ark-ui/svelte/file-upload';
	import Button from '$lib/components/Button/index.svelte';
	import { DragZoneStyles, ItemGroupStyles, ItemStyles } from './styles';
	import type {Props} from './types';

	let props: Props = $props();

	const errorMessages: Record<FileUploadFileError, string> = {
		TOO_MANY_FILES: '📊 Too many files selected (max 5 allowed)',
		FILE_INVALID_TYPE: '🚫 Invalid file type (only images and PDFs allowed)',
		FILE_TOO_LARGE: '📏 File too large (max 10MB)',
		FILE_TOO_SMALL: '📐 File too small (min 1KB)',
		FILE_INVALID: '⚠️ Invalid file',
		FILE_EXISTS: '🔄 File already exists'
	};
</script>

{#snippet item()}
	<div class="flex items-start gap-4">
		<div class="grow">
			<div class="flex items-center gap-2">
				<FileUpload.ItemPreview role="presentation" type="image/*">
					<i aria-hidden="true" class="fa-solid fa-image"></i>
				</FileUpload.ItemPreview>
				<FileUpload.ItemPreview role="presentation" type="application/pdf">
					<i aria-hidden="true" class="fa-solid fa-file"></i>
				</FileUpload.ItemPreview>
				<FileUpload.ItemName />
			</div>
			<FileUpload.ItemSizeText class="text-sm text-primary-600" />
		</div>
		<FileUpload.ItemDeleteTrigger>
			<i aria-hidden="true" class="fa-solid fa-trash"></i>
		</FileUpload.ItemDeleteTrigger>
	</div>
{/snippet}

{#snippet trigger()}
	<Button>Choose File(s)</Button>
{/snippet}

<FileUpload.Root
	{...props}
	accept="image/jpeg,image/png,image/webp,image/gif,image/svg+xml,application/pdf"
	maxFileSize={1024 * 1024 * 10}
	maxFiles={5}
	minFileSize={1024}
>
	<FileUpload.Dropzone class={DragZoneStyles}>
		<FileUpload.Label class="text-lg tracking-widest lowercase"
			>Drag and drop files here</FileUpload.Label
		>
		<FileUpload.Trigger asChild={trigger}></FileUpload.Trigger>
	</FileUpload.Dropzone>
	<div data-status="accepted">
		<FileUpload.ItemGroup class={ItemGroupStyles}>
			<FileUpload.Context>
				{#snippet render(context)}
					{#each context().acceptedFiles as file (file.name)}
						<FileUpload.Item class={ItemStyles} {file}>
							{@render item()}
						</FileUpload.Item>
					{/each}
				{/snippet}
			</FileUpload.Context>
		</FileUpload.ItemGroup>
	</div>

	<div data-status="rejected">
		<FileUpload.ItemGroup class={ItemGroupStyles}>
			<FileUpload.Context>
				{#snippet render(fileUpload)}
					{#if fileUpload().rejectedFiles.length > 0}
						<div>❌ Rejected Files</div>
						{#each fileUpload().rejectedFiles as fileRejection (fileRejection.file.name)}
							<FileUpload.Item
								class={[ItemStyles, 'flex flex-col gap-2']}
								data-status="rejected"
								file={fileRejection.file}
							>
								{@render item()}
								<div>
									<strong>Validation Errors:</strong>
									<ul>
										{#each fileRejection.errors as error, index (index)}
											<li class="text-sm text-primary-600" data-error-code={error}>
												{errorMessages[error] || `❓ ${error}`}
											</li>
										{/each}
									</ul>
								</div></FileUpload.Item
							>
						{/each}
					{/if}
				{/snippet}
			</FileUpload.Context>
		</FileUpload.ItemGroup>
	</div>
	<FileUpload.HiddenInput />
</FileUpload.Root>
