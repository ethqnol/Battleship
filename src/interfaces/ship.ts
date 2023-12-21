import type { Position } from "./position";
import type { Type } from "./type";


export interface Ship {
    type: Type;
    sunk: boolean;
    location: Position[];
    size: number;
    hits: Position[];
}