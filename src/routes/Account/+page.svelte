<script lang="ts">
	import { supabase } from '$lib/supabaseClient';
	import { onMount } from 'svelte';
	import type { AuthSession } from '@supabase/supabase-js';

	function timeToString(time: number) {
		let seconds = 0;
		let milliseconds = 0;
		let minutes = 0;
		if (time >= 120000) {
			minutes = Math.floor(time / 60000);
			seconds = Math.floor(time / 1000) - minutes * 60;
			milliseconds = time % 1000;
			return minutes + ' minutes and ' + seconds + '.' + milliseconds + ' seconds';
		} else if (time >= 60000 && time < 120000) {
			minutes = Math.floor(time / 60000);
			seconds = Math.floor(time / 1000) - minutes * 60;
			milliseconds = time % 1000;
			return minutes + ' minute and ' + seconds + '.' + milliseconds + ' seconds';
		} else {
			seconds = Math.floor(time / 1000);
			milliseconds = time % 1000;
			return seconds + '.' + milliseconds + ' seconds';
		}
	}

	let playerIconString: string;
	let playerName: string;
	let userGoogleId: any;
	let userScores: any[] = [];

	onMount(async () => {
		userGoogleId = (await supabase.auth.getSession()).data.session?.user.id;
		playerName = await (await supabase.auth.getUser()).data.user?.user_metadata.full_name;
		playerIconString = await (await supabase.auth.getUser()).data.user?.user_metadata.avatar_url;

		let { data, error } = await supabase
			.from('scores')
			.select('score')
			.eq('user_made_by', userGoogleId);
		// currentUser = Users;

		userScores = data!;
		//console.log(userScores);
	});

	async function addScore(time: number) {
		const { data, error } = await supabase.from('scores').insert([
			{
				user_made_by: userGoogleId,
				combo_one: 10,
				combo_two: 10,
				combo_three: 10,
				score: time
			}
		]);
		console.log('inserted');
	}
</script>

<img src={playerIconString} alt="your icon :)" width="100" />
<p>{playerName}</p>
<p>{userGoogleId}</p>

<ul>
	{#each userScores as { score }, i}
		<ol>
			{timeToString(score)}
		</ol>
	{/each}
</ul>

<!-- <button
	on:click={() => {
		addScore(10);
	}}>adds a score!</button
> -->
<style>
</style>
