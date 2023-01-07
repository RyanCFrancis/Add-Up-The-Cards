<script lang="ts">
	import './styles.css';
	import { onMount } from 'svelte';
	import { invalidate } from '$app/navigation';
	//import { supabase } from '$lib/supabaseClient';
	let innerWidth: number;

	onMount(() => {
		// const {
		// 	data: { subscription }
		// } = supabase.auth.onAuthStateChange(() => {
		// 	invalidate('supabase:auth');
		// });
		// return () => {
		// 	subscription.unsubscribe();
		// };
	});
</script>

<head />
<svelte:window bind:innerWidth />

<div class="app">
	<slot />
</div>
{#if innerWidth > 700}
	<div class="sidebar">
		<div class="sidebarList">
			<a href="/" class="sidebarItem">Game</a>
			<a href="/Login" class="sidebarItem">Login</a>
			<a href="/Account" class="sidebarItem">Your Account</a>
			<a href="/Scores" class="sidebarItem">High Scores</a>
		</div>
		<div class="sidebarExtension" />
	</div>
{/if}

<style>
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	.sidebarList {
		position: fixed;
		top: 10%;
		left: 90%;
		display: grid;
		flex-direction: column;

		width: 100px;
		height: auto;
		z-index: 2;
	}
	.sidebarExtension {
		position: fixed;
		top: 0%;
		left: 87.5%;
		width: 1000px;
		padding: 10px;
		height: 90%;
		background: linear-gradient(to bottom, rgb(42, 14, 56), rgba(0, 0, 0, 0));
	}

	.sidebarItem {
		padding-bottom: 10%;
		margin-right: auto;
	}
</style>
