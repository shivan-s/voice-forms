<script lang="ts">
	import { onMount } from 'svelte';

	let recording = $state(false);
	let result: string | null = $state(null);
	let recognition: typeof window.SpeechRecognition | null = $state(null);
	let error: string | null = $state(null);

	onMount(() => {
		try {
			recognition = new window.SpeechRecognition();
		} catch (err) {
			if (err instanceof TypeError) {
				console.info('No SpeechRecogntion, check if webkitSpeechRecognition is available');
				try {
					recognition = new window.webkitSpeechRecognition();
				} catch {
					if (err instanceof TypeError) {
						console.error('Speech Recognition Unavailable');
						error = 'Speech Recognition not available';
					} else {
						throw err;
					}
				}
			} else {
				throw err;
			}
		}
		if (!recognition) {
			console.log('No Speech recognition');
			return;
		}
		recognition.continuous = true;
		const handleResult = (e: SpeechRecognitionEvent) => {
			result = e.results[0][0].transcript;
		};
		recognition.addEventListener('result', handleResult);
		return () => {
			if (recognition) {
				recognition.removeEventListener('result', handleResult);
				recognition.abort();
			}
		};
	});

	const handleClick = () => {
		if (!recognition) return;
		if (recording) {
			recording = false;
			recognition.stop();
		} else {
			recording = true;
			result = '';
			recognition.start();
		}
	};
</script>

<h1>Voice Form Demo</h1>

{#if error}
	<p class="error">
		{error}
	</p>
{/if}

<button disabled={!recognition} onclick={handleClick}>
	{#if recording}
		◼ Click to Stop
	{:else}
		🔴 Click to Record
	{/if}
</button>

<p>
	{#if result}
		{result}
	{:else}
		<em>Please record audio.</em>
	{/if}
</p>

<style>
	p.error {
		color: red;
	}
	em {
		color: grey;
	}
</style>
