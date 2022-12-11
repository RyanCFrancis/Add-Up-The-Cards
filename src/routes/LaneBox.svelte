<script lang="ts">
  export let pos: string;
  export let isVisible: boolean;

  function posStr() {
    return pos;
  }
</script>

<div
  class={isVisible === true ? "lane visible" : "lane hidden"}
  on:click={posStr}
  on:keypress={() => {}}
>
  Click here to place a card
</div>

<style>
  @supports not (aspect-ratio: 20 / 25) {
    .lane::before {
      float: left;
      padding-top: 80%;
      content: "";
    }

    .lane::after {
      display: block;
      content: "";
      clear: both;
    }
  }
  .lane {
    aspect-ratio: 20/25;
    width: 75px;
    height: auto;

    max-width: 16vw;
    max-height: auto;

    border-radius: 12px;
    border-style: dashed;

    text-align: center;
  }
  .lane.visible {
    color: red;
  }

  .lane.hidden {
    color: transparent;

    visibility: hidden;
  }
</style>
