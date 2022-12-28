<script lang="ts">
	import { supabase } from '$lib/supabaseClient';
	import { onMount } from 'svelte';
	import type { AuthSession } from '@supabase/supabase-js';

	export let currentSession: AuthSession;
	let currentUser: any;

	onMount(async () => {
		//currentSession = await supabase.auth.getSession();
		//console.log('google-id = ' + currentSession.data.session.user.id);

		let { data: Users, error } = await supabase.from('Users').select('Name');

		currentUser = Users;
		console.log(currentUser[0].Name);
		//console.log('test');
	});
</script>

{#await supabase.auth.getSession()}
	<p>waiting</p>
{:then}
	<p>{currentUser[0].Name}</p>
{:catch error}
	<p style="color: red">{error.message}</p>
{/await}

<style>
</style>
