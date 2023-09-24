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
			new_items.push({ uniqueKey: getItemId(), height: randomInteger(20, 660) });
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

<div class="vs">
	<VirtualScroll bind:this={list} data={items} key="uniqueKey" let:data>
		<div slot="header">This is a header</div>
		<!-- <TestItem {...data} /> -->
		<AccordionTest uniqueKey={data.uniqueKey} height={data.height} />
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
