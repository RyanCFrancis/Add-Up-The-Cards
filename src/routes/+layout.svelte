<script lang="ts">
	import './styles.css';
	import { supabase } from '$lib/supabaseClient';
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
		<a href="/Login" class="sidebarItem">Login</a>
		<a href="/Signout" class="sidebarItem">Sign Out</a>
		<a href="/Account" class="sidebarItem">Your Account</a>
		<a href="/Scores" class="sidebarItem">High Scores</a>
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
