// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
	interface Window {
		SpeechRecognition: SpeechRecognition;
		webkitSpeechRecognition: SpeechRecognition;
	}
}

class SpeechRecognition {
	constructor() {}
	continuous: boolean;
	start(): void;
	stop(): void;
	abort(): void;
	addEventListener(): (s: 'result', e: (e: SpeechRecognitionEvent) => void) => void;
	removeEventListener(): (s: 'result', e: (e: SpeechRecognitionEvent) => void) => void;
}

export {};
