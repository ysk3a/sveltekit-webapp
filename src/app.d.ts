// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
import type { DiscordMessageOptions } from '@skyra/discord-components-core/dist/types/options';
// import type { HTMLProps } from 'svelte/svelte-html';
// import { HTMLAttributes } from 'svelte/elements';
// import type { HTMLAttributes } from 'svelte/elements';

// export interface $$Props extends HTMLAttributes<HTMLDivElement> {
// 	'gs-w': string | number | undefined;
// 	[key: `gs-${string}`]: string | number | undefined;
// }
declare namespace App {
	// interface Locals {}
	// interface PageData {}
	// interface Error {}
	// interface Platform {}
	interface Window {
		$discordMessage: DiscordMessageOptions;
	}
	// interface GridStackProps extends HTMLProps {
	// 	'gs-w': string;
	// 	'gs-h': string;
	// 	[key: `gs-${string}`]: string;
	// }
	// type AccordionState = {
	// 	uniqueKey: number;
	// 	open: boolean;
	// }
	// type MessageType = {
	// 	uniqueKey: number | void;
	// 	message: string;
	// }
	// type MessageMDType = {
	// 	uniqueKey: string;
	// 	source: string;
	// }
}


// declare namespace svelteHTML {
// 	// enhance elements
// 	// interface IntrinsicElements {
// 	// 	'my-custom-element': { someattribute: string; 'on:event': (e: CustomEvent<any>) => void };
// 	// }
// 	// enhance attributes
// 	// interface HTMLProps extends HTMLProps<"div", HTMLAttributes> {
// 	// 	[key: `gs-${string}`]: string;
// 	// 	'gs-w': string;
// 	// }
// 	interface HTMLAttributes {
// 		// If you want to use on:beforeinstallprompt
// 		// 'on:beforeinstallprompt'?: (event: any) => any;
// 		// If you want to use myCustomAttribute={..} (note: all lowercase)
// 		[key: `gs-${string}`]: string;
// 		'gs-w': string;
// 		// mycustomattribute?: string; // You can replace any with something more specific if you like
// 	}
// }
