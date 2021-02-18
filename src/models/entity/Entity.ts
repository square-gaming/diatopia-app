import Block from "../../core/Block";
import Vector from "../../math/Vector";
import { Facing } from "../../types";
import { EntityInterface, Coordinate } from "../../types/models";

abstract class Entity extends Block implements EntityInterface {
    id: string;
    facing: Facing;
    motion: Vector;

    constructor({ name, layer, pos, aspect, isConcrete, id, motion, facing }: {
        name: string;
        layer: number;
        pos: Coordinate;
        aspect: Coordinate;
        isConcrete: boolean;
        id: string;
        motion: Coordinate,
        facing: Facing
    }) {
        super({ name, layer, pos, aspect, isConcrete });
        this.id = id;
        this.name = name;
        this.facing = facing;
        this.motion = new Vector(motion);
    }
}

export default Entity;