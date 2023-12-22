<script lang="ts">
    import type { Cell } from "../interfaces/cell";
    import { Type } from "../interfaces/type";
    

    export let cell : Cell
    console.log(cell.score)
</script>




{#if cell.sunk}
    <div class="cell-sunk"> </div>
{:else if cell.hit && cell.ship != Type.none}
    <div class="cell-hit"> </div>

{:else if cell.hit }
    <div class="cell-miss"> </div>
{:else}
    <div class="cell" style={`background-color: rgb(calc(10.1 * ${cell.score}), calc(8.1 * ${cell.score}), ${cell.score})`}> </div>
{/if}

<style>
    .cell-hit {
        height: 40px;
        width: 40px;
        background-color: #ff0000; /* Red for hit cells */
        outline: 0.5px solid rgb(255, 255, 255);
    }
    .cell-sunk {
        height: 40px;
        width: 40px;
        background-color: #8c0000; /* Red for hit cells */
        outline: 0.5px solid rgb(255, 255, 255);
        &:after {
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            content: "\2715";
            font-size: 52px;
            color: #fff;
            line-height: 45px;
        }
    }

    .cell {
        height: 40px;
        width: 40px;
        outline: 0.5px solid rgb(255, 255, 255);
    }

    .cell-miss {
        height: 40px;
        width: 40px;
        background-color: #0014ad;
        outline: 0.5px solid rgb(255, 255, 255);

    }
</style>