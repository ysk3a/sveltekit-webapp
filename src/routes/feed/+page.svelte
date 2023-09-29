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
	let openedItems: AccordionState[] = []; // max 30 items opened

	function handleAccordionItemToggle(event: CustomEvent) {
		console.log('::feed', event);
		// logic: keep array of 30. fifo queue to store opened accordion item
		// user toggle on expand in AccordionText.svelte, forwards the event
		// to this page. so i guess for every render loop through 30 items.
		// any better way? stores?

		if (openedItems.length === 30) {
			openedItems.shift();
		}
		openedItems.push({
			uniqueKey: event.detail.uniqueKey,
			open: event.detail.accordionItemDetail.open
		});
		// openedItems = openedItems; // causes jump. why?
	}

	$: console.log('::feed open', openedItems);
</script>

<div class="vs">
	<VirtualScroll bind:this={list} data={items} key="uniqueKey" let:data>
		<div slot="header">This is a header</div>
		<!-- <TestItem {...data} /> -->
		<AccordionTest
			on:openItem={handleAccordionItemToggle}
			open={openedItems.find((oi) => oi.uniqueKey === data.uniqueKey)?.open ?? false}
			uniqueKey={data.uniqueKey}
			height={data.height}
		/>
		<div slot="footer">This is a footer</div>
	</VirtualScroll>
</div>
<!-- <button class="btn variant-filled" on:click={addItems}>Add 10 to top</button> -->
<button class="btn variant-filled" on:click={() => addItems(false)}>Add 10 to bottom</button>
<button class="btn variant-filled" on:click={list.scrollToBottom}>To bottom</button>
<button
	class="btn variant-filled"
	on:click={async () => {
		addItems(false, 1);
		await tick();
		list.scrollToBottom();
	}}
	>Add 1 and scroll to bottom
</button>
<button class="btn variant-filled" on:click={() => (items[15].height = randomInteger(10, 150))}
	>Random height for 15 item</button
>

<style>
	.vs {
		height: calc(100vh - 50px);
		/* height: 300px; */
	}
</style>
