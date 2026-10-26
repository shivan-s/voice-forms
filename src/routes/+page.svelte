<script lang="ts">
	import { onMount } from 'svelte';

	let recognition: typeof window.SpeechRecognition | typeof window.webkitSpeechRecognition | null =
		$state(null);
	let recording = $state(false);
	let results: SpeechRecognitionResultList | null = $state(null);

	onMount(() => {
		try {
			recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
		} catch (err) {
			if (err instanceof TypeError) {
				console.info('No SpeechRecogntion available');
			} else {
				throw err;
			}
		}
		if (!recognition) {
			console.log('No Speech recognition');
			return;
		}
		recognition.continuous = true;
		recognition.interimResults = true;
		// recognition.start();
		const handleEventResult = (e: SpeechRecognitionEvent) => {
			results = e.results;
		};
		recognition.addEventListener('result', handleEventResult);
		return () => {
			if (recognition) {
				recognition.removeEventListener('result', handleEventResult);
				recognition.abort();
			}
		};
	});

	const handleClick = () => {
		if (!recognition) {
			return;
		}
		if (recording) {
			recording = false;
			recognition.stop();
		} else {
			recording = true;
			recognition.start();
		}
	};
</script>

{#if !recognition}
	<p class="error">No Speech Recognition Available</p>
{:else}
	{#if results}
		{#each results as { isFinal, ...result }, i (i)}
			{#each result as { transcript, confidence }, j (j)}
				<p class:loading={isFinal}>
					<strong>{i}</strong>:&nbsp;{transcript}<br />
					{#if isFinal}
						<small>Confidence: {Math.round(confidence * 100)}%</small>
					{/if}
				</p>
				{#if isFinal && i + 1 === results.length}
					<p>
						<em>Please speak...</em>
					</p>
				{/if}
			{/each}
		{/each}
	{:else}
		<p>
			<em>Nothing to show!</em>
		</p>
	{/if}
	<button onclick={handleClick}>
		{#if recording}
			⏸️Click to Pause
		{:else}
			⏺️ Click to Record
		{/if}
	</button>
{/if}

<style>
	p.error {
		color: red;
	}
	em {
		color: grey;
	}
</style>
