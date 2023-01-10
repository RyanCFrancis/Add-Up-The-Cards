<script lang="ts">
	console.log('test');
	export let data: any;
	console.log(data);
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
</main>
