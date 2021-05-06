import { Facing } from "../../../types";
import { Coordinate } from "../../../types/models";
import Entity from "../Entity";

abstract class Item extends Entity {
    age: number;
    health: number;

    constructor({ id, layer, pos, aspect, isConcrete, uid, facing, rotation, speed, motion, age, health }: {
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
        age: number;
        health: number;
    }) {
        super({ id, layer, pos, aspect, isConcrete, uid, facing, rotation, speed, motion });
        this.age = age;
        this.health = health;
    }
}

export default Item;
