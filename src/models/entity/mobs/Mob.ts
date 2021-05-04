import { Facing } from "../../../types";
import { Coordinate } from "../../../types/models";
import Entity from "../Entity";

abstract class Mob extends Entity {
    mass: number;
    health: number;
    attributes: any[];

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
        super({ name, layer, pos, aspect, isConcrete, id, rotation, speed, facing, motion });
        this.mass = mass;
        this.health = health;
        this.attributes = attributes;
    }
}

export default Mob;