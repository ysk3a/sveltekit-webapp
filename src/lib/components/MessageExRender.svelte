<script lang="ts">
	import { getAstNode } from 'svelte-exmarkdown';
	const astContext = getAstNode();
	$: console.log('::astContextgetAstNode', astContext);
</script>

<!-- Dump current node -->
<pre>{JSON.stringify($astContext, null, 2)}</pre>
