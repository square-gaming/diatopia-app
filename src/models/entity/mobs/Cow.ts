import { Facing } from "../../../types";
import { Coordinate } from "../../../types/models";
import Mob from "./Mob";

class Cow extends Mob {
    constructor({ name, layer, pos, aspect, isConcrete, id, motion, facing, mass, health, attributes }: {
        name: string;
        layer: number;
        pos: Coordinate;
        aspect: Coordinate;
        isConcrete: boolean;
        id: string;
        motion: Coordinate;
        facing: Facing;
        mass: number;
        health: number;
        attributes: any[];
    }) {
        super({ name, layer, pos, aspect, isConcrete, id, motion, facing, mass, health, attributes });
    }
}

export default Cow;