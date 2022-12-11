<script lang="ts">
  import { onDestroy } from "svelte";

  export let timeStart = Date.now();
  let seconds = 0;
  let milliseconds = 0;
  let currentTime = timeStart - Date.now();
  export let currentTimeString = "";

  let interval = setInterval(() => {
    currentTime = Date.now() - timeStart;
    seconds = Math.floor(currentTime / 1000);
    milliseconds = currentTime % 1000;
    currentTimeString = seconds + "." + milliseconds + " seconds";
    console.log(currentTimeString);
    if (seconds >= 60) {
      currentTimeString = "You are a Slowpoke!";
    }
  }, 1);

  onDestroy(() => {
    clearInterval(interval);
  });
</script>

<div class="timer">{"Time: " + currentTimeString}</div>

<style>
  .timer {
    position: absolute;
    top: 10%;
    left: 50%;
    transform: translateX(-50%);
    font-size: 24px;
    overflow: hidden;
    white-space: nowrap;
  }
</style>
