import Block from "../../core/Block";
import Vector from "../../math/Vector";
import { Facing } from "../../types";
import { Coordinate } from "../../types/models";

abstract class Entity extends Block {
    uid: string;
    facing: Facing;
    rotation: number;
    speed: number;
    motion: Vector;

    constructor({ id, layer, pos, aspect, isConcrete, uid, facing, rotation, speed, motion }: {
        id: string;
        layer: number;
        pos: Coordinate;
        aspect: Coordinate;
        isConcrete: boolean;
        uid: string;
        facing: Facing;
        rotation: number;
        speed: number;
        motion: Coordinate;
    }) {
        super({ id, layer, pos, aspect, isConcrete });
        this.uid = uid;
        this.id = id;
        this.facing = facing;
        this.rotation = rotation;
        this.speed = speed;
        this.motion = new Vector(motion)
    }
}

export default Entity;