import Entity from './entity/Entity';
import Point from '../math/Point';
import { AbilitiesInfo, PlayerInterface, Coordinate } from '../types/models';
import { Facing } from '../types';
import Level from './level/Level';
import Vector from '../math/Vector';
import { video } from '../config/video';
import GLOBAL from '../constants/global';
import Item from './item/Item';

class Player extends Entity implements PlayerInterface {
    spawnPos: Point;
    abilities: AbilitiesInfo;
    isMotion: boolean;
    health: number;
    inventory: Item[];
    selectedItemSlot: number;

    constructor({ id, layer, pos, aspect, isConcrete, uid, rotation, speed, spawnPos, facing, motion, isMotion, health, inventory }: {
        id: string;
        layer: number;
        pos: Coordinate;
        aspect: Coordinate;
        isConcrete: boolean;
        uid: string;
        rotation: number;
        speed: number;
        spawnPos: Coordinate;
        facing: Facing;
        motion: Coordinate;
        isMotion: boolean;
        health: number;
        inventory: Item[];
    }) {
        super({ id, layer, pos, aspect, isConcrete, uid, rotation, speed, facing, motion });
        this.spawnPos = new Point(spawnPos);
        this.abilities = {
            speed: 16,
            acceleration: 4
        }
        this.isMotion = isMotion;
        this.health = health;
        this.inventory = inventory;
        this.selectedItemSlot = 1;
    }

    protected update() {
        super.update();
        if (this.isMotion) {
            this.accelerate();
        } else if (!this.motion.isZero()) {
            this.brake();
        }
        if (!this.motion.isZero()) {
            this.move(this.motion.clone().multiply(GLOBAL.TICK_PER_SEC / video.fps).round());
        }
    }
    
    public brake() {
        const unit = new Vector(Math.cos(this.rotation), -Math.sin(this.rotation));
    
        if (
            Vector.isEqual(
                this.motion
                    .clone()
                    .subtract(unit.clone().multiply(this.abilities.acceleration * GLOBAL.TICK_PER_SEC / video.fps))
                    .normalize()
                    .round(),
                unit.clone().round()
            )
        ) {
            this.motion.subtract(unit.multiply(this.abilities.acceleration * GLOBAL.TICK_PER_SEC / video.fps));
        } else {
            this.motion = new Vector(0, 0);
        }
      }
    
    public accelerate() {
        const unit = new Vector(Math.cos(this.rotation), -Math.sin(this.rotation));
    
        if (
            this.motion
                .clone()
                .add(unit.clone().multiply(this.abilities.acceleration * GLOBAL.TICK_PER_SEC / video.fps)).length >
            this.abilities.speed * GLOBAL.TICK_PER_SEC / video.fps
        ) {
            this.motion = unit.multiply(this.abilities.speed * GLOBAL.TICK_PER_SEC / video.fps);
        } else {
            this.motion.add(unit.clone().multiply(this.abilities.acceleration * GLOBAL.TICK_PER_SEC / video.fps));
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