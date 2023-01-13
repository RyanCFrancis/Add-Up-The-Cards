<script lang="ts">
	import { supabase } from '$lib/supabaseClient';
	import { onMount } from 'svelte';
	import { isLoggedIn } from '../stores';
	import { get } from 'svelte/store';

	async function googleLogin() {
		isLoggedIn.set(true);
		const { data, error } = await supabase.auth.signInWithOAuth({
			provider: 'google',
			options: {
				redirectTo: window.location.origin
			}
		});
		const authToken = data;
	}
	async function googleSignOut() {
		const { error } = await supabase.auth.signOut();

		supabase.auth.onAuthStateChange((event, session) => {
			if (event == 'SIGNED_OUT') console.log('SIGNED_OUT', session);
		});
	}
</script>

<main>
	{#if get(isLoggedIn)}
		<p>You are logged in</p>
		<button
			on:click={() => {
				isLoggedIn.set(false);
				googleSignOut();
				window.location.reload();
			}}>Sign Out</button
		>
	{:else if get(isLoggedIn) == false}
		<button
			on:click={() => {
				googleLogin();
			}}>Log in</button
		>
	{/if}
</main>

<style>
	main {
		transform: translateX(-50%);
		left: 50%;
		bottom: 50%;
		position: absolute;
	}
</style>
