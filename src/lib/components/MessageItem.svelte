<script lang="ts">
	export let uniqueKey: number;
	export let message: string = '';
</script>

<div>
	{uniqueKey}: {message}
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
