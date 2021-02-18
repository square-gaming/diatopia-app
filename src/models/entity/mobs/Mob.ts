import { Facing } from "../../../types";
import { Coordinate } from "../../../types/models";
import Entity from "../Entity";

abstract class Mob extends Entity {
    mass: number;
    health: number;
    attributes: any[];

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
        super({ name, layer, pos, aspect, isConcrete, id, motion, facing });
        this.mass = mass;
        this.health = health;
        this.attributes = attributes;
    }
}

export default Mob;