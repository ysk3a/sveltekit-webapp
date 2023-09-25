<script lang="ts">
	import { Accordion, AccordionItem } from '@skeletonlabs/skeleton';
	export let uniqueKey: string | number;
	export let height: number;
	export let open: boolean;
	export let openedItems: any[] = [];
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();
	// type AccordionItemToggle = { event: Event; id: string; open: boolean; autocollapse: boolean };
	function accordionItemToggle(event: CustomEvent) {
		console.log(event);

		dispatch('openItem', {
			accordionItemDetail: event.detail,
			openItem: event.detail.open,
			uniqueKey: uniqueKey
		});
	}
	$: console.log('::open', uniqueKey, open, openedItems);
</script>

<Accordion>
	<!-- 		open={openedItems.find((item) => item.uniqueKey === uniqueKey)?.open ?? false}
 -->
	<AccordionItem class="ck-accordion-item" {open} on:toggle={accordionItemToggle}>
		<svelte:fragment slot="lead">(icon)</svelte:fragment>
		<svelte:fragment slot="summary">(Panel 1: {uniqueKey} {open})</svelte:fragment>
		<svelte:fragment slot="content">
			<div class="content-container" style="height: {height}px" />
		</svelte:fragment>
	</AccordionItem>
</Accordion>

<style>
	/* .ck-accordion-item {
		background-color: red;
	}
	.ck-accordion-item:has(button.accordion-control[aria-expanded='true']) {
		background-color: rgba(var(--color-secondary-500));
	} */
	div.content-container {
		/* Don't set margin top and bottom together! It will break size counting */

		padding: 8px;
		color: black;
		background-color: rgba(var(--color-tertiary-900));
		border-radius: 20px;
	}
</style>
