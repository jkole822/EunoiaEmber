<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { faker } from '@faker-js/faker';
	import Button from './index.svelte';
	import { IconStyles } from '$lib/styles';
	import { ButtonVariantsEnum } from './types';

	const { Story } = defineMeta({
		title: 'Button',
		component: Button,
		args: {
			disabled: false,
			type: 'button',
			variant: ButtonVariantsEnum.Default
		},
		argTypes: {
			'aria-controls': {
				control: 'text',
				description:
					'`aria-controls` identifies the element whose contents or presence are controlled by the button.'
			},
			'aria-expanded': {
				control: 'boolean',
				description: '`aria-expanded` indicates the expandable state of the target element.'
			},
			'aria-haspopup': {
				control: 'select',
				options: ['false', 'true', 'dialog', 'menu', 'grid', 'listbox', 'tree'],
				description: '`aria-haspopup` indicates that the button opens a popup menu or dialog.'
			},
			'aria-hidden': {
				control: 'boolean',
				description: '`aria-hidden` indicates whether the element is visible to screen readers.'
			},
			'aria-label': {
				control: 'text',
				description: 'Provides an accessible label for the button.'
			},
			className: {
				control: 'text',
				description: 'CSS class for styling the button.'
			},
			disabled: {
				control: 'boolean',
				description: 'Disables the button.'
			},
			href: {
				control: 'text',
				description: 'Turns the button into a link (renders as `<a>` tag).'
			},
			id: {
				control: 'text',
				description: 'HTML id for the button element.'
			},
			tabIndex: {
				control: 'number',
				description: 'Tab index for focus order.'
			},
			target: {
				control: 'select',
				options: ['_self', '_blank', '_parent', '_top', '_unfencedTop'],
				description: 'Specifies where to open the linked document when `href` is used.'
			},
			type: {
				control: 'select',
				options: ['button', 'submit', 'reset'],
				description: 'Button type attribute.'
			},
			variant: {
				control: {
					type: 'select'
				},
				description: 'Visual variant of the button.',
				options: [ButtonVariantsEnum.Default, ButtonVariantsEnum.Emphasis]
			}
		}
	});
</script>

{#snippet children()}
	<span class="mr-2">{faker.lorem.word()}</span>
	<i aria-hidden="true" class={IconStyles}></i>
{/snippet}

<Story name="Default" args={{ children }} />

<Story name="Emphasis" args={{ children, variant: ButtonVariantsEnum.Emphasis }} />
