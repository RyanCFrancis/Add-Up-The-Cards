<script>
	import './styles.css';
</script>

<head />

<div class="app">
	<slot />
</div>
{#if window.innerWidth > 700}
	<div>
		<a href="/" class="game">Game</a>
		<a href="/scores" class="scores">High Scores</a>
	</div>
{/if}

<style>
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	.scores {
		position: absolute;
		top: 10%;
		right: 5%;
	}
	.game {
		position: absolute;
		top: 5%;
		right: 5%;
	}
</style>
