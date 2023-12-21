import type { Position } from "./position";

export interface Ship {
    type: string;
    sunk: boolean;
    location: Position[];
    size: number;
    hits: Position[];
}