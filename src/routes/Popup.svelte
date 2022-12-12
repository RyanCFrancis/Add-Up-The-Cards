<script lang="ts">
	import { fade, fly } from 'svelte/transition';

	export let appear: boolean;
	export let contentText: string;
	export let fn: Function;
	let classType = '';

	function closeOut() {
		appear = false;
		fn();
	}
</script>

{#if appear}
	<div class="contBG">
		<div class="cont" in:fade>
			<div class={classType}>{contentText}</div>
			<button
				class="closeButton"
				on:click={() => {
					closeOut();
				}}>close this popup</button
			>
		</div>
	</div>
{/if}

<style>
	.contBG {
		position: relative;
		top: 0%;
		left: 0%;
		width: 100vw;
		height: 100vh;
		background: rgba(0, 0, 0, 0.55);
		z-index: 2;
		overflow: visible;
	}

	.cont {
		position: absolute;
		left: 30%;
		bottom: 40%;
		width: auto;
		max-width: 40vw;
		padding: 1%;
		overflow: visible;

		background-color: rgb(165, 81, 32);
		color: rgb(245, 245, 245);
		z-index: 3;
	}

	/* .closeButton {
  } */
</style>
