<script lang="ts">
	// import DOMPurify from 'dompurify';
	import { sanitize, isSupported } from 'isomorphic-dompurify';
	import { marked } from 'marked';
	import QuillInput from '$lib/components/QuillInput.svelte';
	import MessageItem from '$lib/components/MessageItem.svelte';
	import MessageMdItem from '$lib/components/MessageMDItem.svelte';
	import { onDestroy, onMount } from 'svelte';
	import { v4 as uuidv4 } from 'uuid';
	// import type { MessageMDType } from '../../app';
	import VirtualScroll from 'svelte-virtual-scroll-list';
	// import type { MessageMDType } from '../../ambient';

	let virtualList: VirtualScroll;
	let messages: MessageMDType[] = [];
	let md: string = '';

	onMount(() => {
		for (let i = 0; i < 10; i++) {
			messages.push({
				uniqueKey: `${i}`,
				source: `${i}`
			});
		}
		messages = messages;
	});

	function addMsg() {
		let newMsg: MessageMDType = {
			uniqueKey: uuidv4(),
			source: md
		};
		messages.push(newMsg);
		messages = messages;
		if (virtualList) {
			virtualList.scrollToBottom();
		}
	}
	function handleMessage(event: { detail: { text: any } }) {
		console.log('::eventDispatchedToParent handleMessage=', event);
		md = event.detail.text;
		addMsg();
	}
</script>

<!-- <div class="sveltemarkdown-wrapper">
</div> -->
<div class="two-side">
	<div class="vs">
		<VirtualScroll bind:this={virtualList} data={messages} key="uniqueKey" let:data>
			<div slot="header">This is a header</div>
			<MessageMdItem {...data} />
			<!-- <SvelteMarkdown {messages.message} /> -->
			<div slot="footer">This is a footer</div>
		</VirtualScroll>
	</div>
	<div class="quill-outer-container">
		<QuillInput on:message={handleMessage} />
	</div>
</div>

<style>
	.two-side {
		display: grid;
		grid-template-columns: 1fr;
		grid-template-rows: 1fr auto;
		grid-column-gap: 0px;
		grid-row-gap: 0px;
		height: 100%;
	}
	.vs {
		background-color: rgb(99, 39, 99);
		overflow: auto;
	}
	.quill-outer-container {
		background-color: rgb(70, 122, 173);
	}
</style>
