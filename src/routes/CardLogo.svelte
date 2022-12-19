<script lang="ts">
	export let cVal: number;
	let logoURL: string;
	logoURL = '/' + cVal;
	logoURL += '_Tri.svg';
</script>

<img src={logoURL} class="logo" alt="text" />

<style>
	.logo {
		position: absolute;
		text-align: center;
		align-self: center;
		font-size: 1.5vw;
		left: 50%;
		transform: translateX(-50%);
		font-style: italic;
	}
</style>
