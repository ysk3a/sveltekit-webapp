<script lang="ts">
	import 'gridstack/dist/gridstack.min.css';
	import { GridStack } from 'gridstack';
	import type { GridStackOptions, GridStackWidget } from 'gridstack';
	import { onMount } from 'svelte';
	import Aggrid from './Aggrid.svelte';
	import { sanitize } from 'isomorphic-dompurify';
	let items: GridStackWidget[] = [
		{ x: 0, y: 0, minW: 2 },
		{ x: 1, y: 1, content: 'hi' },
		{
			x: 2,
			y: 2,
			content: sanitize(`<div class="grid-stack-item">
		<div class="grid-stack-item-content">
			<div class="card-header">- Drag here -</div>
			<div class="card">
			    some html
			</div>
		</div>
	</div>`)
		}
	];
	let gridOptions: GridStackOptions = {
		margin: 5,
		// DO NOT use grid.value = GridStack.init(), see above
		float: true,
		cellHeight: '70px',
		minRow: 1,
		handle: '.card-header'
		// resizable: { handles: 'all' } // do all sides for testing
		// children: items
	};
	let grid: GridStack;
	let gridel: HTMLElement;
	// addEvents(grid);
	onMount(() => {
		grid = GridStack.init(gridOptions, gridel);
		grid.load(items);
		grid.on('dragstop', (event: any, element: any) => {
			const node = element.gridstackNode;
			console.log(
				`::onDragStop:you just dragged node #${node.id} to ${node.x},${node.y} – good job!`
			);
		});
		console.log('::gridstack.svelte onmount', grid);
	});
	// let count = 0;
	// const getNode = function () {
	// 	let n = items[count] || {
	// 		x: Math.round(12 * Math.random()),
	// 		y: Math.round(5 * Math.random()),
	// 		w: Math.round(1 + 3 * Math.random()),
	// 		h: Math.round(1 + 3 * Math.random())
	// 	};
	// 	n.content = n.content || String(count);
	// 	count++;
	// 	return n;
	// };

	// const addNewWidget = function () {
	// 	let w = grid.addWidget(getNode());
	// };

	// const makeNewWidget = function () {
	// 	let n = getNode();
	// 	let doc = document.implementation.createHTMLDocument();
	// 	doc.body.innerHTML = `<div class="item" gs-x="${n.x}" gs-y="${n.y}" gs-w="${n.w || 1}" gs-h="${
	// 		n.h || 1
	// 	}"><div class="grid-stack-item-content">${n.content}</div></div>`;
	// 	let el = doc.body.children[0];
	// 	grid.el.appendChild(el);
	// 	// example showing when DOM is created elsewhere (eg Angular/Vue/React) and GS is used to convert to a widget
	// 	let w = grid.makeWidget(el);
	// };

	// const toggleFloat = function () {
	// 	grid.float(!grid.getFloat());
	// 	document.querySelector('#float').innerHTML = 'float: ' + grid.getFloat();
	// };
</script>

<!-- <div>
	<button class="btn btn-primary" on:click={addNewWidget}>Add Widget</button>
	<button class="btn btn-primary" on:click={makeNewWidget}>Make Widget</button>
	<button class="btn btn-primary" on:click={toggleFloat} id="float">float: true</button>
</div>
<br /><br /> -->
<div class="grid-stack" bind:this={gridel}>
	<div class="grid-stack-item">
		<div class="grid-stack-item-content">
			<div class="card-header">- Drag here -</div>
			<div class="card">
				<Aggrid />
			</div>
		</div>
	</div>
	<div class="grid-stack-item" gs-w="3" gs-h="3">
		<div class="grid-stack-item-content">
			<div class="card-header">- Drag here -</div>
			<div class="card">the rest of the panel content doesn't drag</div>
		</div>
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
