import Block from "../../core/Block";
import Vector from "../../math/Vector";
import { Facing } from "../../types";
import { EntityInterface, Coordinate } from "../../types/models";

abstract class Entity extends Block implements EntityInterface {
    id: string;
    facing: Facing;
    rotation: number;
    speed: number;
    motion: Vector;

    constructor({ name, layer, pos, aspect, isConcrete, id, facing, rotation, speed, motion }: {
        name: string;
        layer: number;
        pos: Coordinate;
        aspect: Coordinate;
        isConcrete: boolean;
        id: string;
        facing: Facing;
        rotation: number;
        speed: number;
        motion: Coordinate;
    }) {
        super({ name, layer, pos, aspect, isConcrete });
        this.id = id;
        this.name = name;
        this.facing = facing;
        this.rotation = rotation;
        this.speed = speed;
        this.motion = new Vector(motion)
    }
}

export default Entity;