<script lang="ts">
	import Button from '$lib/components/Button/index.svelte';
	import Input from '$lib/components/Input/index.svelte';
	import { SubHeadingStyles } from '$lib/styles';
	import { AutoCompleteEnum, InputTypeEnum } from '$lib/components/Input/types';
	import type { ActionData } from './$types';

	let { form }: { form: ActionData } = $props();
</script>

<div class="mx-auto my-10 max-w-3xl rounded-lg bg-primary-100 p-10">
	<h1 class="mb-10 text-center font-mono text-5xl tracking-wider">Manage Account</h1>
	{#if form?.message}
		<p class="mb-3 text-center font-mono text-red-600">{form.message}</p>
	{/if}
	<form action="?/updatePassword" method="post">
		<h2 class={['mb-3', SubHeadingStyles]}>Update Password</h2>
		<Input
			autocomplete={AutoCompleteEnum.newPassword}
			className="[&_input:focus_~_label]:bg-primary-100 [&_input]:data-[raise-label=true]:[&_~_label]:bg-primary-100 mb-5"
			label="New Password"
			name="password"
			required
			type={InputTypeEnum.password}
		/>
		<Input
			autocomplete={AutoCompleteEnum.newPassword}
			className="[&_input:focus_~_label]:bg-primary-100 [&_input]:data-[raise-label=true]:[&_~_label]:bg-primary-100 mb-1"
			label="Confirm Password"
			name="confirmPassword"
			required
			type={InputTypeEnum.password}
		/>
		<Button className="mt-5 w-full xs:w-auto" type="submit">Update</Button>
	</form>

	<form action="?/deleteAccount" class="mt-15" method="post">
		<h2 class={['mb-3', SubHeadingStyles]}>Delete Account</h2>
		<Input
			autocomplete={AutoCompleteEnum.off}
			className="[&_input:focus_~_label]:bg-primary-100 [&_input]:data-[raise-label=true]:[&_~_label]:bg-primary-100 mb-5"
			description="To delete your account, please enter the confirmation text &quot;delete my account&quot; into the above text field and your password below. This action is permanent and cannot be undone."
			label="Confirmation Text"
			name="confirmation"
			required
			type={InputTypeEnum.text}
		/>
		<Input
			autocomplete={AutoCompleteEnum.currentPassword}
			className="[&_input:focus_~_label]:bg-primary-100 [&_input]:data-[raise-label=true]:[&_~_label]:bg-primary-100 mb-1"
			label="Password"
			name="password"
			required
			type={InputTypeEnum.password}
		/>
		<Button className="mt-5 w-full xs:w-auto" type="submit">Delete</Button>
	</form>
</div>
