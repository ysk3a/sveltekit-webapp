<script lang="ts">
	import { onMount } from 'svelte';
	import type { Readable } from 'svelte/store';
	import { createEditor, Editor, EditorContent } from 'svelte-tiptap';
	import StarterKit from '@tiptap/starter-kit';
	import Mention from '@tiptap/extension-mention';
	import tippy from 'tippy.js';
	let editor: Readable<Editor>;
	onMount(() => {
		editor = createEditor({
			extensions: [
				StarterKit,
				Mention.configure({
					HTMLAttributes: {
						class: 'mention'
					},
					suggestion: {
						// char: '#',
						items: ({ query }) => {
							return [
								'Lea Thompson',
								'Cyndi Lauper',
								'Tom Cruise',
								'Madonna',
								'Jerry Hall',
								'Joan Collins',
								'Winona Ryder',
								'Christina Applegate',
								'Alyssa Milano',
								'Molly Ringwald',
								'Ally Sheedy',
								'Debbie Harry',
								'Olivia Newton-John',
								'Elton John',
								'Michael J. Fox',
								'Axl Rose',
								'Emilio Estevez',
								'Ralph Macchio',
								'Rob Lowe',
								'Jennifer Grey',
								'Mickey Rourke',
								'John Cusack',
								'Matthew Broderick',
								'Justine Bateman',
								'Lisa Bonet'
							]
								.filter((item) => item.toLowerCase().startsWith(query.toLowerCase()))
								.slice(0, 5);
						}
						//   render: () => {
						//     let renderer: AngularRenderer<MenitonsList, MenitonsList>;
						//     let popup;

						//     return {
						//       onStart: (props) => {
						//         renderer = new AngularRenderer(MenitonsList, this.injector, {
						//           props,
						//         });

						//         renderer.updateProps({ props });

						//         popup = tippy('body', {
						//           getReferenceClientRect: props.clientRect,
						//           appendTo: () => document.body,
						//           content: renderer.dom,
						//           showOnCreate: true,
						//           interactive: true,
						//           trigger: 'manual',
						//           placement: 'bottom-start',
						//         });
						//       },
						//       onUpdate(props) {
						//         renderer.updateProps({ props });

						//         popup[0].setProps({
						//           getReferenceClientRect: props.clientRect,
						//         });
						//       },
						//       onKeyDown(props) {
						//         return renderer.instance.onKeyDown(props);
						//       },
						//       onExit() {
						//         popup[0].destroy();
						//         renderer.destroy();
						//       },
						//     };
						//   },
					}
				})
			],
			content: `
        <p>This is still the text editor you're used to, but enriched with node views.</p>
        <svelte-counter-component count="0"></svelte-counter-component>
        <svelte-MentionChip-component count="0"></svelte-MentionChip-component> continue
        <p>Hi everyone! Don’t forget the daily stand up at 8 AM.</p>
        <p><span data-type="mention" data-id="Jennifer Grey"></span> Would you mind to share what you’ve been working on lately? We fear not much happened since Dirty Dancing.
        <p><span data-type="mention" data-id="Winona Ryder"></span> <span data-type="mention" data-id="Axl Rose"></span> Let’s go through your most important points quickly.</p>
        <p>I have a meeting with <span data-type="mention" data-id="Christina Applegate"></span> and don’t want to come late.</p>
        <p>– Thanks, your big boss</p>
        <p>This is an editable component</p>
        <svelte-editable-component>This is editable</svelte-editable-component>
        <p>Did you see that? That's a Svelte component. We are really living in the future.</p>
      `,
			editorProps: {
				attributes: {
					class: 'border-2 border-black rounded-b-md p-3 outline-none '
				}
			}
		});
	});
</script>

<EditorContent editor={$editor} />
