<script lang="ts">
	import 'carbon-components-svelte/css/all.css';
	import {
		Header,
		HeaderNav,
		HeaderNavItem,
		HeaderNavMenu,
		SideNav,
		SideNavItems,
		SideNavMenu,
		SideNavMenuItem,
		SideNavLink,
		SideNavDivider,
		SkipToContent,
		Content,
		Grid,
		Row,
		Column,
		Theme,
		RadioButtonGroup,
		RadioButton
	} from 'carbon-components-svelte';
	import Fade from 'carbon-icons-svelte/lib/Fade.svelte';
	import type { CarbonTheme } from 'carbon-components-svelte/types/Theme/Theme.svelte';

	let isSideNavOpen = false;
	let theme: CarbonTheme = 'g90';
</script>

<Theme bind:theme persist persistKey="__carbon-theme" />

<Header company="IBM" platformName="Carbon Svelte" bind:isSideNavOpen>
	<svelte:fragment slot="skip-to-content">
		<SkipToContent />
	</svelte:fragment>
	<RadioButtonGroup
		legendText="Carbon theme"
		bind:selected={theme}
		style="background-color: lightslategray;"
	>
		{#each ['g10', 'g80', 'g90', 'g100'] as value}
			<RadioButton labelText={value} {value} />
		{/each}
	</RadioButtonGroup>
	<HeaderNav>
		<HeaderNavItem href="/" text="Link 1" />
		<HeaderNavItem href="/" text="Link 2" />
		<HeaderNavItem href="/" text="Link 3" />
		<HeaderNavMenu text="Menu">
			<HeaderNavItem href="/" text="Link 1" />
			<HeaderNavItem href="/" text="Link 2" />
			<HeaderNavItem href="/" text="Link 3" />
		</HeaderNavMenu>
		<HeaderNavItem href="/" text="Link 4" />
	</HeaderNav>
</Header>

<SideNav bind:isOpen={isSideNavOpen} rail>
	<SideNavItems>
		<SideNavLink icon={Fade} text="Link 1" href="/" isSelected />
		<SideNavLink icon={Fade} text="Link 2" href="/" />
		<SideNavLink icon={Fade} text="Link 3" href="/" />
		<SideNavMenu icon={Fade} text="Menu">
			<SideNavMenuItem href="/" text="Link 1" />
			<SideNavMenuItem href="/" text="Link 2" />
			<SideNavMenuItem href="/" text="Link 3" />
		</SideNavMenu>
		<SideNavDivider />
		<SideNavLink icon={Fade} text="Link 4" href="/" />
	</SideNavItems>
</SideNav>

<Content>
	<slot />

	<Grid>
		<Row>
			<Column>
				<h1>Welcome</h1>
			</Column>
		</Row>
	</Grid>
</Content>
