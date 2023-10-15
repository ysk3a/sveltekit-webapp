<script lang="ts">
	import { createEventDispatcher, onDestroy, onMount } from 'svelte';
	// import type { Grid, GridApi, GridOptions, ColDef } from 'ag-grid-community';
	import {
		ComponentUtil,
		Grid,
		type ColDef,
		type GridOptions,
		type GridParams,
		type GridReadyEvent,
		type Module,
		GridApi
	} from 'ag-grid-community';
	import 'ag-grid-community/styles/ag-grid.css';
	import 'ag-grid-community/styles/ag-theme-balham.css';

	let data: any;

	// export let loading = false;
	const dispatch = createEventDispatcher();

	//   let ref: HTMLElement;
	//   let api : GridApi;
	let grid: Grid;
	let gridRef: HTMLElement;
	let gridOptions: GridOptions<IOlympicData>;

	let gridApi: GridApi;
	// gridApi = gridOptions.api;
	//   export let theme = "alpine";
	// gridOptions = {
	// 	defaultColDef: {
	// 		flex: 1,
	// 		minWidth: 150,
	// 		filter: true
	// 	},
	// 	suppressFieldDotNotation: true,
	// 	rowSelection: 'multiple'
	// };
	interface IOlympicData {
		athlete: string;
		age: number;
		country: string;
		year: number;
		date: string;
		sport: string;
		gold: number;
		silver: number;
		bronze: number;
		total: number;
	}
	gridOptions = {
		// PROPERTIES
		// Objects like myRowData and myColDefs would be created in your application
		//  rowData: myRowData,
		//  columnDefs: myColDefs,
		pagination: true,
		rowSelection: 'single',

		// EVENTS
		// Add event handlers
		onRowClicked: (event) => console.log('A row was clicked'),
		onColumnResized: (event) => console.log('A column was resized'),
		onGridReady: (event) => {
			console.log('::onGridReady', event, typeof event);
			gridApi = event.api;
		},

		// CALLBACKS
		getRowHeight: (params) => 25,
		// define grid columns
		columnDefs: [
			// using default ColDef
			{ field: 'athlete' },
			{ field: 'sport' },

			// using number column type
			{ field: 'age', type: 'numberColumn' },
			{ field: 'year', type: 'numberColumn' },

			// using date and non-editable column types
			{ field: 'date', type: ['dateColumn', 'nonEditableColumn'], width: 220 },
			{
				headerName: 'Medals',
				groupId: 'medalsGroup',
				children: [
					// using medal column type
					{ headerName: 'Gold', field: 'gold', type: 'medalColumn' },
					{ headerName: 'Silver', field: 'silver', type: 'medalColumn' },
					{ headerName: 'Bronze', field: 'bronze', type: 'medalColumn' },
					{
						headerName: 'Total',
						field: 'total',
						type: 'medalColumn',
						columnGroupShow: 'closed'
					}
				]
			}
		],

		// default ColDef, gets applied to every column
		defaultColDef: {
			// set the default column width
			width: 150,
			// make every column editable
			editable: true,
			// make every column use 'text' filter by default
			filter: 'agTextColumnFilter',
			// enable floating filters by default
			floatingFilter: true,
			// make columns resizable
			resizable: true,
			// disable cell data types
			cellDataType: false
		},

		// default ColGroupDef, get applied to every column group
		defaultColGroupDef: {
			marryChildren: true
		},

		// define specific column types
		columnTypes: {
			numberColumn: { width: 130, filter: 'agNumberColumnFilter' },
			medalColumn: { width: 100, columnGroupShow: 'open', filter: false },
			nonEditableColumn: { editable: false },
			dateColumn: {
				// specify we want to use the date filter
				filter: 'agDateColumnFilter',

				// add extra parameters for the date filter
				filterParams: {
					// provide comparator function
					comparator: (filterLocalDateAtMidnight: Date, cellValue: string) => {
						// In the example application, dates are stored as dd/mm/yyyy
						// We create a Date object for comparison against the filter date
						const dateParts = cellValue.split('/');
						const day = Number(dateParts[0]);
						const month = Number(dateParts[1]) - 1;
						const year = Number(dateParts[2]);
						const cellDate = new Date(year, month, day);

						// Now that both parameters are Date objects, we can compare
						if (cellDate < filterLocalDateAtMidnight) {
							return -1;
						} else if (cellDate > filterLocalDateAtMidnight) {
							return 1;
						} else {
							return 0;
						}
					}
				}
			}
		},
		rowData: null
	};
	// const onSelectionChanged = () => {
	// 	const selectedRows = gridApi.getSelectedRows();
	// 	dispatch('select', selectedRows);
	// };

	// const onCellValueChanged = (e: any) => {
	// 	data[e.rowIndex] = e.data;
	// 	// dispatch("update", { row: e.rowIndex, data: e.data });
	// };

	// const onGridReady = () => {
	// 	gridApi = gridOptions.api;
	// 	if (loading) gridApi.showLoadingOverlay();
	// };

	onMount(async () => {
		grid = new Grid(gridRef, {
			...gridOptions,
			// columnDefs,
			rowData: data
			// onGridReady,
			// onCellValueChanged,
			// onSelectionChanged
		});
		fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
			.then((response) => response.json())
			// try: somehow to make it stream?
			.then((data) => {
				console.log('::fetch then=', data);

				gridApi.setRowData(data);
			});
	});
	// onMount(async () => {
	// 	grid = new Grid(gridRef, {
	// 		...gridOptions,
	// 		columnDefs,
	// 		rowData: data,
	// 		onGridReady,
	// 		onCellValueChanged,
	// 		onSelectionChanged
	// 	});
	// 	// let agGridInst = new agGrid
	// 	// new agGrid.Grid(gridContainer, gridOptions);

	// });
	onDestroy(() => {
		if (grid) {
			grid.destroy();
		}
	});

	$: console.log(':: gridHtml', grid, gridOptions, gridApi);
	function actionGrid(element: HTMLDivElement) {
		console.log(element);
	}
	// reactive statement
	// $: theme = 'balham-dark'; // not needed? why?
	let theme = 'balham-dark';
	// $: console.log(theme);

	function toggleTheme() {
		if (theme === 'balham') {
			theme = 'balham-dark';
		} else {
			theme = 'balham';
		}
		gridApi.redrawRows();
	}
</script>

<button type="button" class="btn" on:click={toggleTheme}>toggle theme</button>
<div
	bind:this={gridRef}
	use:actionGrid
	id="myGrid"
	class:ag-theme-balham={theme === 'balham'}
	class:ag-theme-balham-dark={theme === 'balham-dark'}
	style="height: 500px"
></div>

<!--
	to toggle you need to do class: directive approach it seems 	
	class="ag-theme-${theme}"
 -->
<style>
</style>
