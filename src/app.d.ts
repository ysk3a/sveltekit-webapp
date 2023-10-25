// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
import type { DiscordMessageOptions } from '@skyra/discord-components-core/dist/types/options';

declare namespace App {
	// interface Locals {}
	// interface PageData {}
	// interface Error {}
	// interface Platform {}
	interface Window {
		$discordMessage: DiscordMessageOptions;
	}
}

type AccordionState = {
	uniqueKey: number;
	open: boolean;
}
type MessageType = {
	uniqueKey: number | void;
	message: string;
}