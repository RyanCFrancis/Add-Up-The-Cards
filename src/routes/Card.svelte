<script lang="ts">
	import { flip } from 'svelte/animate';
	import CardLogo from './CardLogo.svelte';
	export let cardValue: number;

	// function oldPickMidText(int: number) {
	// 	switch (int) {
	// 		case 1:
	// 			return 'One';
	// 		case 2:
	// 			return 'two';
	// 		case 3:
	// 			return 'Three';
	// 		case 4:
	// 			return 'Four';
	// 		case 5:
	// 			return 'Five';
	// 		case 6:
	// 			return 'Six';
	// 		case 7:
	// 			return 'Seven';
	// 		case 8:
	// 			return 'Eight';
	// 		case 9:
	// 			return 'Nine';
	// 	}
	// }
</script>

<div>
	<div class="Card" tabindex="-1">
		<div class="topText">{cardValue}</div>
		<!-- <div class="middleText">{pickMidText(cardValue)}</div> -->
		<CardLogo cVal={cardValue} />
		<div class="botText">{cardValue}</div>
	</div>
</div>

<style>
	/*override for legacy browsers for aspect ratio */
	@supports not (aspect-ratio: 20 / 25) {
		.Card::before {
			float: left;
			padding-top: 80%;
			content: '';
		}

		.Card::after {
			display: block;
			content: '';
			clear: both;
		}
	}
	.Card {
		aspect-ratio: 20/25;

		width: 75px;
		height: auto;

		min-width: auto;

		max-width: 12vw;
		max-height: auto;

		border-style: double;
		border-color: black;
		border-width: 4px;
		border-radius: 12px;

		color: rgb(0, 0, 0);
		position: relative;
		display: flex;
		flex-basis: 50%;
		background-color: white;
	}

	.Card:hover {
		transform: translateY(-8px);
	}

	.Card:focus {
		/* filter: brightness(0.5); */
		background-color: aquamarine;
	}

	.topText {
		position: absolute;
		top: 3.25px;
		left: 5px;
		font-size: calc(2.4vh);
	}
	/* .middleText {
		position: absolute;
		text-align: center;
		align-self: center;
		font-size: 1.5vw;
		left: 50%;
		transform: translateX(-50%);
		font-style: italic;
	} */
	.botText {
		position: absolute;
		right: 5px;
		bottom: 3.25px;
		font-size: calc(2.4vh);
	}
</style>
