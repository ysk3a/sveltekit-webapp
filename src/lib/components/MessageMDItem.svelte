<script lang="ts">
	import SvelteMarkdown from 'svelte-markdown';
	import data, { type Emoji, type Skin } from '@emoji-mart/data';
	import { Picker } from 'emoji-mart';
	import type EmojiMart from 'emoji-mart';
	import { onDestroy, onMount } from 'svelte';
	export let uniqueKey: number;
	export let source: string = '';
	const pickerOptions = { data, onEmojiSelect: console.log };
	const picker = new Picker(pickerOptions);
	// const picker = new EmojiMart.Picker(pickerOptions)
	import { init } from 'emoji-mart';
	import type { PopupSettings } from '@skeletonlabs/skeleton';
	import { popup } from '@skeletonlabs/skeleton';

	import EmojiPicker from './EmojiPicker.svelte';
	let opened: boolean = false;
	interface EmojiExt {
		shortcodes: string;
	}
	let emoji: Emoji | Skin | EmojiExt = {
		id: '',
		name: '',
		keywords: [],
		skins: [],
		version: 0,
		emoticons: [],
		shortcodes: '',
		unified: '',
		native: ''
	};

	const popupClick: PopupSettings = {
		event: 'click',
		target: '' + uniqueKey,
		placement: 'right',
		state: (e: Record<string, boolean>) => console.log('::popupstate', e)
	};
	// target: 'popupClick',

	let pickerEl: HTMLElement;
	// const pick = EmojiMart.Picker.Props;
	// onMount(() => {
	// 	init({ data }); // should so on page scope not component scope
	// });
	// function emojiMartAction(node: HTMLElement, params: string) {
	// 	console.log('::emojiMartAction', node, params);
	// 	// pickerEl.append(			new Picker({
	// 	// 		data,
	// 	// 		onEmojiSelect: console.log
	// 	// 		// theme,
	// 	// 		// i18n,
	// 	// 		// autoFocus: true,
	// 	// 		// dynamicWidth: true,
	// 	// 		// locale: lang
	// 	// 	})
	// 	// node.append(picker); //
	// 	node.appendChild(picker as unknown as Element);
	// 	return {
	// 		// update(params) {
	// 		// 	// the value of `bar` has changed
	// 		// },

	// 		destroy() {
	// 			// logs when element is removed
	// 			console.log('bye');
	// 		}
	// 	};
	// }
	// function popup(node: any, popupObj: any) {
	// 	console.log('::popup', opened, node, popupObj);
	// 	// if (opened) {
	// 	// 	opened = false;
	// 	// } else {
	// 	// 	opened = true;
	// 	// }
	// }
	// function openEmojiPicker() {
	// 	console.log('::openpicker', opened);
	// 	if (opened) {
	// 		opened = false;
	// 	} else {
	// 		opened = true;
	// 	}
	// }
	// function handleSelect(emojiData: any, e: Event) {
	// console.log('handleSelect', emojiData, e)
	// }
	$: console.log('::', opened);
	type Reaction = {
		id: string;
		count: number;
	};
	let listOfReactions: Reaction[] = [];
	function handleDispatchedSelectedEmoji(e: any) {
		const selectedEmoji = e.detail.emojiSelected;
		const exists: number = listOfReactions.findIndex((emoji) => emoji.id === selectedEmoji.id);
		if (exists === -1) {
			// not found
			listOfReactions.push({
				id: selectedEmoji.id,
				count: 1
			});
		} else {
			listOfReactions[exists].count++;
		}
		console.log('::handleDispatchedSelectedEmoji', e.detail.emojiSelected, exists, listOfReactions);
		listOfReactions = listOfReactions;
	}
</script>

<div class="sveltemarkdown-wrapper">
	<div class="uniqueKey">
		{uniqueKey}
	</div>
	<SvelteMarkdown {source} />
	<div class="reaction-bar">
		<div id="reaction-list" />
		{#each listOfReactions as reaction (reaction.id)}
			<button>
				<em-emoji id={reaction.id}></em-emoji>
				{reaction.count}
			</button>
		{/each}
		<!-- <button class="btn variant-filled" use:popup={popupClick}>Click</button> -->
		<button class="btn variant-filled-surface" use:popup={popupClick}>pop</button>
		<!-- on:click={openEmojiPicker} -->
		<!-- <button type="button" class="btn variant-filled" on:click={openEmojiPicker}>open{opened}</button
		> -->

		<div class="card variant-filled-surface z-10 p-1" data-popup={'' + uniqueKey}>
			<!-- {#if opened}
				<div id="container-picker" bind:this={pickerEl} use:emojiMartAction={'dummy params'}></div>
			{/if} -->
			<EmojiPicker {uniqueKey} on:onEmojiSelectEvent={handleDispatchedSelectedEmoji} />
			<!-- <p>some content</p> -->
			<div class="arrow variant-filled-surface" />
		</div>
		<!-- <div id="container-picker" bind:this={pickerEl} use:emojiMartAction={'dummy params'}></div> -->

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
