import { Facing } from "../../../types";
import { Coordinate } from "../../../types/models";
import Entity from "../Entity";

abstract class Mob extends Entity {
    mass: number;
    health: number;
    attributes: any[];

    constructor({ id, layer, pos, aspect, isConcrete, uid, facing, rotation, speed, mass, health, attributes, motion }: {
        id: string;
        layer: number;
        pos: Coordinate;
        aspect: Coordinate;
        isConcrete: boolean;
        uid: string;
        facing: Facing;
        rotation: number;
        speed: number;
        mass: number;
        health: number;
        attributes: any[];
        motion: Coordinate;
    }) {
        super({ id, layer, pos, aspect, isConcrete, uid, rotation, speed, facing, motion });
        this.mass = mass;
        this.health = health;
        this.attributes = attributes;
    }
}

export default Mob;