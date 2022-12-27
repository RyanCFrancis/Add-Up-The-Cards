<script lang="ts">
	import { supabase } from '$lib/supabaseClient';
	import { onMount } from 'svelte';
	let currentSession: any;

	onMount(async () => {
		currentSession = await supabase.auth.getSession();
		console.log(currentSession.data.session.user.id);
	});
</script>

<div>{currentSession}</div>

<style>
</style>
