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
		aggrid: false,
		split: true,
		editor: false,
		svelvet: false,
		'ejs inf': false
	};
	function filter(flavor: string): void {
		flavors[flavor] = !flavors[flavor];
	}
	$: classesActive = (href: string) => (href === $page.url.pathname ? '!bg-primary-500' : '');
</script>

<!-- App Shell -->
<AppShell regionPage="overflow-hidden">
	<svelte:fragment slot="header">
		<AppBar>
			<svelte:fragment slot="lead">
				<strong class="text-xl uppercase">Skeleton</strong>
			</svelte:fragment>
			<svelte:fragment slot="trail">
				{#each Object.keys(flavors) as f}
					<!-- svelte-ignore a11y-no-static-element-interactions -->
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
	</svelte:fragment>
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
						<a href="/editor">
							<span class="badge bg-primary-500">💀</span>
							<span class="flex-auto">editor</span>
						</a>
					</li>
					<li>
						<a href="/svelvet">
							<span class="badge bg-primary-500">💀</span>
							<span class="flex-auto">svelvet</span>
						</a>
					</li>
					<li>
						<a href="/ejsinf">
							<span class="badge bg-primary-500">💀</span>
							<span class="flex-auto">ejsinf</span>
						</a>
					</li>
					<li>
						<a href="/charts">
							<span class="badge bg-primary-500">💀</span>
							<span class="flex-auto">charts</span>
						</a>
					</li>
				</ul>
			</nav>
		</div>
	</svelte:fragment>
	<svelte:fragment slot="sidebarRight">
		<div id="sidebar-right" class="hidden lg:block">Right Sidebar</div>
	</svelte:fragment>

	<slot />
</AppShell>
