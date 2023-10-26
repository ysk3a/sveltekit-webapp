<script lang="ts">
	import { onMount } from 'svelte';
	import Quill from 'quill';

	import 'quill/dist/quill.snow.css';

	let quill = null;
	let editor: HTMLDivElement;
	import 'quill-mention';
	import DOMPurify from 'dompurify';
	// import * as DOMPurify from 'dompurify';
	// import { DOMPurify } from 'dompurify';

	// const clean = DOMPurify.sanitize('<b>hello there</b>');
	import { sanitize, isSupported } from 'isomorphic-dompurify';
	//import DOMPurify from 'isomorphic-dompurify';
	import SvelteMarkdown from 'svelte-markdown';

	// import Turndown from 'turndown';
	import { marked } from 'marked';
	import PlainClipboard from './PlainClipboard';
	// const td = new Turndown();

	Quill.register('modules/clipboard', PlainClipboard, true);

	// var quill = new Quill('#editor-container', {
	// 	format: ['bold', 'italic', 'list', 'header'],
	// 	theme: 'snow',
	// 	modules: {
	// 		toolbar: [[{ header: [1, 2, false] }], ['bold', 'italic', 'list'], [{ list: 'bullet' }]]
	// 	}
	// });

	const atValues = [
		{ id: 1, value: 'Fredrik Sundqvist' },
		{ id: 2, value: 'Patrik Sjölin' }
	];
	const hashValues = [
		{ id: 3, value: 'Fredrik Sundqvist 2' },
		{ id: 4, value: 'Patrik Sjölin 2' }
	];

	async function suggestPeople(searchTerm: string) {
		const allPeople = [
			{
				id: 1,
				value: 'Fredrik Sundqvist'
			},
			{
				id: 2,
				value: 'Patrik Sjölin'
			}
		];
		return allPeople.filter((person) => person.value.includes(searchTerm));
	}
	$: justHtmlString = `
<span data-value="Fredrik Sundqvist" data-id="1" data-denotation-char="@" data-index="0" class="mention"><span>@Fredrik Sundqvist</span></span>
`;
	let justHtml = '';
	$: source = ''; //td.turndown(justHtml);
	$: console.log('::source', source);
	$: src2 = '';
	$: console.log('::src2', src2);
	let resolvedParsedHtml = '';
	let maxOne: number = 0; // might use as global store or something instead to not render more than once.
	onMount(async () => {
		const { default: Quill } = await import('quill');
		maxOne++;
		let quill = new Quill(editor, {
			modules: {
				mention: {
					allowedChars: /^[A-Za-z\sÅÄÖåäö]*$/,
					mentionDenotationChars: ['@', '#'],
					source: async function (
						searchTerm: string,
						renderList: (arg0: { id: number; value: string }[]) => void
					) {
						const matchedPeople = await suggestPeople(searchTerm);
						renderList(matchedPeople);
					}
				},
				toolbar: [
					[{ header: [1, 2, 3, false] }],
					['bold', 'italic', 'underline', 'strike'],
					['link', 'code-block']
				]
			},
			theme: 'snow',
			placeholder: 'Write your story...'
		});

		quill.on('text-change', async function () {
			maxOne++;
			var delta = quill.getContents();
			var text = quill.getText();
			// const clean = DOMPurify.sanitize(dirty);
			// can't tell if sanitize is sanitizing.
			justHtmlString = sanitize(quill.root.innerHTML);
			source = sanitize(quill.root.innerHTML);
			// vs ?
			// justHtmlString = sanitize(quill.root.innerHTML);
			// resolvedParsedHtml = await marked.parse(quill.root.innerHTML);
			// src2 = DOMPurify.sanitize(resolvedParsedHtml);
			// source = src2;

			console.log('::ontextchange', delta, justHtmlString, src2);
		});
		// src2 = await sanitize(marked.parse(quill.root.innerHTML));
		// console.log('::ontextchange outisde', src2);

		if (maxOne === 1) {
			justHtmlString =
				'<p><span data-value="Fredrik Sundqvist" data-id="1" data-denotation-char="@" data-index="0" class="mention"><span>@Fredrik Sundqvist</span></span> <span data-value="Patrik Sjölin" data-id="2" data-denotation-char="@" data-index="1" class="mention"><span>@Patrik Sjölin</span></span> </p>';
			// justHtmlString = justHtml;
			source = justHtmlString;
			console.log(':: endMount justHmlt', source, maxOne);
		}
	});
	//     onMount( () => {

	// 		let container = document.getElementById('editor');
	// 		quill = new Quill(container, {
	//     modules: {
	//       toolbar: [
	//         [{ header: [1, 2, 3, false] }],
	//         ["bold", "italic", "underline", "strike"],
	//         ["link", "code-block"]
	//       ]
	//     },
	//     placeholder: "Type something...",
	//     theme: "snow" // or 'bubble'
	//   });
	// 	})
</script>

<!-- <div>
	{@html justHtml}
</div> -->
<div class="sveltemarkdown-wrapper">
	<SvelteMarkdown {source} />
</div>

<div class="editor-wrapper">
	<div bind:this={editor} />
</div>

<!-- github.com/quilljs/quill/issues/2276 
next todo is get user input, save as delta and html, sanitize (how?), store sanitzied
readonly mode use html, for edit use delta.
or something liked
github.com/quilljs/quill/issues/2276#issuecomment-1621104821

- emoji, syntax highlighting

alternative:
summernote - need jquery
prosemirror
more bookmarked

ideal simple: safe text with only hashtag and mention that have listeners.


approach-1:
delta (getcontents) 
-> htmlstring (quill.root.innerhtml) 
-> markdownstring = sanitize(marked.parse(htmlstring))
-> pass to svelte-markdown

- all these converstion/parsing should be put in web worker?

delta (getcontents) 
-> htmlstring (quill.root.innerhtml) 
-> markdownstring = sanitize(marked.parse(htmlstring))
-> send to backend and sanitize
-> on retrieve, get from db, sanitize then send to front
-> on received, sanitize(marked.parse(response))
-> pass to svelte-markdown


 -->

<style>
	/* @import 'https://cdn.quilljs.com/1.3.6/quill.snow.css'; */
	.sveltemarkdown-wrapper {
		background-color: darkmagenta;
	}
</style>
