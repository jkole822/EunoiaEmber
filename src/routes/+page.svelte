<script>
	import Button from '$lib/components/Button/index.svelte';
	import { ButtonVariantsEnum } from '$lib/components/Button/types';
</script>

<div class="mt-5 mb-10">
	<div class="rounded-lg bg-primary-100 p-3 sm:w-min">
		<div class="font-mono text-6xl tracking-widest xs:text-8xl sm:text-9xl">eunoia</div>
		<div
			class="relative flex gap-2 after:absolute after:-bottom-3 after:h-[1.5px] after:w-full after:bg-primary-700 xs:gap-3"
		>
			<span class="font-mono">[yoo-noy-uh]</span>
			<span>•</span>
			<span class="font-bold">Greek</span>
			<span>•</span>
			<span class="font-bold text-primary-600">ευνοία</span>
		</div>
		<p class="mt-8">(n.) a pure and well-balanced mind, a good spirit.</p>
		<p
			class="mt-4 flex flex-row items-start justify-center gap-2 font-cursive text-3xl text-primary-700 xs:justify-start"
		>
			<i aria-hidden="true" class="fa-solid fa-quote-left text-base"></i>
			<span>Beautiful Thinking</span>
			<i aria-hidden="true" class="fa-solid fa-quote-right self-end text-xl"></i>
		</p>
	</div>

	<div class="mt-24 text-center">
		<h1 class="text-3xl xs:text-5xl xl:text-6xl">
			Embrace the warmth of <span class="ml-2 font-mono font-bold tracking-widest text-primary-600"
				>EunoiaEmber</span
			>.
		</h1>
		<p class="text-lg xs:text-2xl">
			your safe space to maintain <span
				class="bg-primary-900 px-2 py-1 rounded-full text-primary-200">clarity</span
			>
		</p>
		<p class="text-lg xs:text-2xl">
			<span class="font-cursive md:ml-24">&</span> build
			<span class="bg-primary-900 px-2 py-1 rounded-full text-primary-200">resilience</span>,
			<span class="relative -bottom-1 font-cursive text-3xl underline">one spark at a time.</span>
		</p>
		<Button className="mt-14 mx-auto" href="/register" variant={ButtonVariantsEnum.Emphasis}
			>GET STARTED</Button
		>
	</div>

	<div class="mt-40">
		<h2
			class="mb-3 w-fit bg-primary-600 font-mono text-3xl tracking-wider text-primary-200 xs:text-5xl"
		>
			Highlights
		</h2>
		<div class="grid grid-cols-1 gap-3 md:grid-cols-3 md:gap-6">
			<div class="rounded-md bg-primary-100/70 p-2 ring-2 ring-primary-300">
				<h3 class="text-2xl font-black tracking-widest text-primary-500 lowercase md:text-3xl">
					Sobriety Tracking
				</h3>
				<p class="mt-2">
					Gauge your progress over time with a holistic and encouraging approach.
				</p>
			</div>
			<div class="rounded-md bg-primary-100/70 p-2 ring-2 ring-primary-300">
				<h3 class="text-2xl font-black tracking-widest text-primary-500 lowercase md:text-3xl">
					Freedom List
				</h3>
				<p class="mt-2">Compile and reflect upon your reasons that drive your journey.</p>
			</div>
			<div class="rounded-md bg-primary-100/70 p-2 ring-2 ring-primary-300">
				<h3 class="text-2xl font-black tracking-widest text-primary-500 lowercase md:text-3xl">
					Urge Log
				</h3>
				<p class="mt-2">Simple log to record date, intensity, and notes on your urges to help you learn and adapt.</p>
			</div>
		</div>
	</div>
</div>
