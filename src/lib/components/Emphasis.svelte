<script lang="ts">
	// export let href = "";
	// export let title = undefined;
	// export let className = '';
	export let text = '';

	// if text has @ or # render strong else regular p
	$: hasHashtagMention = text.match(/[#@]\w\S*\b/g);
	$: console.log('::emphais', hasHashtagMention, text);
</script>

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
		background-color: rgb(238, 191, 129);
		color: rgb(56, 56, 56);
		border: 1px solid;
		border-radius: 5px;
		padding: 2px;
	}
</style>
