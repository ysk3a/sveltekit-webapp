<script lang="ts">
	import SvelteMarkdown from 'svelte-markdown';
	import { marked } from 'marked';

	const tokens = marked.lexer('this is an **example**');

	marked.walkTokens(tokens, (token: any) => {
		if (token.type == 'strong') token.type = 'em';
		// token.raw = token.raw.toUpperCase();
		console.log('::walktokens', token);
	});
	import Emphasis from './Emphasis.svelte';
	const source = `
    # This is a header
  
  This is a paragraph.
  
  @bobby

  i am testing @john-doe other text.
  i am test #potatopc other text
  #someTag

  * This is a list
  * With two items
    1. And a sublist
    2. That is ordered
      * With another
      * Sublist inside
  
  | And this is | A table |
  |-------------|---------|
  | With two    | columns |`;

	function handleParsed(event: { detail: { tokens: any } }) {
		//access tokens via event.detail.tokens
		console.log(event.detail.tokens);
	}
</script>

<!-- <Emphasis /> -->
<SvelteMarkdown {source} renderers={{ paragraph: Emphasis }} on:parsed={handleParsed} />
