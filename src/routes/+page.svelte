<script lang="ts">
	import VirtualList1 from '$lib/components/VirtualList1.svelte';
	import { Button, truncate, breakpoints } from 'carbon-components-svelte';
	import { Airplane } from 'carbon-pictograms-svelte';
	import { Pane, Splitpanes } from 'svelte-splitpanes';

	let value = [50];
</script>

<Splitpanes style="height: 400px">
	<Pane bind:size={value[0]}>
		<span>{Math.round(value[0])}%</span>
	</Pane>
	<Pane>
		<VirtualList1 />
	</Pane>
</Splitpanes>
