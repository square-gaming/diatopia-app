import Structure from './Structure';
import { WallInterface, Coordinate } from '../../../types/models';

class Wall extends Structure implements WallInterface {
    static PATTERNS = {
        INDIVIDUAL: 0,
        SURFACE: 1,
        INTERSECTION: 2,
        NORTH_SOUTH: 3,
        EAST_WEST: 4,
        T: 5,
        T_90_DEG: 6,
        T_180_DEG: 7,
        T_270_DEG: 8,
        TOP_LEFT: 9,
        TOP_RIGHT: 10,
        BOTTOM_LEFT: 11,
        BOTTOM_RIGHT: 12
    }

    constructor({ id, layer, pos, aspect, isConcrete, type, pattern, frames }: {
        id: string;
        layer: number;
        pos: Coordinate;
        aspect: Coordinate;
        isConcrete: boolean;
        type: number;
        pattern: number;
        frames: {
            start: Coordinate;
            end: Coordinate;
        }[]
    }) {
        super({
            id,
            layer,
            pos,
            aspect,
            isConcrete,
            type,
            pattern,
            frames
        });
    }
}

export default Wall;