<script lang="ts">
	console.log('test');
	export let data: any;
	console.log(data);

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
	<img
		src={data.playerIconString}
		alt="Your icon"
		width="100"
		style="transform: translateX(-50%);
		left: 50%;
		position: relative;"
	/>
	<p
		style="transform: translateX(-50%);
		left: 50%;
		position: relative; text-align: center;"
	>
		{data.playerName}
	</p>

	<table>
		<thead>
			<th>Time</th>
			<th>Combination</th>
			<th>Date + Time Made</th>
		</thead>
		<tbody
			>{#each data.scores as { score, combo_one, combo_two, combo_three, created_at }}
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
</main>

<style>
	main {
		transform: translateX(-50%);
		left: 50%;
		position: absolute;
	}
</style>
