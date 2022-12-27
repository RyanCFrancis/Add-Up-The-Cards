<script lang="ts">
	import { supabase } from '$lib/supabaseClient';
	import { onMount } from 'svelte';

	let isLoggedIn: boolean;

	async function signout() {
		const { error } = await supabase.auth.signOut();
	}

	onMount(() => {
		signout();
	});
</script>

<style>
</style>
