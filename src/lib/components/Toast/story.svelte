<script lang="ts">
	import { faker } from '@faker-js/faker';
	import Button from '$lib/components/Button/index.svelte';
	import Toast from './index.svelte';
	import { toast, dismissToast, updateToast } from './toaster';
	import { ButtonVariantsEnum } from '$lib/components/Button/types';

	let toastId = $state('');

	const create = () => {
		toastId = toast({
			title: faker.lorem.words(2),
			description: faker.lorem.sentence(),
			type: 'info'
		});
	};

	const dismiss = () => {
		dismissToast(toastId);
	};

	const update = () => {
		updateToast(toastId, {
			title: faker.lorem.words(2),
			description: faker.lorem.sentence(),
			type: 'success'
		});
	};
</script>

<div class="flex flex-col items-start gap-4">
	<Button onclick={create} variant={ButtonVariantsEnum.Emphasis}>Create Toast</Button>
	<div class="flex gap-4">
	<Button onclick={update}>Update Toast</Button>
	<Button onclick={dismiss}>Dismiss Toast</Button>
	</div>
</div>
<Toast />
