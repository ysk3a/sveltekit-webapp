<script lang="ts">
	// import { afterUpdate, tick } from 'svelte';
	import VirtualScroll from 'svelte-virtual-scroll-list';
	import { createSequenceGenerator, randomInteger } from '$lib/mock';

	const getItemId = createSequenceGenerator();

	let items: MessageType[] = [];
	// addItems(true, 100);

	let list: VirtualScroll;

	// function addItems(top = true, count = 10) {
	// 	let new_items = [];
	// 	for (let i = 0; i < count; i++)
	// 		new_items.push({ uniqueKey: getItemId(), height: randomInteger(20, 660), open: false });
	// 	if (top) items = [...new_items, ...items];
	// 	else items = [...items, ...new_items];
	// }
	import { onDestroy, onMount } from 'svelte';
	import MessageItem from '$lib/components/MessageItem.svelte';
	import { LoremIpsum } from 'lorem-ipsum';
	import type { MessageType } from '../../ambient';
	// const LoremIpsum = require("lorem-ipsum").LoremIpsum;

	const lorem = new LoremIpsum({
		sentencesPerParagraph: {
			max: 8,
			min: 4
		},
		wordsPerSentence: {
			max: 16,
			min: 4
		}
	});
	let ticker = 0;
	let interval: NodeJS.Timeout;
	$: console.log(ticker);
	onMount(() => {
		// console.log(':: feed/+page.svelte list=', list);
		interval = setInterval(() => {
			ticker++;
			addMsg();
		}, 3000);

		// message = lorem.generateSentences(1);
	});
	onDestroy(() => {
		console.log('::destroy');

		clearInterval(interval);
	});
	// afterUpdate(() => {
	// 	console.log('::afterUpdate');
	// 	if (list) {
	// 		list.scrollToBottom();
	// 	}
	// });

	// lorem.generateWords(1);
	// lorem.generateParagraphs(7);
	let message: string = '';
	function addMsg() {
		let newMsg: MessageType = {
			uniqueKey: getItemId(),
			message
		};
		items.push(newMsg);
		items = items;
		if (list) {
			list.scrollToBottom();
		}
		let oneOrZero = Math.random() >= 0.5 ? 1 : 0;
		// for testing random message
		if (oneOrZero) {
			message = lorem.generateSentences(3);
		} else {
			message = lorem.generateParagraphs(2);
		}
	}
</script>

<!-- <div class="room-content">

</div> -->
<div id="main-container">
	<div class="col-1">
		<div class="row-1">
			<div class="row-1-1">
				<!-- <div class="test-height">row-1-1</div> -->
				<div class="vs">
					<VirtualScroll bind:this={list} data={items} key="uniqueKey" let:data>
						<div slot="header">This is a header</div>
						<MessageItem {...data} />
						<div slot="footer">This is a footer</div>
					</VirtualScroll>
				</div>
			</div>
			<div class="row-1-2">
				<!-- <div class="test-height">row-1-2</div> -->
				<!-- <form method="POST" use:enhance>
					<textarea name="content" cols="100" rows="20" bind:value={content} />
					<button type="submit">Absenden</button>
				</form> -->
				<textarea
					class="textarea"
					placeholder="Lorem ipsum dolor sit amet consectetur adipisicing elit."
					bind:value={message}
				/>
				<button type="button" on:click={addMsg}>Send</button>
			</div>
		</div>
	</div>
</div>

<style>
	#main-container {
		/* padding: 10px; */
		background-color: bisque;
		height: 100%;
		display: grid;
		/* grid-template-columns: 3fr; */
		/* grid-template-rows: 1fr; */
	}

	.col-1 {
		display: grid;
		overflow: auto;
		/* grid-template-rows: 1fr 1fr; */
	}

	.row-1 {
		background-color: cadetblue;
		overflow: auto;
		display: grid;
		grid-template-rows: 1fr 100px;
		grid-template-rows: minmax(0, 1fr) 100px;
	}

	.row-1-1 {
		background-color: crimson;
		overflow: auto;
	}

	.row-1-2 {
		background-color: darkkhaki;
		overflow: auto;
	}
	.row-1-2 .textarea {
		height: 100%;
	}
	.vs {
		height: calc(100vh - 160px);
	}
</style>
