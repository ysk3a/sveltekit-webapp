import type { TokenizerAndRendererExtension } from "marked";
// import type { Token } from "marked";
import type { Renderers } from "svelte-markdown";
//InstantiableSvelteComponentTyped, MarkedRendererProps,

// export interface MarkedCustomNameSpaceToken {
//     type?: string;
//     raw?: string;
//     text?: string;
//     tokens?: Token[]
// }

export interface CustomRenderer extends Partial<Renderers> {
    // [key: string]: InstantiableSvelteComponentTyped<Partial<Omit<MarkedCustomNameSpaceToken, "type">>>
    // [key: string]: InstantiableSvelteComponentTyped;
    [key: string]: unknown;
    // [key: string]: InstantiableSvelteComponentTyped<MarkedRendererProps<MarkedCustomNameSpaceToken | undefined>>

}

export const latexTokenizerExtension: TokenizerAndRendererExtension = {
    name: 'latex',
    level: 'inline',
    start(src: string) {
        return src.match(/\[\[/)?.index;
    },
    tokenizer(src: string) {
        const rule = /^\[\[latex\s*(?:color="(.*)")?\]\]/;
        const match = rule.exec(src);
        if (match) {
            console.log(match[1]);
            return {
                type: 'latex',
                raw: match[0],
                text: match[0],
                color: match[1]
            };
        }
        return undefined;
    }
};

export const mentionTokenizerExtension: TokenizerAndRendererExtension = {
    name: '@',
    level: 'inline',
    start(src: string) {
        const i = src.indexOf('@');
        console.log('::start=', i, src);
        return i;
    },
    tokenizer(src: string) {
        const rule = /\B^@\w+/g;
        const match = rule.exec(src);
        if (match) {
            console.log(match);
            return {
                type: '@', // Should match "name" above
                raw: match[0], // Text to consume from the source
                text: match[0]
            };
        }
        return undefined;
    }
};

export const mentionNamedTokenizerExtension: TokenizerAndRendererExtension = {
    name: 'mentioning', // why does this need to be the same as the type property?
    level: 'inline',
    start(src: string) {
        const i = src.indexOf('@');
        console.log('::start=', i, src);
        return i;
    },
    tokenizer(src: string) {
        const rule = /\B^@\w+/g;
        const match = rule.exec(src);
        if (match) {
            console.log(match);
            return {
                type: 'mentioning', // what is point of the type property?
                raw: match[0], // Text to consume from the source
                text: match[0]
            };
        }
        return undefined;
    }
};

export const hashtagTokenizerExtension: TokenizerAndRendererExtension = {
    // name: '#',
    name: 'hashtaging',
    level: 'inline',
    start(src: string) {
        const i = src.indexOf('#');
        console.log('::start=', i, src);
        return i;
    },
    tokenizer(src: string) {
        const rule = /\B^#\w+/g;
        const match = rule.exec(src);
        if (match) {
            console.log(match);
            return {
                // type: '@', // Should match "name" above
                type: 'hashtaging',
                raw: match[0], // Text to consume from the source
                text: match[0]
            };
        }
        return undefined;
    }
};

