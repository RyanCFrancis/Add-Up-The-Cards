<script lang="ts">
	import Card from './Card.svelte';
	import LaneBox from './LaneBox.svelte';
	import FinNums from './FinNums.svelte';
	import Popup from './Popup.svelte';
	import Timer from './Timer.svelte';

	import { get } from 'svelte/store';
	import { tutAppear, tutDone } from '../stores/stores';

	import { fly } from 'svelte/transition';

	import { supabase } from '$lib/supabaseClient';
	import { onMount } from 'svelte';

	//popup logic

	let tutoText =
		"Welcome to Ryan's Game! To start playing, click on a card and place it on one of the red boxes. Add the values of 3 cards to the given sum in each spot to win!";
	tutoText += ' Hint: You can only place 3 cards per spot';

	// let tAppear: boolean;
	// tutAppear.subscribe((val) => {
	// 	tAppear = val;
	// });

	//const hintText = 'Hint: You can only place a max of 3 cards per spot in normal mode';

	// let hAppear: boolean;
	// tutAppear.subscribe((val) => {
	// 	hAppear = val;
	// });

	if (!get(tutAppear)) {
		tutDone.set(true);
	}
	// if (get(tutAppear)) {
	// 	console.log('failure');
	// }
	//console.log('page load');

	const hardText = 'Hard mode has been enabled... Good Luck!';
	let hardAppear = false;

	const easyText = 'Easy mode has been enabled... Good Luck!';
	let easyAppear = false;

	let hardMode = false;

	let winText = 'Hey! You beat the game with a time of ';
	let winAppear = false;

	let timerActive = false;
	let timerVis = false;
	let currentTimeString = '';
	let timeStart: number;
	// timerEnd will be in milliseconds
	let timerEnd: number;

	//logic for red block appearing
	let isRedVisible = false;

	function showRed() {
		isRedVisible = true;
		setTimeout(() => {
			isRedVisible = false;
		}, 300);
	}

	let vWidth: number;
	const acceptableWidth = 700;
	//console.log(vWidth);

	//card logic
	type cardType = {
		val: number;
		spot: string;
	};

	type packType = {
		spot: string;
	};

	let currentCard: cardType;
	let removingLane: string;

	//sum of answers
	let firstANSSum: number;
	let secANSSum: number;
	let thirdANSSum: number;
	let sortedCombo: number[];

	let ansList: number[] = [];

	let isSolvedList: boolean[] = [false, false, false];

	const maxCombos = 13;
	let possibleCombo: number = Math.floor(Math.random() * maxCombos);
	//console.log(possibleCombo);

	//LEFT REFERS TO TOP
	//MID IS MID
	//RIGHT REFERS TO BOTTOM

	let leftLane = { spot: 'left' };
	let midLane = { spot: 'mid' };
	let rightLane = { spot: 'right' };
	let playHand = { spot: 'inHand' };

	let leftLaneCards: cardType[] = [];
	let midLaneCards: cardType[] = [];
	let rightLaneCards: cardType[] = [];

	//sum of the player sums
	let leftSum: number = 0;
	let midSum: number = 0;
	let rightSum: number = 0;

	let leftCount = 0;
	let midCount = 0;
	let rightCount = 0;

	let laneBoxesVisible = false;

	//fill up players hand which is a pack of cards
	let hand: cardType[] = [];
	for (let i = 0; i < 9; i++) {
		hand[i] = { val: i + 1, spot: 'inHand' };
	}

	var handCount = 9;

	let userGoogleId: any;

	function resetGame() {
		leftLaneCards = [];
		midLaneCards = [];
		rightLaneCards = [];
		for (let i = 0; i < 9; i++) {
			hand[i] = { val: i + 1, spot: 'inHand' };
		}

		//will let the steps to generate a predetermined code go through just to generate a new combo for hard mode
		let tempcombo: number = Math.floor(Math.random() * maxCombos);
		//console.log(tempcombo);
		if (tempcombo == possibleCombo) {
			while (tempcombo == possibleCombo) {
				tempcombo = Math.floor(Math.random() * maxCombos);
			}
		}
		possibleCombo = tempcombo;

		leftSum = 0;
		midSum = 0;
		rightSum = 0;
		isSolvedList = [false, false, false];
		timerActive = false;
		//need to refresh the wintext otherwise it compounds the times when the game is beaten
		winText = 'Hey! You beat the game with a time of ';
		timeStart = Date.now();
	}

	function addCardToPack(card: cardType, pack: packType) {
		//console.log(hand);
		//console.log(lane.spot.localeCompare('left'));
		if (pack.spot.localeCompare('inHand') === 0) {
			hand.push({ val: card.val, spot: 'inHand' });
			handCount++;
		} else if (pack.spot.localeCompare('left') === 0) {
			leftLaneCards.push({ val: card.val, spot: 'left' });
			leftCount++;
		} else if (pack.spot.localeCompare('mid') === 0) {
			midLaneCards.push({ val: card.val, spot: 'mid' });
			midCount++;
		} else if (pack.spot.localeCompare('right') === 0) {
			rightLaneCards.push({ val: card.val, spot: 'right' });
			rightCount++;
		}
	}

	function removeCardFromPack(movingCard: cardType) {
		if (!laneBoxesVisible) {
			return;
		}

		//REMOVE FROM HAND
		//console.log(removingLane);
		if (removingLane.localeCompare('inHand') == 0) {
			for (let i = 0; i < hand.length; i++) {
				if (hand[i].val === movingCard.val) {
					hand.splice(i, 1);
					handCount--;
					//console.log(pack.count);
					//console.log(playHand.count);
					//console.log(playHand.count);
				}
			}
			//console.log("hmm");
			return;
		}
		//REMOVE FROM LEFT LANE
		if (removingLane.localeCompare('left') == 0) {
			for (let i = 0; i < leftLaneCards.length; i++) {
				if (leftLaneCards[i].val == movingCard.val) {
					leftLaneCards.splice(i, 1);
					leftCount--;
				}
			}
			//console.log("hmm2");
			return;
		}
		//REMOVE FROM MIDDLE LANE
		if (removingLane.localeCompare('mid') == 0) {
			for (let i = 0; i < midLaneCards.length; i++) {
				if (midLaneCards[i].val == movingCard.val) {
					midLaneCards.splice(i, 1);
					midCount--;
				}
			}
			//console.log("hmm3");
			return;
		}
		//REMOVE FROM RIGHT LANE
		if (removingLane.localeCompare('right') == 0) {
			for (let i = 0; i < rightLaneCards.length; i++) {
				if (rightLaneCards[i].val == movingCard.val) {
					rightLaneCards.splice(i, 1);
					rightCount--;
				}
			}
			//console.log("hmm4");
			return;
		}
	}
	function nextClickTarget(card: cardType) {
		currentCard = { val: card.val, spot: 'limbo' };
	}

	function setCurrentLane(lane: string) {
		//anti bug
		if (!laneBoxesVisible) {
			return;
		}
		if (lane.localeCompare(removingLane) === 0) {
			showRed();
			return;
		}

		//max of 3 cards per lane excluding the player hand

		//card adding
		if (lane.localeCompare('inHand') === 0) {
			addCardToPack(currentCard, playHand);
		}
		if (lane.localeCompare('left') === 0) {
			if (leftLaneCards.length > 2 && !hardMode) {
				showRed();
				return;
			}
			addCardToPack(currentCard, leftLane);
		}

		if (lane.localeCompare('mid') === 0) {
			if (midLaneCards.length > 2 && !hardMode) {
				showRed();
				return;
			}
			addCardToPack(currentCard, midLane);
		}

		if (lane.localeCompare('right') === 0) {
			if (rightLaneCards.length > 2 && !hardMode) {
				showRed();
				return;
			}
			addCardToPack(currentCard, rightLane);
		}

		//card removals
		removeCardFromPack(currentCard);

		//reset to prior state and update the lane sums
		laneBoxesVisible = false;
		removingLane = '';

		updateSums();
	}

	//when you click on a card in your hand it toggles the lanes and changes the current card
	function cardClick(card: cardType, removingLane: packType) {
		laneBoxesVisible = true;
		nextClickTarget(card);
	}

	function updateSums() {
		//UPDATING SUMS ON THE RIGHT
		//reset the sums and re-add them
		leftSum = 0;
		midSum = 0;
		rightSum = 0;
		for (let i = 0; i < leftLaneCards.length; i++) {
			leftSum += leftLaneCards[i].val;
		}
		for (let i = 0; i < midLaneCards.length; i++) {
			midSum += midLaneCards[i].val;
		}
		for (let i = 0; i < rightLaneCards.length; i++) {
			rightSum += rightLaneCards[i].val;
		}
		//check if the player has beaten the game
		//checkWinOld();
		checkWinNew();
	}

	function checkWinOld() {
		//UPDATING SUMS AT THE TOP
		//check if any add up to the correct amount
		if (firstANSSum === leftSum) {
			isSolvedList[0] = true;
		} else {
			isSolvedList[0] = false;
		}
		if (secANSSum === midSum) {
			isSolvedList[1] = true;
		} else {
			isSolvedList[1] = false;
		}
		if (thirdANSSum === rightSum) {
			isSolvedList[2] = true;
		} else {
			isSolvedList[2] = false;
		}

		if (isSolvedList[0] && isSolvedList[1] && isSolvedList[2]) {
			gameWon();
		}
	}

	function checkWinNew() {
		ansList = [firstANSSum, secANSSum, thirdANSSum];
		for (let i = 0; i < ansList.length; i++) {
			if (leftSum == ansList[i]) {
				isSolvedList[i] = true;
			} else if (midSum == ansList[i]) {
				isSolvedList[i] = true;
			} else if (rightSum == ansList[i]) {
				isSolvedList[i] = true;
			} else isSolvedList[i] = false;
		}
		if (isSolvedList[0] && isSolvedList[1] && isSolvedList[2]) {
			if (hand.length == 0) {
				gameWon();
			}
		}
	}

	function gameWon() {
		console.log(sortedCombo);
		timerActive = false;
		timerVis = false;
		winText += currentTimeString;
		winAppear = true;
		addScore(timerEnd);
	}

	function resetTimer() {
		timerActive = true;
		timeStart = Date.now();
		if (vWidth > acceptableWidth) {
			timerVis = true;
		}
	}

	async function addScore(time: number) {
		const { data, error } = await supabase.from('Scores').insert([
			{
				user_made_by: userGoogleId,
				score: time,
				combo_one: sortedCombo[0],
				combo_two: sortedCombo[1],
				combo_three: sortedCombo[2]
			}
		]);
		alert('boop');
	}

	onMount(async () => {
		userGoogleId = await (await supabase.auth.getSession()).data.session?.user.id;
	});
</script>

<svelte:window bind:innerWidth={vWidth} />
<svelte:head>
	<title>Add Up The Cards!</title>
	<meta name="description" content="Add the cards up to the given totals!" />
	<meta name="keywords" content="Card,Game,Sum,Matching,Add" />
	<meta name="author" content="Ryan Francis" />
</svelte:head>
<!-- dump popups at the top of the html -->
{#if get(tutAppear)}
	<Popup
		contentText={tutoText}
		appear={get(tutAppear)}
		fn={() => {
			resetTimer();
			tutAppear.set(false);
		}}
	/>
{/if}

<Popup
	bind:contentText={winText}
	bind:appear={winAppear}
	fn={() => {
		resetGame();
		resetTimer();
	}}
/>

<Popup
	contentText={hardText}
	bind:appear={hardAppear}
	fn={() => {
		//resetGame();
		resetTimer();
	}}
/>

<Popup
	contentText={easyText}
	bind:appear={easyAppear}
	fn={() => {
		//resetGame();
		resetTimer();
	}}
/>

{#if get(tutDone) && vWidth > acceptableWidth}
	<Popup
		contentText={'The Timer will start after Closing out This Popup'}
		appear={true}
		fn={() => {
			resetTimer();
		}}
	/>
{/if}
<!-- red flash if you do something not allowed -->
{#if isRedVisible}
	<div class="redBlock" />
{/if}

<!-- Timer -->

<Timer bind:currentTimeString bind:timeStart bind:timerVis bind:currentTime={timerEnd} />

<!-- sums needed at the top -->
{#key possibleCombo}
	<FinNums
		{hardMode}
		bind:sortedCombo
		bind:firstNum={firstANSSum}
		bind:secNum={secANSSum}
		bind:thirdNum={thirdANSSum}
		isTrueList={isSolvedList}
	/>
{/key}
<!-- player return to hand button -->
<div
	class="handBox"
	on:click={() => {
		setCurrentLane('inHand');
	}}
	on:keypress={() => {}}
>
	<LaneBox pos={'inHand'} isVisible={laneBoxesVisible} />
</div>
<!-- player hand -->
<div class="hand">
	{#key handCount}
		{#each hand as q (q)}
			<div>
				<div
					on:click={() => {
						removingLane = 'inHand';
						cardClick(q, playHand);
					}}
					on:keypress={() => {}}
				>
					<Card cardValue={q.val} />
				</div>
			</div>
		{/each}
	{/key}
</div>

<!-- sums that go on the right side of the screen -->
<div class="num left">Sum: {leftSum}</div>
<div class="num mid">Sum: {midSum}</div>
<div class="num right">Sum: {rightSum}</div>

<!-- boxes to place in the lanes and the lanes themselves -->

<div class="horizontal left">
	<div
		on:click={() => {
			setCurrentLane('left');
		}}
		on:keypress={() => {}}
	>
		<LaneBox pos={'left'} isVisible={laneBoxesVisible} />
	</div>
	{#key leftCount}
		{#each leftLaneCards as q (q)}
			<div
				in:fly={{ y: -70 }}
				on:click={() => {
					removingLane = 'left';
					cardClick(q, leftLane);
				}}
				on:keypress={() => {}}
			>
				<Card cardValue={q.val} />
			</div>
		{/each}
	{/key}
</div>

<div class="horizontal mid">
	<div on:click={() => setCurrentLane('mid')} on:keypress={() => {}}>
		<LaneBox pos={'mid'} isVisible={laneBoxesVisible} />
	</div>
	{#key midCount}
		{#each midLaneCards as q (q)}
			<div
				in:fly={{ y: -70 }}
				on:click={() => {
					removingLane = 'mid';
					cardClick(q, midLane);
				}}
				on:keypress={() => {}}
			>
				<Card cardValue={q.val} />
			</div>
		{/each}
	{/key}
</div>

<div class="horizontal right">
	<div on:click={() => setCurrentLane('right')} on:keypress={() => {}}>
		<LaneBox pos={'mid'} isVisible={laneBoxesVisible} />
	</div>
	{#key rightCount}
		{#each rightLaneCards as q (q)}
			<div
				in:fly={{ y: -70 }}
				on:click={() => {
					removingLane = 'right';
					cardClick(q, rightLane);
				}}
				on:keypress={() => {}}
			>
				<Card cardValue={q.val} />
			</div>
		{/each}
	{/key}
</div>

<!-- optional desktop toggle mode button -->
{#if !hardMode && vWidth > acceptableWidth}
	<button
		style="position:absolute; bottom:2%; right:8%;"
		on:click={() => {
			hardAppear = true;
			hardMode = true;
			resetGame();
			//console.log("post click hard", hardAppear, hardMode);
		}}>Change to Desktop Hard Mode</button
	>
{/if}

{#if hardMode && vWidth > acceptableWidth}
	<button
		style="position:absolute; bottom:2%; right:8%;"
		on:click={() => {
			easyAppear = true;
			hardMode = false;
			resetGame();
			//console.log("post click easy", easyAppear, hardMode);
		}}>Change to Normal Mode</button
	>
{/if}

<style>
	/* nums means style for the sums */
	.num {
		color: beige;
		left: 85vw;
		font-size: large;
	}

	.num.left {
		position: absolute;
		bottom: 75vh;
		transform: translateX(-50%);
	}

	.num.mid {
		position: absolute;
		bottom: 55vh;
		transform: translateX(-50%);
	}
	.num.right {
		position: absolute;
		bottom: 35vh;
		transform: translateX(-50%);
	}

	/* horizontals are styles for the laneboxes */
	.horizontal {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		position: absolute;
		overflow: visible;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;

		left: 5%;

		width: auto;
	}
	.horizontal.left {
		position: absolute;
		bottom: 70vh;
	}
	.horizontal.mid {
		position: absolute;
		bottom: 50vh;
	}
	.horizontal.right {
		position: absolute;
		bottom: 30vh;
	}

	.handBox {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		position: absolute;
		overflow: visible;
		left: 5%;
		bottom: 1.5%;
	}

	.hand {
		width: auto;
		height: auto;

		max-width: 90vw;
		max-height: 50vh;

		display: flex;
		flex-direction: row;
		flex-wrap: wrap;

		position: absolute;
		bottom: 1.5%;
		left: 50%;
		transform: translateX(-50%);
	}

	.redBlock {
		position: relative;
		top: 0%;
		left: 0%;
		width: 100vw;
		height: 100vh;
		background: rgba(202, 15, 15, 0.281);
		z-index: 10;
	}
</style>
