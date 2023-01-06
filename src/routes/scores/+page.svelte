<script lang="ts">
	import { supabase } from '$lib/supabaseClient';
	import { onMount } from 'svelte';

	let scoreASC = false;
	let timeASC = true;
	let userData: any[] = [];
	let names: any[] = [];

	onMount(async () => {
		getScores();
		getNames();
	});

	async function getScores() {
		let { data, error } = await supabase
			.from('scores')
			.select('score,combo_one,combo_two,combo_three,created_at,user_made_by')
			.order('score', { ascending: true });

		userData = data!;
	}
	async function getNames() {
		let { data, error } = await supabase.from('profiles').select('id,full_name');

		names = data!;
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
</script>

<h2>High Scores</h2>
<table>
	<thead>
		<th on:click={() => sortByScores()}>Time</th>
		<th>Combination</th>
		<th>Player</th>
		<th on:click={() => sortByTime()}>Date + Time Made</th>
	</thead>
	<tbody
		>{#each userData as { score, combo_one, combo_two, combo_three, created_at, user_made_by }}
			<tr
				><td> {timeToString(score)}</td>
				<td
					>{combo_one}
					{combo_two}
					{combo_three}</td
				>
				<td>{user_made_by}</td>
				<td>{new Date(created_at).toLocaleString()}</td>
			</tr>
		{/each}</tbody
	>
</table>

<style>
	h2 {
		text-align: center;
	}

	table,
	th,
	td {
		border: 1px solid white;
		text-align: center;
	}
</style>
