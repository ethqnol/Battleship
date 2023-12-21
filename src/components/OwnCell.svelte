<script lang="ts">
    import type { Cell } from "../interfaces/cell";

    let cell : Cell = {
        ship: false,
        hit: false,
        score: 0
    }

</script>

{#if cell.hit == true && cell.ship == true}
    <div class="cell-hit"> </div>

{:else if cell.hit == true && cell.ship == false}
    <div class="cell-miss"> </div>   

{:else}
    {#if cell.hit == false && cell.ship == true}
        <div class="cell-ship"></div>

    {:else}
        <div class="cell-empty"></div>

    {/if}
{/if}

<style>
    .cell-empty {
        height: 50px;
        width: 50px;
        background-color: #5c93e5;
        outline: 0.5px solid black;
    }

    .cell-hit {
        height: 50px;
        width: 50px;
        background-color: #ff0000;
        outline: 0.5px solid black;
    }

    .cell-miss {
        height: 50px;
        width: 50px;
        background-color: #000000;
        outline: 0.5px solid black;
    }

    .cell-miss {
        height: 50px;
        width: 50px;
        background-color: #676767;
        outline: 0.5px solid black;
    }
</style>