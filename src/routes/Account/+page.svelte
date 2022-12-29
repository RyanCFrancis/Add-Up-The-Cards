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

	async function addScore() {
		const { data, error } = await supabase
			.from('Scores')
			.insert([
				{ user_made_by: userGoogleId, score: 180000, combo_one: 20, combo_two: 20, combo_three: 20 }
			]);
		alert('boom');
	}
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
		addScore();
	}}>add a score to the db!!!</button
>

<style>
</style>
