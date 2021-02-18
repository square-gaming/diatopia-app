import Entity from './entity/Entity';
import Point from '../math/Point';
import { AbilitiesInfo, PlayerInterface, Coordinate } from '../types/models';
import { Facing } from '../types';
import Level from './level/Level';
import Vector from '../math/Vector';

class Player extends Entity implements PlayerInterface {
    spawnPos: Point;
    abilities: AbilitiesInfo;

    constructor({ name, layer, pos, aspect, isConcrete, id, motion, spawnPos, facing }: {
        name: string;
        layer: number;
        pos: Coordinate;
        aspect: Coordinate;
        isConcrete: boolean;
        id: string;
        motion: Coordinate;
        spawnPos: Coordinate;
        facing: Facing;
    }) {
        super({ name, layer, pos, aspect, isConcrete, id, motion, facing });
        this.spawnPos = new Point(spawnPos);
        this.abilities = {
            speed: 4
        }
    }

    public move(vec: Vector) {
        this.pos.add(vec);
    }

    public moveTo(pos: Point) {
        this.pos.set(pos);
    }

    public get facingPos(): Point {
        return [
            this.pos.add(Vector.up.multiply(Level.UNIT_SIZE)),
            this.pos.add(Vector.right.multiply(Level.UNIT_SIZE)),
            this.pos.add(Vector.down.multiply(Level.UNIT_SIZE)),
            this.pos.add(Vector.left.multiply(Level.UNIT_SIZE))
        ][this.facing];
    }
}

export default Player;