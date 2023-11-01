
declare module 'svelte/elements' {
    // export interface SvelteHTMLElements {
    //     'custom-button': HTMLDivElement;
    // }


    // allows for more granular control over what element to add the typings to
    export interface HTMLDivElement {
        myattr2: string;
        'gs-w': string | number | undefined;
        'gs-w': string | number | undefined;
        [key: `gs-${string}`]: string | number | undefined;
    }
}


export { }; // ensure this is not an ambient module, else types will be overridden instead of augmented


// declare namespace svelteHTML {
//     // enhance attributes

//     // makes any html error out
//     // interface HTMLAttributes {
//     //     'gs-w': string;
//     //     'gs-h': string;
//     // }
//     // interface HTMLAttributes<T> {
//     //     'gs-w': string;
//     //     'gs-h': string;
//     // }
//     interface IntrinsicElements {
//         'grid-stack': {
//             class: string;
//             [key: `gs-${string}`]: string | number | undefined;
//         }
//     }
//     // interface GridStackProps extends HTMLProps<"div", HTMLAttributes> {
//     //     'gs-w': string;
//     //     'gs-h': string;
//     // }
//     // interface GridStackProps extends Partial<HTMLProps> {
//     //     'gs-w': string;
//     //     'gs-h': string;
//     // }
// }

// import { HTMLProps } from 'svelte/elements';


// declare module 'svelte/elements' {
//     // export interface SvelteHTMLElements {
//     // 	'custom-button': HTMLButtonAttributes;
//     // }

//     interface HTMLProps extends HTMLAttributes, ClassAttributes<T> {
//         'gs-w': string;
//         'gs-h': string;
//     }
//     // allows for more granular control over what element to add the typings to
//     export interface GridStackProps extends Partial<HTMLProps> {
//         'gs-w': string;
//         'gs-h': string;
//     }
// }


// export { }; // ensure this is not an ambient module, else types will be overridden instead of augmented