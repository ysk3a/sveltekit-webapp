<script lang="ts">
	import data, { type Emoji, type Skin } from '@emoji-mart/data';
	import { Picker } from 'emoji-mart';
	import type EmojiMart from 'emoji-mart';
	import { createEventDispatcher, onDestroy, onMount } from 'svelte';
	export let uniqueKey: number;
	const pickerOptions = { data, onEmojiSelect: handleSelect };
	const picker = new Picker(pickerOptions);
	// const picker = new EmojiMart.Picker(pickerOptions)
	import { init } from 'emoji-mart';
	import type { PopupSettings } from '@skeletonlabs/skeleton';
	const dispatch = createEventDispatcher();
	//     const onEmojiSelectEvent = () => {
	//     dispatch('onEmojiSelectEvent');
	//   };
	let opened: boolean = false;
	// interface EmojiExt {
	// 	shortcodes: string;
	// }
	type EmojiExt = {
		shortcodes: string;
	};
	type Unionized = Emoji | Skin | EmojiExt;
	let emoji: Unionized = {
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

	// const popupClick: PopupSettings = {
	// 	event: 'click',
	// 	target: '' + uniqueKey,
	// 	placement: 'top'
	// };
	// target: 'popupClick',

	let pickerEl: HTMLElement;
	// const pick = EmojiMart.Picker.Props;
	onMount(() => {
		init({ data }); // should so on page scope not component scope
		// look into store or localstorage
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
		// node.append(picker); //
		node.appendChild(picker as unknown as Element);
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
	// function popup(node: any, popupObj: any) {
	// 	console.log('::popup', opened, node, popupObj);
	// 	if (opened) {
	// 		opened = false;
	// 	} else {
	// 		opened = true;
	// 	}
	// }
	// function openEmojiPicker() {
	// 	console.log('::openpicker', opened);
	// 	if (opened) {
	// 		opened = false;
	// 	} else {
	// 		opened = true;
	// 	}
	// }
	function handleSelect(emojiData: Unionized, e: Event) {
		console.log('handleSelect', emojiData, e);
		dispatch('onEmojiSelectEvent', {
			emojiSelected: emojiData
		});
	}
	$: console.log('::', opened);
</script>

<div id="container-picker" bind:this={pickerEl} use:emojiMartAction={'dummy params'}></div>
