<script lang="ts">
	import { supabase } from '$lib/supabaseClient';
	import { onMount } from 'svelte';
	import type { AuthSession } from '@supabase/supabase-js';

	let currentUser: any;
	let currentName: any;
	let userGoogleId: any;

	onMount(async () => {
		userGoogleId = await (await supabase.auth.getSession()).data.session?.user.id;

		let { data, error } = await supabase
			.from('Scores')
			.select('*')
			.eq('user_made_by', userGoogleId);
		// currentUser = Users;
		// currentName = currentUser[0].Name;

		//console.log(currentName, currentUser);

		console.log(data![0]);
	});
</script>

{#await onMount}
	<p>Loading...</p>
{:then}
	<p>{userGoogleId}</p>
{:catch error}
	<p style="color: red">{error.message}</p>
{/await}

<button
	on:click={() => {
		//addScore();
	}}>does nothing!</button
>

<style>
</style>
