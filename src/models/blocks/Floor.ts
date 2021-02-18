import { Coordinate } from "../../types/models";
import Block from "../../core/Block";

class Floor extends Block{
    static TYPES = {
        PLAIN: 0,
        TILE: 1
    };
    static PATTERNS = {
        INDIVIDUAL: 0,
        INTERSECTION: 1,
        HORIZONTAL: {
            LEFT: 2,
            MIDDLE: 3,
            RIGHT: 4
        },
        VERTICAL: {
            TOP: 5,
            MIDDLE: 6,
            BOTTOM: 7
        },
        GRID: {
            TOP_LEFT: 8,
            TOP_CENTER: 9,
            TOP_RIGHT: 10,
            MIDDLE_LEFT: 11,
            MIDDLE_CENTER: 12,
            MIDDLE_RIGHT: 13,
            BOTTOM_LEFT: 14,
            BOTTOM_CENTER: 15,
            BOTTOM_RIGHT: 16
        }
    };

    type: number;
    pattern: number;
    
    constructor({ name, layer, pos, aspect, isConcrete, type, pattern }: {
        name: string;
        layer: number;
        pos: Coordinate;
        aspect: Coordinate;
        isConcrete: boolean;
        type: number;
        pattern: number;
    }) {
        super({ name, layer, pos, aspect, isConcrete });
        this.type = type;
        this.pattern = pattern;
    }
}

export default Floor;