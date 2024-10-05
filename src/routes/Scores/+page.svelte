<script lang="ts">
	import { supabase } from '$lib/supabaseClient';
	import { onMount } from 'svelte';

	let scoreASC = false;
	let timeASC = true;
	let userData: any[] = [];
	let timeSortString = '↨';

	onMount(async () => {
		const { data, error } = await supabase
			.from('scores')
			.select('score,combo_one,combo_two,combo_three,created_at,profiles (full_name,avatar_url,id)')
			.order('score', { ascending: true });

		userData = data!;
		console.log(userData);
	});

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
		userData.sort((a, b) => {
			// if time is ascending leave the same order
			// if time is not, multipy the return to reverse the order
			let timeASCMultiplier = timeASC ? 1 : -1;
			const itemA = new Date(a.created_at).getTime();
			const itemB = new Date(b.created_at).getTime();
			if (itemA > itemB) {
				return 1 * timeASCMultiplier;
			} else {
				return -1 * timeASCMultiplier;
			}
		});
		timeASC = !timeASC; // toggle state for next time the button is pushed
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

<main>
	<h2>High Scores</h2>
	<table class="tableClass">
		<thead>
			<th on:click={() => sortByScores()}>Time {timeSortString}</th>
			<th>Combination</th>
			<th>Player</th>
			<th on:click={() => sortByTime()}>Date + Time Made</th>
		</thead>
		<tbody
			>{#each userData as { score, combo_one, combo_two, combo_three, created_at, profiles }}
				<tr
					><td> {timeToString(score)}</td>
					<td
						>{combo_one}
						{combo_two}
						{combo_three}</td
					>
					<td><a href="Profile/{profiles.id}">{profiles.full_name}</a></td>
					<td>{new Date(created_at).toLocaleString()}</td>
				</tr>
			{/each}</tbody
		>
	</table>
</main>

<style>
	main {
		transform: translateX(-50%);
		left: 50%;
		position: absolute;
	}
	h2 {
		text-align: center;
	}
</style>
