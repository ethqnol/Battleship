<script lang="ts">
    import type { Cell } from "../interfaces/cell";
    import { Type } from "../interfaces/type";
    

    export let cell : Cell
</script>


{#if cell.sunk == true}
    <div class="cell-sunk"> </div>
{:else if cell.hit == true && cell.ship !=  Type.none}
    <div class="cell-hit"> </div>

{:else if cell.hit == true && cell.ship == Type.none}
    <div class="cell-miss"> </div>   

{:else}
    {#if cell.hit == false && cell.ship !=  Type.none}
        <div class="cell-ship"></div>

    {:else}
        <div class="cell-empty"></div>

    {/if}
{/if}

<style>
    .cell-sunk{
        height: 40px;
        width: 40px;
        background-color: #851010;
        outline: 0.5px solid rgb(255, 255, 255);
    }
    .cell-empty {
        height: 40px;
        width: 40px;
        background-color: #5c93e5;
        outline: 0.5px solid rgb(255, 255, 255);
    }

    .cell-hit {
        height: 40px;
        width: 40px;
        background-color: #ff0000;
        outline: 0.5px solid rgb(255, 255, 255);
    }

    .cell-miss {
        height: 40px;
        width: 40px;
        background-color: #727272;
        outline: 0.5px solid rgb(255, 255, 255);
    }

    .cell-ship {
        height: 40px;
        width: 40px;
        background-color: #b8b8b8;
        outline: 0.5px solid rgb(255, 255, 255);
    }
</style>