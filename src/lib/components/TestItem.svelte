<script lang="ts">
	export let uniqueKey: string | number;
	export let height: string | number;
</script>

<div style="height: {height}px">
	{uniqueKey} Item ({height}px)
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
