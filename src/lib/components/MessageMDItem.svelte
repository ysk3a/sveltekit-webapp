<script lang="ts">
	import SvelteMarkdown from 'svelte-markdown';
	export let uniqueKey: number;
	export let source: string = '';
</script>

<div class="sveltemarkdown-wrapper">
	<div>
		{uniqueKey}
	</div>
	<SvelteMarkdown {source} />
</div>

<style>
	div {
		/* Don't set margin top and bottom together! It will break size counting */
		padding: 8px;
		color: black;
		background-color: #9779b4;
		border-radius: 20px;
	}
</style>
