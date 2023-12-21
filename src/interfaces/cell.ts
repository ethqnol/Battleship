import type { Type } from "./type";


export interface Cell {
    ship: Type;
    hit: boolean;
    score: number
}