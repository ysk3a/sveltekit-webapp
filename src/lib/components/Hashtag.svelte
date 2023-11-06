<script lang="ts">
	// export let href = "";
	// export let title = undefined;
	// export let className = '';
	export let text = '';

	// if text has @ or # render strong else regular p // ([@#][\w_-]+)
	$: hasHashtagMention = text.match(/[#@]\w\S*\b/g);
	$: console.log('::hashtagMention hashtag', hasHashtagMention, text);
</script>

<button
	class="custom-hashtagMention"
	on:click={() => {
		console.log('clicked hashtag');
	}}>{text}</button
>

<!-- {#if hasHashtagMention}
	<button class="custom-hashtagMention" on:click={console.log('clicked mention')}>{text}</button>
{:else}
	<strong>{text}</strong>
{/if} -->

<style>
	.custom-hashtagMention {
		background-color: lightsalmon;
		color: rgb(56, 56, 56);
		border: 1px solid;
		border-radius: 5px;
		padding: 2px;
	}
</style>
