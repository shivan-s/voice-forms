<script lang="ts">
	import favicon from '#lib/assets/favicon.svg';
	import type { LayoutProps } from './$types';

	let { children }: LayoutProps = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>Voice Form Demo</title>
</svelte:head>

<header>
	<h1>Voice Form Demo</h1>
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
