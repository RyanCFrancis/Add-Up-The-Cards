<script lang="ts">
  export let rando: number;

  // export let is1Solved = false;
  // export let is2Solved = false;
  // export let is3Solved = false;

  export let firstNum: number;
  export let secNum: number;
  export let thirdNum: number;
  export let hardMode: boolean;

  export let isTrueList: boolean[] = [];

  export function generateCombo() {
    if (!hardMode) {
      let potentTrios: number[][] = [
        [24, 6, 15],
        [7, 22, 16],
        [21, 13, 11],
        [14, 15, 16],
        [15, 18, 12],
        [13, 24, 8],
        [15, 17, 13],
        [16, 18, 11],
        [19, 20, 6],
        [14, 19, 12],
        [22, 10, 13],
        [10, 23, 12],
        [13, 9, 23],
      ];

      firstNum = potentTrios[rando][0];
      secNum = potentTrios[rando][1];
      thirdNum = potentTrios[rando][2];
    } else if (hardMode) {
      const total = 45;
      const randomInt = 15;
      firstNum = Math.floor(Math.random() * (total - randomInt - 5) + 5);
      secNum = Math.floor(Math.random() * (total - firstNum - 5) + 5);
      thirdNum = total - firstNum - secNum;

      if (firstNum + secNum + thirdNum != 45) {
        alert("error has occurred");
      }
    }
  }
  generateCombo();
</script>

<div class="container">
  <div class="potNums">Sums Needed:</div>
  <div class={isTrueList[0] == true ? "potNums Done" : "potNums NotDone"}>
    {firstNum}
  </div>
  <div class="potNums">,</div>
  <div class={isTrueList[1] == true ? "potNums Done" : "potNums NotDone"}>
    {secNum}
  </div>
  <div class="potNums">,</div>
  <div class={isTrueList[2] == true ? "potNums Done" : "potNums NotDone"}>
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
