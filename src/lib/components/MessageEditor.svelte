<script lang="ts">
	import Markdown from 'svelte-exmarkdown';
	import { gfmPlugin } from 'svelte-exmarkdown/gfm';
	import type { Plugin } from 'svelte-exmarkdown';
	import hljs from 'highlight.js';
	import typescript from 'highlight.js/lib/languages/typescript';
	import 'highlight.js/styles/github.css';
	import rehypeHighlight from 'rehype-highlight';
	import remarkMentions from 'remark-mentions';
	import rehypeSlug from 'rehype-slug';
	import MessageExRender from './MessageExRender.svelte';

	// import remarkGfm from 'remark-gfm';
	// import type { Plugin } from '../types';
	// export const gfmPlugin: Plugin = { remarkPlugin: [remarkGfm] };
	let md = "```typescript\nconsole.log('Hello, world!');\n```";
	md = `
# h1 but rendered as h2

## Same size with above

this is #hashtagchip in sentence.

regular p

this is a mention in @mentionchip as shown.

`;
	// (processor) => processor.use(remarkMentions)
	const plugins: Plugin[] = [
		// { renderer: { p: MessageExRender } },
		gfmPlugin(),
		{
			remarkPlugin: [
				remarkMentions,
				{
					usernameLink: (username: any) => {
						console.log('::username=', username);
						return '';
					} // This is optional
				}
			]
		},
		{
			rehypePlugin: [
				rehypeSlug,
				rehypeHighlight,
				{ ignoreMissing: true, languages: { typescript } }
			]
		}
	];
</script>

<!-- <MessageExRender /> -->
<textarea class="textarea" rows="4" bind:value={md} />
<Markdown {md} {plugins} />

<!-- <style>

pre > code[class*='language-'] {
	font-size: 1.05em;
	background-color: var(--background-alt, #f7f7f7);
}
</style> -->
