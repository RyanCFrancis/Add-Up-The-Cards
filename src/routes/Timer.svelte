<script lang="ts">
	import { onDestroy } from 'svelte';

	export let timerVis: boolean;
	export let timeStart = Date.now();
	let seconds = 0;
	let milliseconds = 0;
	let minutes = 0;
	export let currentTime = timeStart - Date.now();
	export let currentTimeString = '';

	let interval = setInterval(() => {
		currentTime = Date.now() - timeStart + 50000;

		//first if is if the timer is past 1.59 seconds
		//the else if is for greater than 1 minute but less than 2
		//the last else is for less than 1 minute
		if (currentTime >= 120000) {
			minutes = Math.floor(currentTime / 60000);
			seconds = Math.floor(currentTime / 1000) - minutes * 60;
			milliseconds = currentTime % 1000;
			currentTimeString = minutes + ' minutes and ' + seconds + '.' + milliseconds + ' seconds';
		} else if (currentTime >= 60000 && currentTime < 120000) {
			minutes = Math.floor(currentTime / 60000);
			seconds = Math.floor(currentTime / 1000) - minutes * 60;
			milliseconds = currentTime % 1000;
			currentTimeString = minutes + ' minute and ' + seconds + '.' + milliseconds + ' seconds';
		} else {
			seconds = Math.floor(currentTime / 1000);
			milliseconds = currentTime % 1000;
			currentTimeString = seconds + '.' + milliseconds + ' seconds';
		}
	}, 1);

	function convertTime(time: number) {}

	onDestroy(() => {
		clearInterval(interval);
	});
</script>

<div class={timerVis === true ? 'timerTrue' : 'timerFalse'}>{'Time: ' + currentTimeString}</div>

<style>
	.timerTrue {
		visibility: visible;
		position: absolute;
		top: 10%;
		left: 50%;
		transform: translateX(-50%);
		font-size: 24px;
		overflow: hidden;
		white-space: nowrap;
	}
	.timerFalse {
		visibility: hidden;
		position: absolute;
		top: 10%;
		left: 50%;
		transform: translateX(-50%);
		font-size: 24px;
		overflow: hidden;
		white-space: nowrap;
	}
</style>
