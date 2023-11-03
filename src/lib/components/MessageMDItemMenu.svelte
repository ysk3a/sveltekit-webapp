<script lang="ts">
	import Menu from '@smui/menu';
	import List, { Item, Separator, Text } from '@smui/list';
	import Button, { Label } from '@smui/button';

	let menu: Menu;
	let clicked = 'nothing yet';
</script>

<div>
	<!-- style="min-width: 100px;" -->
	<Button on:click={() => menu.setOpen(true)}>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			class="icon icon-tabler icon-tabler-dots"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			stroke-width="2"
			stroke="currentColor"
			fill="none"
			stroke-linecap="round"
			stroke-linejoin="round"
		>
			<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
			<path d="M5 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0"></path>
			<path d="M12 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0"></path>
			<path d="M19 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0"></path>
		</svg>
	</Button>
	<Menu bind:this={menu}>
		<List>
			<Item on:SMUI:action={() => (clicked = 'Cut')}>
				<Text>Reply</Text>
			</Item>
			<Item on:SMUI:action={() => (clicked = 'Copy')}>
				<Text>Mark Unread</Text>
			</Item>
			<Item on:SMUI:action={() => (clicked = 'Paste')}>
				<Text>Copy Message Link</Text>
			</Item>
			<Separator />
			<Item on:SMUI:action={() => (clicked = 'Delete')}>
				<Text>Report Message</Text>
			</Item>
			<Separator />
			<Item on:SMUI:action={() => (clicked = 'Delete')}>
				<Text>Delete Message</Text>
			</Item>
		</List>
	</Menu>
</div>

<!-- <pre class="status">Clicked: {clicked}</pre> -->
