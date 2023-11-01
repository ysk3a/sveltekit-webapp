<script lang="ts">
	// import 'gridstack/dist/gridstack.min.css';
	// import 'gridstack/dist/gridstack-extra.min.css';
	import type { WidgetItem } from '$lib/types/gridstack';
	export let widget: WidgetItem;
	// $: console.log('::widget item', widget);
</script>

<div class="grid-stack-item" {...widget.gsAttributes}>
	<!-- following github.com/gridstack/gridstack.js/pull/1492 to make vscode happy-->
	<div class="grid-stack-item-content">
		<div class="card-header">- {widget.id} Drag here -</div>
		<div class="card">{widget.otherProp}the rest of the panel content doesn't drag</div>
		<!-- dynamic component -->
		<!-- <svelte:component this={widget.component} data={widget.data}/> -->
	</div>
</div>

<style>
	.card-header {
		cursor: move;
		min-height: 25px;
	}
	.card-header:hover {
		background-color: rgba(0, 0, 0, 0.1);
	}
	.card {
		text-align: left;
		height: 100%;
	}
</style>
