<script lang="ts">
	import '../app.postcss';
	import { AppShell, AppBar } from '@skeletonlabs/skeleton';

	// Floating UI for Popups
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';
	import { page } from '$app/stores';
	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });

	let flavors: Record<string, boolean> = {
		'virutal scroll': true,
		aggrid: true,
		split: false,
		editor: false,
		chart: false
	};
	function filter(flavor: string): void {
		flavors[flavor] = !flavors[flavor];
	}
	$: classesActive = (href: string) => (href === $page.url.pathname ? '!bg-primary-500' : '');
	$: currentRoute = $page.url.pathname;
</script>

<!-- App Shell -->
<!-- regionPage={currentRoute === '/aggrid' ? '' : 'overflow-hidden'} -->

<AppShell slotPageContent="h-screen">
	<!-- <svelte:fragment slot="header">
		<AppBar>
			<svelte:fragment slot="lead">
				<strong class="text-xl uppercase">Skeleton</strong>
			</svelte:fragment>
			<svelte:fragment slot="trail">
				{#each Object.keys(flavors) as f}
					<span
						class="chip {flavors[f] ? 'variant-filled' : 'variant-soft'}"
						on:click={() => {
							filter(f);
						}}
						on:keypress
					>
						<span class="capitalize">{f}</span>
					</span>
				{/each}
			</svelte:fragment>
		</AppBar>
	</svelte:fragment> -->
	<svelte:fragment slot="sidebarLeft">
		<div id="sidebar-left" class="hidden lg:block">
			<nav class="list-nav">
				<ul>
					<li>
						<a href="/">
							<span class="badge bg-primary-500">💀</span>
							<span class="flex-auto">Home</span>
						</a>
					</li>
					<li>
						<a href="/otter">
							<span class="badge bg-primary-500">💀</span>
							<span class="flex-auto">otter</span>
						</a>
					</li>
					<li>
						<a href="/feed">
							<span class="badge bg-primary-500">💀</span>
							<span class="flex-auto">Feed</span>
						</a>
					</li>
					<li>
						<a href="/chat">
							<span class="badge bg-primary-500">💀</span>
							<span class="flex-auto">Chat</span>
						</a>
					</li>
					<li>
						<a href="/aggrid">
							<span class="badge bg-primary-500">💀</span>
							<span class="flex-auto">Aggrid</span>
						</a>
					</li>
					<li>
						<a href="/monaco">
							<span class="badge bg-primary-500">💀</span>
							<span class="flex-auto">monaco</span>
						</a>
					</li>
					<li>
						<a href="/editor">
							<span class="badge bg-primary-500">💀</span>
							<span class="flex-auto">editor</span>
						</a>
					</li>
					<li>
						<a href="/split">
							<span class="badge bg-primary-500">💀</span>
							<span class="flex-auto">Split</span>
						</a>
					</li>
					<li>
						<a href="/charts">
							<span class="badge bg-primary-500">💀</span>
							<span class="flex-auto">charts</span>
						</a>
					</li>
				</ul>
				<div>
					<ul style="width: 100px;">
						<li>svelvet/svelteflow incomplete.</li>
						<li>cannot add flowchart/orgchart maker</li>
						<li></li>
					</ul>
				</div>
			</nav>
		</div></svelte:fragment
	>
	<svelte:fragment slot="sidebarRight">
		<div id="sidebar-right" class="hidden lg:block">Sidebar</div>
	</svelte:fragment>
	<!-- <svelte:fragment slot="pageHeader">Page Header</svelte:fragment> -->
	<slot />
	<!-- <svelte:fragment slot="pageFooter">Page Footer</svelte:fragment> -->
	<!-- <svelte:fragment slot="footer">Footer</svelte:fragment> -->
</AppShell>

<!-- <div class="main-layout">

</div>

<style>
	.main-layout {
		height: 100vh;
		width: 100vw;
	}
</style> -->
