<script lang="ts">
	import SvelteMarkdown from 'svelte-markdown';
	import data from '@emoji-mart/data';
	import { Picker } from 'emoji-mart';
	import { onDestroy, onMount } from 'svelte';
	export let uniqueKey: number;
	export let source: string = '';
	const pickerOptions = { data, onEmojiSelect: console.log };
	const picker = new Picker(pickerOptions);
	// const picker = new EmojiMart.Picker(pickerOptions)
	import { init } from 'emoji-mart';

	// onDestroy(() => {
	// 	document.removeEventListener('keypress', handleKeypress)
	// })
	let pickerEl: HTMLElement;
	onMount(() => {
		init({ data }); // should so on page scope not component scope
	});
	function emojiMartAction(node: HTMLElement, params: string) {
		console.log('::emojiMartAction', node, params);
		// pickerEl.append(			new Picker({
		// 		data,
		// 		onEmojiSelect: console.log
		// 		// theme,
		// 		// i18n,
		// 		// autoFocus: true,
		// 		// dynamicWidth: true,
		// 		// locale: lang
		// 	})
		node.append(picker);
		return {
			// update(params) {
			// 	// the value of `bar` has changed
			// },

			destroy() {
				// logs when element is removed
				console.log('bye');
			}
		};
	}
	function openEmojiPicker() {
		pickerEl.append(picker);
	}
</script>

<div class="sveltemarkdown-wrapper">
	<div class="uniqueKey">
		{uniqueKey}
	</div>
	<SvelteMarkdown {source} />
	<div class="reaction-bar">
		<div id="reaction-list" />
		<em-emoji id="+1" size="2em"></em-emoji>
		<button type="button" on:click={openEmojiPicker}>:c</button>
		<div id="reaction-picker" bind:this={pickerEl} />
		<!-- use:emojiMartAction={'dummy params'} -->
	</div>
</div>

<style>
	.reaction-bar {
		position: relative;
	}
	#reaction-picker {
		position: absolute;
	}
	.uniqueKey {
		background-color: #41255c;
	}
	.sveltemarkdown-wrapper {
		/* Don't set margin top and bottom together! It will break size counting */
		padding: 8px;
		color: black;
		background-color: #9779b4;
		border-radius: 20px;
	}
</style>
