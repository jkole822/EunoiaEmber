<script lang="ts">
	import Button from '$lib/components/Button/index.svelte';
	import Input from '$lib/components/Input/index.svelte';
	import { CenterAbsoluteStyles } from '$lib/styles';
	import { AutoCompleteEnum, InputTypeEnum } from '$lib/components/Input/types';
	import { ButtonVariantsEnum } from '$lib/components/Button/types';
	import type { ActionData } from './$types';

	let { form }: { form: ActionData } = $props();
</script>

<div class={[CenterAbsoluteStyles, 'grid w-full max-w-5xl rounded-md px-4 md:grid-cols-2 md:px-8']}>
	<div
		class="relative min-h-60 rounded-tl-md rounded-tr-md bg-primary-950 md:rounded-tr-md md:rounded-br-md"
	>
		<img
			alt="EunoiaEmber Logo"
			class={[CenterAbsoluteStyles, 'size-50']}
			src="/images/EunoiaEmberLogo.svg"
		/>
	</div>
	<form
		class="rounded-br-md rounded-bl-md bg-primary-100 px-10 py-10 md:rounded-tr-md md:rounded-br-md md:px-8 md:py-20"
		method="post"
	>
		<h1 class="mb-10 text-center font-mono text-5xl">Forgot Password?</h1>
		{#if form?.message}
			<p class="mb-3 text-center font-mono text-primary-700">{form.message}</p>
		{/if}
		<Input
			autocomplete={AutoCompleteEnum.email}
			className="[&_input:focus_~_label]:bg-primary-100 [&_input]:data-[raise-label=true]:[&_~_label]:bg-primary-100 mb-5"
			description="Instructions will be sent to your registered email."
			label="Email"
			name="email"
			required
			type={InputTypeEnum.email}
		/>
		<Button className="mb-5 w-full" type="submit" variant={ButtonVariantsEnum.Emphasis}
			>Submit</Button
		>
		<div class="text-center">
			Return to <a
				class="rounded underline ring-primary-600 outline-hidden focus:ring-2"
				href="/register">Sign In</a
			>
		</div>
	</form>
</div>
