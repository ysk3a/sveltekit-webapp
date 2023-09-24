<script lang="ts">
	import { Accordion, AccordionItem } from '@skeletonlabs/skeleton';
	export let uniqueKey: string | number;
	export let height: number;
</script>

<Accordion>
	<AccordionItem>
		<svelte:fragment slot="lead">(icon)</svelte:fragment>
		<svelte:fragment slot="summary">(Panel 1: {uniqueKey})</svelte:fragment>
		<svelte:fragment slot="content">
			<div class="content-container" style="height: {height}px" />
		</svelte:fragment>
	</AccordionItem>
</Accordion>
<!-- <script lang="ts">
	import Accordion, { Panel, Header, Content } from '@smui-extra/accordion';
	import IconButton, { Icon } from '@smui/icon-button';
	export let uniqueKey: string | number;
	let panel1Open = false;
</script>

<div class="accordion-container">
	<Accordion>
		<Panel bind:open={panel1Open}>
			<Header>
				Panel 1: {uniqueKey}
				<IconButton slot="icon" toggle pressed={panel1Open}>
					<Icon class="material-icons" on>expand_less</Icon>
					<Icon class="material-icons">expand_more</Icon>
				</IconButton>
			</Header>
			<Content>The content for panel 1.</Content>
		</Panel>
	</Accordion>
</div>

<style>
</style> -->

<style>
	div.content-container {
		/* Don't set margin top and bottom together! It will break size counting */
		padding: 8px;
		color: black;
		background-color: #f6f6f6;
		border-radius: 20px;
	}
</style>
