import { Facing } from "../../../types";
import { Coordinate } from "../../../types/models";
import Mob from "./Mob";

class Sheep extends Mob {
    constructor({ name, layer, pos, aspect, isConcrete, id, facing, rotation, speed, mass, health, attributes, motion }: {
        name: string;
        layer: number;
        pos: Coordinate;
        aspect: Coordinate;
        isConcrete: boolean;
        id: string;
        facing: Facing;
        rotation: number;
        speed: number;
        mass: number;
        health: number;
        attributes: any[];
        motion: Coordinate;
    }) {
        super({ name, layer, pos, aspect, isConcrete, id, facing, rotation, speed, mass, health, attributes, motion });
    }
}

export default Sheep;