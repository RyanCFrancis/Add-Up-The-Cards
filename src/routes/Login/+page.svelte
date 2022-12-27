<script lang="ts">
	import { supabase } from '$lib/supabaseClient';
	import { onMount } from 'svelte';

	let isLoggedIn: boolean;

	async function googleLogin() {
		const { data, error } = await supabase.auth.signInWithOAuth({
			provider: 'google',
			options: {
				//redirectTo: 'https://add.up.the.cards.vercel.app'
			}
		});
		const authToken = data.url;
		console.log(authToken);
	}

	onMount(() => {
		googleLogin();
	});
</script>

<style>
</style>
