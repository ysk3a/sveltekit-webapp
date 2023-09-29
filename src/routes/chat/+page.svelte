<script lang="ts">
	import { afterUpdate, tick } from 'svelte';
	import VirtualScroll from 'svelte-virtual-scroll-list';
	import { createSequenceGenerator, randomInteger } from '$lib/mock';
	import TestItem from '$lib/components/TestItem.svelte';

	const getItemId = createSequenceGenerator();

	let items: any[] = [];
	addItems(true, 100);

	let list: VirtualScroll;

	function addItems(top = true, count = 10) {
		let new_items = [];
		for (let i = 0; i < count; i++)
			new_items.push({ uniqueKey: getItemId(), height: randomInteger(20, 660), open: false });
		if (top) items = [...new_items, ...items];
		else items = [...items, ...new_items];
	}
	import { onMount } from 'svelte';
	import AccordionTest from '$lib/components/AccordionTest.svelte';

	onMount(() => {
		// console.log(':: feed/+page.svelte list=', list);
	});
	afterUpdate(() => {
		console.log('::afterUpdate');
		if (list) {
			list.scrollToBottom();
		}
	});
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
						<TestItem {...data} />
						<div slot="footer">This is a footer</div>
					</VirtualScroll>
				</div>
			</div>
			<div class="row-1-2">
				<!-- <div class="test-height">row-1-2</div> -->
				<textarea
					class="textarea"
					placeholder="Lorem ipsum dolor sit amet consectetur adipisicing elit."
				/>
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
