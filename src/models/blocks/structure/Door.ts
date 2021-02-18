import Structure from './Structure';
import { DoorInterface, Coordinate } from '../../../types/models';
import { Toward } from '../../../types';

class Door extends Structure implements DoorInterface {
    static TYPE = {
        WOOD: 0,
        STONE: 1
    }
    static PATTERNS = {
        NORTH_SOUTH: 0,
        EAST_WEST: 1
    }

    toward: Toward;
    isOpen: boolean;

    constructor({
        name,
        layer,
        pos,
        aspect,
        isConcrete,
        type,
        pattern,
        frames,
        toward,
        isOpen,
    }: {
        name: string;
        layer: number;
        pos: Coordinate;
        aspect: Coordinate;
        isConcrete: boolean;
        type: number;
        pattern: number;
        toward: Toward;
        isOpen: boolean;
        frames: {
            start: Coordinate;
            end: Coordinate;
        }[]
    }) {
        super({
            name,
            layer,
            pos,
            aspect,
            isConcrete,
            type,
            pattern,
            frames
        });
        this.toward = toward;
        this.isOpen = isOpen;
    }

}

export default Door;