<script lang="ts">
	import { Pane, Splitpanes } from 'svelte-splitpanes';

	// import TextArea from '$comp/TextAreaAutosize.svelte';

	let val = '// Event name: Event params   (Last event at the top)';

	function handleMessage(event: any) {
		if (event.detail) val = event.type + ' ' + JSON.stringify(event.detail) + '\n' + val;
		else val = event.type + '\n' + val;
	}
	function onClick() {
		visible = !visible;
	}

	let visible = true;
</script>

<div id="splitter-wrapper">
	<Splitpanes
		theme="banana-theme"
		class="splitter"
		style="height: 400px"
		on:ready={handleMessage}
		on:resize={handleMessage}
		on:resized={handleMessage}
		on:pane-click={handleMessage}
		on:pane-maximize={handleMessage}
		on:pane-add={handleMessage}
		on:pane-remove={handleMessage}
		on:splitter-click={handleMessage}
	>
		{#each { length: 3 } as _, i}
			<Pane>
				<span>{i + 1}</span>
			</Pane>
		{/each}
	</Splitpanes>
</div>

<textarea bind:value={val} rows="10" />

<br />
<button on:click={onClick}>{visible ? 'Hide' : 'Show'}</button>

<Splitpanes style="height: 400px">
	<Pane>
		<span>1</span>
	</Pane>
	{#if visible}
		<Pane>
			<span>2</span>
		</Pane>
	{/if}
	<Pane>
		<span>3</span>
	</Pane>
</Splitpanes>

<style>
	/* lang="scss" */
	textarea {
		background-color: black;
	}
	/* #splitter-wrapper > :global(.splitter.banana-theme .splitpanes__pane) {
		background-color: #463636;
	} */
</style>
