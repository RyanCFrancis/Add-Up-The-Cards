<script lang="ts">
	import { supabase } from '$lib/supabaseClient';
	import { onMount } from 'svelte';

	let isLoggedIn: boolean;

	async function googleLogin() {
		const { data, error } = await supabase.auth.signInWithOAuth({
			provider: 'google',
			options: {
				redirectTo: '/Scores'
			}
		});
		const authToken = data;
	}

	onMount(() => {
		googleLogin();
	});
</script>

<style>
</style>
