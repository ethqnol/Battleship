<script lang="ts">
    import type { Ship } from "../interfaces/ship";
    import GridCell from "../components/Cell.svelte";
    import type { Cell } from "../interfaces/cell";
    let playerShips : Ship[] = [
        { type: "carrier", size: 5, hits: [], location: [], sunk: false },
        { type: "battleship", size: 4, hits: [], location: [], sunk: false  },
        { type: "cruiser", size: 3, hits: [], location: [], sunk: false  },
        { type: "submarine", size: 3, hits: [], location: [], sunk: false  },
        { type: "destroyer", size: 2, hits: [], location: [], sunk: false  },
    ];

    let computerShips : Ship[] = [
        { type: "carrier", size: 5, hits: [], location: [], sunk: false },
        { type: "battleship", size: 4, hits: [], location: [], sunk: false  },
        { type: "cruiser", size: 3, hits: [], location: [], sunk: false  },
        { type: "submarine", size: 3, hits: [], location: [], sunk: false  },
        { type: "destroyer", size: 2, hits: [], location: [], sunk: false  },
    ];
    let defaultCell : Cell = { ship: false, hit: false, score: 0 };
    let grid : Cell[][] = new Array(10).fill(new Array(10).fill(defaultCell))
    
</script>


<main>
    
    <div class="board">
      <h2>BattleShip :0</h2>
      <div class="grid">
        <div class="row">
          <div class="coords">{" "}</div>
          {#each grid[0] as _, j}
            <div class="coords">{j}</div>
          {/each}
        </div>

        <div class="column">
          {#each grid as column, i}
            <div class="row">
              <div class= "coords">{i}</div> 
              {#each column as cell, j}
                <GridCell {cell} />
              {/each}
            </div>
          {/each}
        </div>
      </div>
    </div>

</main>
  


<style>
    .grid {
      outline: 1px solid black;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
    .column{
        display:flex;
        flex-direction: column;
        gap: 1px;
    }

    .row{
        display:flex;
        flex-direction: row;
        gap: 1px;
    }

    .coords{
      height: 50px;
      width: 50px;
      background-color: #d5d5d5;
      outline: 0.5px solid black;
      text-align: center;
      vertical-align: middle;
      line-height: 50px;
    }
</style>