<script lang="ts">
	import { supabase } from '$lib/supabaseClient';
	import { isLoggedIn } from '../stores';
	import { get } from 'svelte/store';

	async function googleLogin() {
		isLoggedIn.set(false);
		const { data, error } = await supabase.auth.signInWithOAuth({
			provider: 'google',
			options: {
				//dyanmic redirect based on if you are accessing via local host or through vercel
				redirectTo: window.location.origin
			}
		});
		const authToken = data;
		if (data.provider === 'google') {
			isLoggedIn.set(true);
		}
	}
	async function googleSignOut() {
		const { error } = await supabase.auth.signOut();

		supabase.auth.onAuthStateChange((event, session) => {
			//blank event to do nothing to sign the users out and remove the cookie
			if (event == 'SIGNED_OUT') () => {};
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
				//reloads the page so it appears like the user has logged out more elegantly
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
