<script lang="ts">
	import './styles.css';
	let innerWidth: number;
</script>

<head />
<svelte:window bind:innerWidth />

<div class="app">
	<slot />
</div>
{#if innerWidth > 700}
	<ul class="sidebar">
		<a href="/" class="sidebarItem">Game</a>
		<a href="/scores" class="sidebarItem">High Scores</a>
		<a href="/userAcct" class="sidebarItem">Account</a>
	</ul>
{/if}

<style>
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	.sidebar {
		position: absolute;
		top: 10%;
		right: 5%;
		display: grid;
		flex-direction: column;
	}

	.sidebarItem {
		padding-bottom: 10%;
	}
</style>
