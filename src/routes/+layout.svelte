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
	<ul class="sidebar">
		<a href="/" class="sidebarItem">Game</a>
		<a href="/login" class="sidebarItem">Login</a>
		<a href="/account" class="sidebarItem">Your Account</a>
		<a href="/scores" class="sidebarItem">High Scores</a>
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
