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
	import MessageMdItemMenu from './MessageMDItemMenu.svelte';
	import { marked, type MarkedOptions } from 'marked';
	import {
		mentionNamedTokenizerExtension,
		type CustomRenderer,
		hashtagTokenizerExtension
	} from './MyMarkedExtensions';
	import Mention2 from './Mention2.svelte';
	import Hashtag from './Hashtag.svelte';
	import Mention from './Mention.svelte';

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
		closeQuery: 'container-picker',
		state: (e: Record<string, boolean>) => console.log('::popupstate', e)
	};
	// target: 'popupClick',

	let pickerEl: HTMLElement;

	$: console.log('::', opened);
	type Reaction = {
		id: string;
		count: number;
		reacted?: boolean;
	};
	let listOfReactions: Reaction[] = [];
	function handleDispatchedSelectedEmoji(e: any) {
		const selectedEmoji = e.detail.emojiSelected;
		const exists: number = listOfReactions.findIndex((emoji) => emoji.id === selectedEmoji.id);
		if (exists === -1) {
			// not found
			listOfReactions.push({
				id: selectedEmoji.id,
				count: 1,
				reacted: true // temporarily removed until multi user works
			});
		} else {
			listOfReactions[exists].count++;
		}
		listOfReactions = listOfReactions;
		console.log('::handleDispatchedSelectedEmoji', e.detail.emojiSelected, exists, listOfReactions);
	}
	function toggleEmoji(reactionId: string) {
		const exists: number = listOfReactions.findIndex((emoji) => emoji.id === reactionId);
		if (exists !== -1) {
			const emoji = listOfReactions[exists];
			if (emoji.reacted) {
				emoji.count--;
				emoji.reacted = false;
				// logic here incomplete since real life flow would be different. only for developing phase
				// for now commented out to just keep the list of reactions
				// if (emoji.count === 0) {
				// 	listOfReactions.splice(exists, 1);
				// }
			} else {
				emoji.count++;
				emoji.reacted = true;
			}
		}
		listOfReactions = listOfReactions;
		console.log('::toggleEmoji', exists, listOfReactions);
	}
	marked.use({
		extensions: [
			hashtagTokenizerExtension,
			mentionNamedTokenizerExtension
			// mentionTokenizerExtension,
		]
	});
	// marked.setOptions(…)
	const options: MarkedOptions = marked.defaults;

	// renderers type not happy since custom renderers not exist in svelte-markdown's
	// Partial<Renderers>. But this seems to mostly hide then fix. Is there better way??
	const renderers: CustomRenderer = {
		mentioning: Mention2,
		hashtaging: Hashtag
		// '@': Mention,
	};
	$: console.log('::mditem, source', source);
</script>

<div class="sveltemarkdown-wrapper">
	<div class="uniqueKey">
		{uniqueKey}
		<div class="menu">
			<MessageMdItemMenu />
		</div>
	</div>

	<SvelteMarkdown {source} {options} {renderers} />

	<div class="reaction-bar">
		<div id="reaction-list" />
		{#each listOfReactions as reaction (reaction.id)}
			<button on:click={() => toggleEmoji(reaction.id)}>
				<em-emoji id={reaction.id}></em-emoji>
				{reaction.count}
			</button>
		{/each}
		<!-- <button class="btn variant-filled" use:popup={popupClick}>Click</button> -->
		<button class="btn variant-filled-surface" use:popup={popupClick}>
			<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"
				><path
					fill="currentColor"
					d="M13 7a6 6 0 1 0-5.746 5.995A4.472 4.472 0 0 1 7.027 12H7a5 5 0 1 1 5-5v.027c.345.039.678.116.995.227C12.998 7.17 13 7.085 13 7Zm-5.888 3.498c.084-.368.212-.719.38-1.046a2.493 2.493 0 0 1-2.356-.785a.5.5 0 0 0-.745.666a3.493 3.493 0 0 0 2.72 1.165ZM6 6a.75.75 0 1 1-1.5 0A.75.75 0 0 1 6 6Zm2.75.75a.75.75 0 1 0 0-1.5a.75.75 0 0 0 0 1.5ZM15 11.5a3.5 3.5 0 1 1-7 0a3.5 3.5 0 0 1 7 0Zm-3-2a.5.5 0 0 0-1 0V11H9.5a.5.5 0 0 0 0 1H11v1.5a.5.5 0 0 0 1 0V12h1.5a.5.5 0 0 0 0-1H12V9.5Z"
				/></svg
			></button
		>
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
		position: relative;
	}
	.sveltemarkdown-wrapper {
		/* Don't set margin top and bottom together! It will break size counting */
		padding: 8px;
		color: black;
		background-color: #9779b4;
		border-radius: 20px;
	}
	.menu {
		position: absolute;
		top: -8px;
		right: 0px;
	}
</style>
