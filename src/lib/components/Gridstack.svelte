<script lang="ts">
	import 'gridstack/dist/gridstack.min.css';
	import 'gridstack/dist/gridstack-extra.min.css';

	import { GridStack } from 'gridstack';
	import type { GridStackOptions, GridStackWidget } from 'gridstack';
	import { onMount } from 'svelte';
	import Aggrid from './Aggrid.svelte';
	import { sanitize } from 'isomorphic-dompurify';
	// interface WidgetItem extends GridStackWidget {
	// 	[key: string]: string | number | undefined | boolean | GridStackOptions;
	// 	otherProp?: string;
	// }
	// interface WidgetItemAttr {
	// 	[key: string]: string | number | undefined;
	// }
	let items2: WidgetItem[] = [
		{
			id: '0',
			x: 0,
			y: 0,
			minW: 3,
			otherProp: 'aggrid',
			gsAttributes: { 'gs-min-w': 0, 'gs-min-h': 0, 'gs-w': 0, 'gs-h': 0 }
		},
		{
			id: '1',
			x: 1,
			y: 1,
			content: 'hi',
			gsAttributes: { 'gs-min-w': 0, 'gs-min-h': 0, 'gs-w': 1, 'gs-h': 1 }
		},
		{
			id: '2',
			x: 5,
			y: 5,
			otherProp: 'Counter2',
			gsAttributes: { 'gs-min-w': 0, 'gs-min-h': 0, 'gs-w': 5, 'gs-h': 5 }
		},
		{ id: '3', x: 5, y: 5, gsAttributes: { 'gs-min-w': 0, 'gs-min-h': 0, 'gs-w': 5, 'gs-h': 5 } },
		{
			id: '4',
			x: 1,
			y: 2,
			otherProp: 'Counter2',
			gsAttributes: { 'gs-min-w': 0, 'gs-min-h': 0, 'gs-w': 1, 'gs-h': 2 }
		}
	];
	// let items: GridStackWidget[] = [
	// 	{ x: 0, y: 0, minW: 2, otherProp: 'aggrid' },
	// 	{ x: 1, y: 1, content: 'hi' },
	// 	{
	// 		x: 2,
	// 		y: 2,
	// 		content: sanitize(`<div class="grid-stack-item">
	// 	<div class="grid-stack-item-content">
	// 		<div class="card-header">- Drag here -</div>
	// 		<div class="card">
	// 		    some html
	// 		</div>
	// 	</div>
	// </div>`)
	// 	}
	// ];
	let gridOptions: GridStackOptions = {
		margin: 5,
		// DO NOT use grid.value = GridStack.init(), see above
		float: true,
		cellHeight: '70px',
		minRow: 1,
		// column: 12, // default is 12. less needs extra.min.css more need scss
		// see github.com/gridstack/gridstack.js#custom-columns-css
		handle: '.card-header',
		animate: false // remove all animations always
		// resizable: { handles: 'all' } // do all sides for testing
		// children: items2
	};
	let grid: GridStack;
	let gridel: HTMLElement;
	onMount(() => {
		grid = GridStack.init(gridOptions, gridel);
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
	import GridstackItem from './GridstackItem.svelte';
	import type { WidgetItem } from '$lib/types/gridstack';
</script>

<!-- <div>
	<button class="btn btn-primary" on:click={addNewWidget}>Add Widget</button>
	<button class="btn btn-primary" on:click={makeNewWidget}>Make Widget</button>
	<button class="btn btn-primary" on:click={toggleFloat} id="float">float: true</button>
</div>
<br /><br /> -->
<div class="grid-stack" bind:this={gridel}>
	{#each items2 as widget, i (widget.id)}
		<GridstackItem {widget} />
	{/each}
</div>
