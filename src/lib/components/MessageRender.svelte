<script lang="ts">
	import SvelteMarkdown from 'svelte-markdown';
	import { marked } from 'marked';
	marked.use({
		async: true,
		pedantic: false,
		gfm: true
	});
	const tokens2 = marked.lexer('this is an **example** @somemention with #hasthagtag continue.');
	const parseToHtml = marked.parse(
		'this is an **example** @somemention with #hasthagtag continue.'
	);
	const tokens = marked.lexer('this  is an @example 123');
	console.log('::tokens2', tokens2, tokens);
	const res = marked.walkTokens(tokens, (token: any) => {
		//if (token.type == 'strong') token.type = 'em';
		// token.raw = token.raw.toUpperCase();
		console.log('::walktokens maybepromise', token);
		if (token.type === 'text') {
			token.text = token.text.replace(/@(\w+)/g, function (match: any, username: any) {
				//return `<a class="tag-item" href="/profile/${username}">@${username}</a>`;

				return `<button  class="tag-item">@${username}</button>`;
			});

			return token;
		}

		return token;
	});
	const res2 = marked.walkTokens(tokens2, (token: any) => {
		//if (token.type == 'strong') token.type = 'em';
		// token.raw = token.raw.toUpperCase();
		console.log('::walktokens tokens2 maybepromise', token);
		if (token.type === 'text') {
			token.text = token.text.replace(/@(\w+)/g, function (match: any, username: any) {
				//return `<a class="tag-item" href="/profile/${username}">@${username}</a>`;

				return `<button  class="tag-item">@${username}</button>`;
			});

			return token;
		}

		return token;
	});

	// let item = document.querySelector('.tag-item');
	// marked.walkTokens(tokens2, (token: any) => {
	// 	if (token.type == 'strong') token.type = 'em';
	// 	// token.raw = token.raw.toUpperCase();
	// 	console.log('::walktokens', token);
	// });
	let rootmd: HTMLDivElement;
	let oneMd: Element;
	onMount(() => {
		// problem? since get all so can be very large?
		const nd = rootmd.querySelectorAll('.tag-item');
		console.log('::onmount item', nd);
		oneMd = nd[0];
		oneMd.addEventListener('mouseover', func, false);
		oneMd.addEventListener('mouseout', func1, false);
	});
	function func() {
		// not needed since item is already global,
		// I am assuming this is here just because it's sample code?
		// var item = document.getElementById("button");
		oneMd?.setAttribute('style', 'background-color:blue;');
	}

	function func1() {
		oneMd?.setAttribute('style', 'background-color:green;');
	}
	import Emphasis from './Emphasis.svelte';
	import { onMount } from 'svelte';
	import StrongInParagraph from './StrongInParagraph.svelte';
	const source = `
    # This is a header
  
  This is a paragraph.
  
  **@bobby**

  i am testing @john-doe other text.

  i am testing @sara-doe other text.


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

<div class="md-container" bind:this={rootmd}>
	<SvelteMarkdown source={marked.parser(res)} />
</div>
<hr />
<!-- <StrongInParagraph/> -->
<SvelteMarkdown {source} renderers={{ strong: StrongInParagraph }} on:parsed={handleParsed} />
<hr />

<div class="md-container2">
	<SvelteMarkdown source={marked.parser(res)} />
</div>
<hr />

<!-- <div class="md-container3">
	<SvelteMarkdown source={marked.parser(res2)} />
</div> -->

<!-- 
div.messages
    div.edit
    div.img
    div.name-date
    div.content
        if mention
        span.mention
        else
        span.text
    div.reactions


	//

regular textarea with mention like tributejs.
can use editor or markdown but in the end input is markdown.
on send/save/post, render as markdown or html?
so on render, need to replace @ and # and other markdown.
i think only custom is the @ and # if using markdown renderer libraries?

 -->

<style>
	hr {
		background: black;
		/* border: 1px solid black; */
		width: 100%;
	}
</style>
