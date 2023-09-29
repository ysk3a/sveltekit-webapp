import { type Writable, writable } from "svelte/store";

// todo see if using store is better than page local array to track expanded accordion
export const accordionState: Writable<AccordionState[]> = writable([]);
