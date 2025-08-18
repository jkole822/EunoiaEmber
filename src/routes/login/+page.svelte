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
		<h1 class="mb-10 text-center font-mono text-5xl">Sign In</h1>
		{#if form?.message}
			<p class="mb-3 text-center font-mono text-red-600">{form.message}</p>
		{/if}
		<Input
			autocomplete={AutoCompleteEnum.email}
			className="[&_input:focus_~_label]:bg-primary-100 [&_input]:data-[raise-label=true]:[&_~_label]:bg-primary-100 mb-5"
			label="Email"
			name="email"
			required
			type={InputTypeEnum.email}
		/>
		<Input
			autocomplete={AutoCompleteEnum.currentPassword}
			className="[&_input:focus_~_label]:bg-primary-100 [&_input]:data-[raise-label=true]:[&_~_label]:bg-primary-100 mb-1"
			label="Password"
			name="password"
			required
			type={InputTypeEnum.password}
		/>
		<a
			class="mb-5 ml-auto block w-fit rounded underline ring-primary-600 outline-hidden focus:ring-2"
			href="/request-password-reset">Forgot Password</a
		>
		<Button className="mb-5 w-full" type="submit" variant={ButtonVariantsEnum.Emphasis}
			>Sign In</Button
		>
		<div class="text-center">
			Need an account? <a
				class="rounded underline ring-primary-600 outline-hidden focus:ring-2"
				href="/register">Sign Up</a
			>
		</div>
	</form>
</div>
