<script lang="ts">
	import favicon from '#lib/assets/favicon.svg';
	import type { LayoutProps } from './$types';

	let { children }: LayoutProps = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>Voice to Text Demo</title>
</svelte:head>

<header>
	<h1>Voice to Text Demo</h1>
</header>
<main>
	{@render children()}
</main>

<style>
	main {
		max-inline-size: 80ch;
		margin-inline: auto;
	}
</style>
