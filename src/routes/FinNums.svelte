<script lang="ts">
	import { onMount } from 'svelte';

	//export let rando: number;

	export let firstNum = 0;
	export let secNum = 0;
	export let thirdNum = 0;
	export let hardMode: boolean;
	export let sortedCombo: number[] = [];
	export let isTrueList: boolean[] = [];

	export function generateCombo() {
		if (!hardMode) {
			let cards: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];
			let count: number = 0;
			let currentIndex = 0;

			//reset to 0 for future playthroughs of the game
			firstNum = 0;
			secNum = 0;
			thirdNum = 0;
			//first number
			while (count < 3) {
				currentIndex = Math.floor(Math.random() * (cards.length - 1) + 1);
				firstNum += cards[currentIndex];
				cards.splice(currentIndex, 1);
				count++;
			}
			count = 0;
			//second number
			while (count < 3) {
				currentIndex = Math.floor(Math.random() * (cards.length - 1) + 1);
				secNum += cards[currentIndex];
				cards.splice(currentIndex, 1);
				count++;
			}
			count = 0;
			//third number
			while (count < 3) {
				currentIndex = Math.floor(Math.random() * (cards.length - 0) + 0);
				thirdNum += cards[currentIndex];
				cards.splice(currentIndex, 1);
				count++;
			}
			count = 0;

			if (firstNum + secNum + thirdNum != 45) {
				alert('error: the totals dont add up');
			}
		} else if (hardMode) {
			const total = 45;
			const randomInt = 15;
			firstNum = Math.floor(Math.random() * (total - randomInt - 5) + 5);
			secNum = Math.floor(Math.random() * (total - firstNum - 5) + 5);
			thirdNum = total - firstNum - secNum;

			if (firstNum + secNum + thirdNum != 45) {
				alert("the sums can't be solved");
			}
		}
		//set the array to some initial values;
		sortedCombo[0] = firstNum;
		sortedCombo[1] = secNum;
		sortedCombo[2] = thirdNum;
		let tempValue: number;
		//sort the combo in numeric order for exporting to the database for the high scores using bubble sort
		for (let i = 0; i < sortedCombo.length; i++) {
			for (let j = 0; j < sortedCombo.length - 1 - i; j++) {
				if (sortedCombo[j] > sortedCombo[j + 1]) {
					tempValue = sortedCombo[j];
					sortedCombo[j] = sortedCombo[j + 1];
					sortedCombo[j + 1] = tempValue;
				}
			}
		}

		if (firstNum === secNum || secNum === thirdNum || thirdNum === firstNum) {
			generateCombo();
		}
	}
	onMount(() => {
		generateCombo();
	});
</script>

<div class="container">
	<div class="potNums">Sums Needed:</div>
	<div class={isTrueList[0] == true ? 'potNums Done' : 'potNums NotDone'}>
		{firstNum}
	</div>
	<div class="potNums">,</div>
	<div class={isTrueList[1] == true ? 'potNums Done' : 'potNums NotDone'}>
		{secNum}
	</div>
	<div class="potNums">,</div>
	<div class={isTrueList[2] == true ? 'potNums Done' : 'potNums NotDone'}>
		{thirdNum}
	</div>
</div>

<style>
	.container {
		position: absolute;
		top: 2%;
		left: 50%;
		transform: translateX(-50%);
		font-size: 24px;
		overflow: hidden;
		white-space: nowrap;
	}

	.potNums {
		display: inline-block;
		position: relative;
		color: rgb(235, 218, 199);
	}

	.potNums.NotDone {
		color: rgb(235, 218, 199);
	}

	.potNums.Done {
		color: rgb(156, 255, 64);
	}
</style>
