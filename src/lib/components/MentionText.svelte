<script lang="ts">
	// export let href = "";
	// export let title = undefined;
	// export let className = '';
	export let text = '';

	// if text has @ or # render strong else regular p // ([@#][\w_-]+)
	$: hasHashtagMention = text.match(/[#@]\w\S*\b/g);
	$: console.log('::hashtagMention', hasHashtagMention, text);
</script>

<!-- {#each hasHashtagMention || [] as item}
	<strong
		class="custom-hashtagMention"
		on:focus={() => {
			console.log('::on focus');
		}}
		on:mouseover={() => {
			console.log('::on hover');
		}}
		on:mouseleave={() => {
			console.log('::on not hover');
		}}>{item}</strong
	>
{:else}
	{text}
{/each} -->

{#if hasHashtagMention}
	<strong
		class="custom-hashtagMention"
		on:focus={() => {
			console.log('::on focus');
		}}
		on:mouseover={() => {
			console.log('::on hover');
		}}
		on:mouseleave={() => {
			console.log('::on not hover');
		}}>{text}</strong
	>
{:else}
	<strong>{text}</strong>
{/if}

<style>
	.custom-hashtagMention {
		background-color: rgb(185, 129, 238);
		color: rgb(56, 56, 56);
		border: 1px solid;
		border-radius: 5px;
		padding: 2px;
	}
</style>
