<script lang="ts">
    import type { Ship } from "../interfaces/ship";
    import GridCell from "../components/Cell.svelte";
    import OwnGridCell from "../components/OwnCell.svelte";
    import type { Cell } from "../interfaces/cell";
    import { Type } from "../interfaces/type";
    import type { Position } from "../interfaces/position";
    let playerturn = true;
    let started = false;
    let errors : string[] = [];
    let playerShips : Ship[] = [
        { type: Type.carrier, size: 5, hits: [], location: [], sunk: false },
        { type: Type.battleship, size: 4, hits: [], location: [], sunk: false  },
        { type: Type.cruiser, size: 3, hits: [], location: [], sunk: false  },
        { type: Type.destroyer, size: 3, hits: [], location: [], sunk: false  },
        { type: Type.submarine, size: 2, hits: [], location: [], sunk: false  },
    ];

    let computerShips : Ship[] = [
        { type: Type.carrier, size: 5, hits: [], location: [], sunk: false },
        { type: Type.battleship, size: 4, hits: [], location: [], sunk: false  },
        { type: Type.cruiser, size: 3, hits: [], location: [], sunk: false  },
        { type: Type.destroyer, size: 3, hits: [], location: [], sunk: false  },
        { type: Type.submarine, size: 2, hits: [], location: [], sunk: false  },
    ];
    let defaultCell : Cell = { ship: Type.none, hit: false, score: 0 };
    let yourGrid : Cell[][] = Array.from({length: 10}, e => Array(10).fill(defaultCell));
    let opponentGrid : Cell[][] = Array.from({length: 10}, e => Array(10).fill(defaultCell));
    
    function reset() {
      errors = [];
      let playerturn = true;
      playerShips = [
        { type: Type.carrier, size: 5, hits: [], location: [], sunk: false },
        { type: Type.battleship, size: 4, hits: [], location: [], sunk: false  },
        { type: Type.cruiser, size: 3, hits: [], location: [], sunk: false  },
        { type: Type.destroyer, size: 3, hits: [], location: [], sunk: false  },
        { type: Type.submarine, size: 2, hits: [], location: [], sunk: false  },
    ];

    computerShips = [
        { type: Type.carrier, size: 5, hits: [], location: [], sunk: false },
        { type: Type.battleship, size: 4, hits: [], location: [], sunk: false  },
        { type: Type.cruiser, size: 3, hits: [], location: [], sunk: false  },
        { type: Type.destroyer, size: 3, hits: [], location: [], sunk: false  },
        { type: Type.submarine, size: 2, hits: [], location: [], sunk: false  },
    ];


      let defaultCell : Cell = { ship: Type.none, hit: false, score: 0 };
      yourGrid = Array.from({length: 10}, e => Array(10).fill(defaultCell));
      opponentGrid = Array.from({length: 10}, e => Array(10).fill(defaultCell));
    }


    function computerPossibleCoords(grid : Cell[][], ship : Ship, orientation : string) {
      let possibleCoords : Position[] = [];
      if(orientation == "up-down"){
        for(let x = 0; x < 10; x += 1){
          for(let y = 0; y < 10 - ship.size; y += 1){
            
            let okay : boolean = true;
            if(y > 0){
              if( grid[x][y - 1].ship != Type.none){
                okay = false;
              }
            }
            if(y + ship.size <= 9){
              if(grid[x][y + ship.size].ship != Type.none){
                okay = false;
              }
            }

            if(okay){
              for(let i = y; i < y + ship.size; i += 1 ){
                if(grid[x][i].ship != Type.none){
                    okay = false;
                    break;
                }
                if(x > 0){
                  if(grid[x-1][i].ship != Type.none){
                    okay = false;
                    break;
                  }
                }

                if(x < 9 ){
                  if(grid[x+1][i].ship != Type.none){
                    okay = false;
                    break;
                  }
                }
              }
            }
          
            if(okay) {
              possibleCoords.push({ col: x, row: y})
            }

          }
          
        }
      } else {
        for(let x = 0; x <= 10 - ship.size; x += 1){
          for(let y = 0; y < 10; y += 1){
            let okay : boolean = true;
            if(x > 0){
              if(grid[x - 1][y].ship != Type.none){
                 okay = false;
              }
            }

            if(x + ship.size <= 9){
              if(grid[x + ship.size][y].ship != Type.none){
                 okay = false;
              }
            }

            if(okay){
              for(let i = x; i < x + ship.size; i += 1 ){
                if(grid[i][y].ship != Type.none){
                  okay = false;
                  break;
                }
                if(y > 0){
                  if( grid[i][y-1].ship != Type.none){
                    okay = false;
                    break;
                  }
                }
               
                if(y < 9){
                  if(grid[i][y+1].ship != Type.none){
                    okay = false;
                    break;
                  }
                }
              }
            }
            if(okay) {
              possibleCoords.push({ col: x, row: y})
            }

          }
          
        }
      }


      return possibleCoords;
    }

    function placeShips(grid : Cell[][], ships : Ship[]){
      for(let i = 0; i < ships.length; i += 1){
        let orientation : string = "up-down"
        if(Math.random() > 0.5){
          orientation = "left-right"
        }

        let possibleCoords : Position[] = computerPossibleCoords(grid, ships[i], orientation);
        let finalCoord = possibleCoords[Math.floor(Math.random() * possibleCoords.length)]
        possibleCoords = []
        if(orientation == "left-right"){
          let y = finalCoord.row;
          for(let x = finalCoord.col; x < finalCoord.col + ships[i].size; x += 1){
            let newPosition : Position = {
              row: y,
              col: x
            }
            
            grid[x][y] = { ship: ships[i].type, hit: false, score: 0};

            ships[i].location.push(newPosition);
          }
        } else {  
          let x = finalCoord.col
          for(let y = finalCoord.row; y < finalCoord.row + ships[i].size; y += 1){
            let newPosition : Position = {
              row: y,
              col: x
            }
            
            grid[x][y] = { ship: ships[i].type, hit: false, score: 0};

            ships[i].location.push(newPosition);
          }
        }
      }
    }

    function start() {
      reset();
      started = true;
      placeShips(yourGrid, playerShips);
      placeShips(opponentGrid, computerShips);
    }


    let xCoord: number;
    let yCoord: number;

    function handleInput() {
      if(playerturn){
        
      }
    }
    

</script>


<main>
  


  <div class="game">
    <div class="board">
      <h2>Your Board:</h2>
      <div class="grid">
        
        <div class="row">
          <div class="coords">{" "}</div>
          {#each yourGrid[0] as _, j}
            <div class="coords">{j}</div>
          {/each}
        </div>

        <div class="column">
          {#each yourGrid as column, i}
            <div class="row">
              <div class= "coords">{i}</div> 
              {#each column as cell, j}
                <OwnGridCell {cell} />
              {/each}
            </div>
          {/each}
        </div>
      </div>
    </div>


      <div class="board">
        <h2>Opponent Board:</h2>
        <div class="grid">
          
          <div class="row">
            <div class="coords">{" "}</div>
            {#each opponentGrid[0] as _, j}
              <div class="coords">{j}</div>
            {/each}
          </div>

          <div class="column">
            {#each opponentGrid as column, i}
              <div class="row">
                <div class= "coords">{i}</div> 
                {#each column as cell}
                  <OwnGridCell {cell} />
                {/each}
              </div>
            {/each}
          </div>
        </div>
      </div>
      <div class="attack">
        <h4 class={ playerturn ? 'player-turn' : 'computer-turn'}> {#if playerturn == true} Your Turn {:else} Opponent's Turn {/if}</h4>
        <button class="start-button" on:click={start}>{#if started} Restart {:else} Start {/if}</button>
        <h1>Enter Coordinates To Fire At:</h1>
        <input bind:value={xCoord} placeholder="Enter Column"/>
        <input bind:value={yCoord} placeholder="Enter Row"/>
        <button class="shoot-button" on:click={handleInput}> FIRE! </button>
        <div class="error-box">
          <h3> Error Outputs:</h3>
          {#each errors as error}
            <p>> Error: {error}</p>
          {/each}
        </div>
      </div>
    </div>

</main>
  


<style>
    main {
      margin: 0.5rem;
    }
    .game {
      display: flex;
      justify-content: center;
      gap: 2rem
    }

    .board {
      display: flex;
      flex-direction: column;
      background-color: whitesmoke;
      padding: 0.75rem;
      outline: black solid 2px;
      border-radius: 5px;
    }
    .grid {
      outline: 1px solid black;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
    }
    .column{
        display:flex;
        flex-direction: row;
        gap: 1px;
    }

    .row{
        display:flex;
        flex-direction: column;
        gap: 1px;
    }

    .coords{
      height: 40px;
        width: 40px;
      background-color: #3a3a3a;
      outline: 0.5px solid rgb(106, 106, 106);
      text-align: center;
      vertical-align: middle;
      line-height: 50px;
      color: white
    }

    .attack{
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      padding:5px;
      border: 2px solid black;
      border-radius: 5px;;
    }
    
    input{
      padding: 10px;
    }
    .start-button {
      color: white;
      font-size: 1rem;
      font-weight: 900;
      padding: 5px;
      border: none;
      border-radius: 5px;
      background-color: blue;
    }
    .shoot-button {
      color: white;
      font-size: 1rem;
      font-weight: 900;
      padding: 8px;
      border: none;
      border-radius: 5px;
      background-color: red;
    }

    .shoot-button:hover {
      color: white;
      font-size: 1rem;
      font-weight: 900;
      padding: 8px;
      border: none;
      border-radius: 5px;
      background-color: rgb(181, 28, 28);
    }

    h1 {
      font-size: 1.4rem;
      font-weight: 900;
    }

    h2{
      font-family:'Courier New', Courier, monospace;
    }

    h4{
      font-family:'Courier New', Courier, monospace;
      text-align: center;
      font-size: 1.8rem;
      color: white;
      margin: 0px;
      padding: 15px;
      font-weight: 900;
      border-radius: 4px;
    }

  .player-turn{
    background-color: green;
  }

  .computer-turn{
    background-color: red;
  }

    p {
      font-family:'Courier New', Courier, monospace;
      font-size: 0.75rem;
      

    }
    .error-box {
      padding: 10px;
      max-height: 50vh;
      height: 25vh;
      background-color: rgb(171, 171, 171);
      border-radius: 10px;
      overflow-y: auto;
    }
</style>