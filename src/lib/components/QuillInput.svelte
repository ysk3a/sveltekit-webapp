<script lang="ts">
	import { onMount } from 'svelte';
	import Quill from 'quill';
	import 'quill/dist/quill.snow.css';
	import 'quill-mention';
	// import DOMPurify from 'dompurify';
	import { sanitize, isSupported } from 'isomorphic-dompurify';
	import SvelteMarkdown from 'svelte-markdown';
	import { marked } from 'marked';
	import PlainClipboard from './PlainClipboard';
	import { createEventDispatcher } from 'svelte';
	import { fromEvent, throttle as rxThrottle, interval } from 'rxjs';
	import throttle from 'just-throttle';
	// import SmartBreaker from 'quill-smart-break';
	const dispatch = createEventDispatcher();

	let quill: Quill;
	let editor: HTMLDivElement;
	// import * as DOMPurify from 'dompurify';
	// import { DOMPurify } from 'dompurify';

	// const clean = DOMPurify.sanitize('<b>hello there</b>');
	//import DOMPurify from 'isomorphic-dompurify';

	// import Turndown from 'turndown';
	// const td = new Turndown();
	// Quill.register('modules/smart-breaker', SmartBreaker);
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
		quill = new Quill(editor, {
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
					// [{ header: [1, 2, 3, false] }],
					['bold', 'italic', 'underline', 'strike'],
					['link', 'code-block']
				]
				// 'smart-breaker': true
			},
			theme: 'snow',
			placeholder: 'Write your story...'
		});

		quill.on('text-change', function () {
			// async // if using marked.parse
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

	// function isQuillEmpty() {
	// 	const isQuillEmptyCheck = quill.getContents().ops[0].insert == '\n' && quill.getLength() < 2;
	// 	console.log('::isQuillEmpty', isQuillEmptyCheck);
	// 	return isQuillEmptyCheck;
	// }
	function isQuillEmpty() {
		if ((quill.getContents()['ops'] || []).length !== 1) {
			return false;
		}
		return quill.getText().trim().length === 0;
	}
	function sendMessage() {
		console.log('::sendMessage', quill.getText().trim().length);
		if (!isQuillEmpty()) {
			dispatch('message', {
				text: justHtmlString
			});
		}
		quill.setText('');
		// quill.setContents([]);
		// quill.setContents([{ insert: '\n' }]);
	}
	function actionOnCreat(element: HTMLElement) {
		console.log('::actionOnCreate element=', element);
		// const editorInputObs = fromEvent(element, 'input');
		// const editorObsEResult = editorInputObs.pipe(rxThrottle(() => interval(1000)));

		// editorObsEResult.subscribe((x) => {
		// 	console.log('::target=', x.target);
		// 	console.log('::instanceof htmlelement', x.target instanceof HTMLElement);
		// 	  if (x.target instanceof HTMLElement) {
		// 	    /* event.target.style works here */
		// 	    x.target.style.height = '' + 0;
		// 	    x.target.style.height = x.target.scrollHeight + 'px';
		// 	  }
		// 	  console.log('::event', x);
		// });

		// // just version
		// const fn2 = throttle(
		//   function () {
		//     console.log('::input on textarea');
		//     this.style.height = '' + 0;
		//     this.style.height = this.scrollHeight + 'px';
		//   },
		//   500,
		//   { leading: true }
		// );
		// document.getElementById('texttype2').addEventListener('input', fn2, false);
	}
</script>

<!-- <div>
	{@html justHtml}
</div> -->

<div class="editor-wrapper">
	<div class="left-of-editor">
		<button class="btn">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="icon icon-tabler icon-tabler-plus"
				width="24"
				height="24"
				viewBox="0 0 24 24"
				stroke-width="2"
				stroke="currentColor"
				fill="none"
				stroke-linecap="round"
				stroke-linejoin="round"
			>
				<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
				<path d="M12 5l0 14"></path>
				<path d="M5 12l14 0"></path>
			</svg>
		</button>
	</div>
	<div class="quill-container">
		<div
			bind:this={editor}
			use:actionOnCreat
			on:input={() => {
				console.log('::inputting');
			}}
		/>
	</div>
	<div class="right-of-editor">
		<button class="btn" on:click={sendMessage}>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="icon icon-tabler icon-tabler-send"
				width="24"
				height="24"
				viewBox="0 0 24 24"
				stroke-width="2"
				stroke="currentColor"
				fill="none"
				stroke-linecap="round"
				stroke-linejoin="round"
			>
				<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
				<path d="M10 14l11 -11"></path>
				<path d="M21 3l-6.5 18a.55 .55 0 0 1 -1 0l-3.5 -7l-7 -3.5a.55 .55 0 0 1 0 -1l18 -6.5"
				></path>
			</svg>
		</button>
	</div>
</div>

<style>
	/* @import 'https://cdn.quilljs.com/1.3.6/quill.snow.css'; */
	.editor-wrapper {
		display: grid;
		grid-template-columns: auto 1fr auto;
		grid-template-rows: 1fr;
		grid-column-gap: 0px;
		grid-row-gap: 0px;
		/* min-height: 200px; */
		max-height: 400px;
		overflow: auto;
	}
	:global(.editor-wrapper .ql-container) {
		height: auto;
		/* assume max height 400px then calc minus toolbar - border px totla*/
		max-height: calc(400px - 42px - 1px);
		overflow: auto;
	}
</style>
