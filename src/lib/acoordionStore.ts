import { type Writable, writable } from "svelte/store";
// import type { AccordionState } from "../ambient";

// todo see if using store is better than page local array to track expanded accordion
export const accordionStateArr: Writable<AccordionState[]> = writable([]);

// const createStore = () => {
//     // custom store

//     const { set, update, subscribe } = writable([]);

//     return {
//         subscribe,
//         // custom functions
//         updateArr: () => update(items => {
//             if (items.length === 30) {
//                 items.shift();
//             }
//             items.push({
//                 uniqueKey: event.detail.uniqueKey,
//                 open: event.detail.accordionItemDetail.open
//             });
//             return items
//         }),
//         reset: () => set([])
//     }
// }