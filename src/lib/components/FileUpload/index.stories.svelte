<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import FileUpload from './story.svelte';
	import { faker } from '@faker-js/faker';
	import { v4 as uuid } from 'uuid';

	const { Story } = defineMeta({
		title: 'FileUpload',
		component: FileUpload,
		args: {
			allowDrop: true,
			disabled: false,
			locale: 'en-US',
			id: uuid(),
			name: faker.lorem.word(),
			preventDocumentDrop: true,
			required: true
		},
		argTypes: {
			allowDrop: {
				control: 'boolean',
				description: 'Enables drag-and-drop file uploads.',
				defaultValue: true,
				table: {
					category: 'Behavior'
				}
			},
			capture: {
				control: { type: 'select' },
				options: ['user', 'environment'],
				description:
					"The default accepted files when rendered. Use when you don't need to control the accepted files of the input.",
				table: {
					category: 'Behavior'
				}
			},
			directory: {
				control: 'boolean',
				description: 'Allows selecting an entire directory of files.',
				defaultValue: false,
				table: {
					category: 'Behavior'
				}
			},
			disabled: {
				control: 'boolean',
				description: 'Disables the file upload input.',
				defaultValue: false,
				table: {
					category: 'State'
				}
			},
			id: {
				control: 'text',
				description: 'Sets the ID attribute for the file input element.',
				table: {
					category: 'Accessibility'
				}
			},
			locale: {
				control: 'text',
				description: 'The current locale. Based on the BCP 47 definition.',
				table: {
					category: 'Localization'
				}
			},
			name: {
				control: 'text',
				description: 'Sets the "name" attribute of the file input, used during form submissions.',
				table: {
					category: 'Form'
				}
			},
			onFileAccept: {
				action: 'file accepted',
				description: 'Callback fired when a file is accepted. Receives FileAcceptDetails.',
				table: {
					category: 'Events'
				}
			},
			onFileChange: {
				action: 'file changed',
				description: 'Callback fired when the file list changes. Receives FileChangeDetails.',
				table: {
					category: 'Events'
				}
			},
			onFileReject: {
				action: 'file rejected',
				description: 'Callback fired when a file is rejected. Receives FileRejectDetails.',
				table: {
					category: 'Events'
				}
			},
			preventDocumentDrop: {
				control: 'boolean',
				description: 'Prevents dropping files on the entire document (outside the dropzone).',
				defaultValue: false,
				table: {
					category: 'Behavior'
				}
			},
			required: {
				control: 'boolean',
				description: 'Marks the file input as required for form validation.',
				defaultValue: false,
				table: {
					category: 'Form'
				}
			},
			transformFiles: {
				description:
					'Async function to transform or preprocess files before they are added to the list.',
				control: false,
				table: {
					category: 'Behavior'
				}
			}
		}
	});
</script>

<Story name="Default" />
