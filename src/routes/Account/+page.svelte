<script lang="ts">
	import { supabase } from '$lib/supabaseClient';
	import { onMount } from 'svelte';
	import type { AuthSession } from '@supabase/supabase-js';

	let playerIconString: string;
	let playerName: string;
	let userGoogleId: any;
	let userData: any[] = [];

	let scoreASC = false;
	let timeASC = true;

	onMount(async () => {
		userGoogleId = (await supabase.auth.getSession()).data.session?.user.id;
		playerName = await (await supabase.auth.getUser()).data.user?.user_metadata.full_name;
		playerIconString = await (await supabase.auth.getUser()).data.user?.user_metadata.avatar_url;

		let { data, error } = await supabase
			.from('scores')
			.select('score,combo_one,combo_two,combo_three,created_at')
			.eq('user_made_by', userGoogleId);

		userData = data!;
	});

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

	function sortByScores() {
		if (scoreASC) {
			userData.sort((a, b) => a.score - b.score);
		} else {
			userData.sort((a, b) => b.score - a.score);
		}
		scoreASC = !scoreASC;

		userData = userData;
	}
	function sortByTime() {
		if (timeASC) {
			userData.sort((a, b) => {
				const itemA = new Date(a.created_at).getTime();
				const itemB = new Date(b.created_at).getTime();
				if (itemA > itemB) {
					return 1;
				} else {
					return -1;
				}
			});
		} else {
			userData.sort((a, b) => {
				const itemA = new Date(a.created_at).getTime();
				const itemB = new Date(b.created_at).getTime();
				if (itemA > itemB) {
					return -1;
				} else {
					return 1;
				}
			});
		}
		timeASC = !timeASC;

		userData = userData;
	}

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

<table>
	<thead>
		<th on:click={() => sortByScores()}>Time</th>
		<th>Combination</th>
		<th on:click={() => sortByTime()}>Date + Time Made</th>
	</thead>
	<tbody
		>{#each userData as { score, combo_one, combo_two, combo_three, created_at }}
			<tr
				><td> {timeToString(score)}</td>
				<td
					>{combo_one}
					{combo_two}
					{combo_three}</td
				>
				<td>{new Date(created_at).toLocaleString()}</td>
			</tr>
		{/each}</tbody
	>
</table>

<!-- <button
	on:click={() => {
		addScore(10);
	}}>adds a score!</button
> -->
<style>
	table,
	th,
	td {
		border: 1px solid white;
		text-align: center;
	}
</style>
