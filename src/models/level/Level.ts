import Point from "../../math/Point";
import { LevelInterface, Coordinate } from "../../types/models";
import Time from "../Time";
import { BlocksType, EntitiesType } from "../../types";
import Vector from "../../math/Vector";

abstract class Level implements LevelInterface {
    static UNIT_SIZE = 32;
    
    spawnPos: Point;
    blocks: BlocksType[];
    entities: EntitiesType[];
    lightLevel: number;
    time: Time;
    border: Vector;

    constructor({ time, lightLevel, spawnPos, blocks, entities, border }: {
        time: Time | { lastTime: number; dayTime: number };
        lightLevel: number;
        spawnPos: Point | Coordinate;
        blocks: BlocksType[];
        entities: EntitiesType[];
        border: Vector | Coordinate;
    }) {
        this.time = time instanceof Time ? time : new Time(time);
        this.lightLevel = lightLevel;
        this.spawnPos = spawnPos instanceof Point ? spawnPos : new Point(spawnPos);
        this.blocks = blocks;
        this.entities = entities;
        this.border = border instanceof Vector ? border : new Vector(border)
    }

    public getBlock(type: string, pos: Point) {
        return this.blocks.find(block => {
            return block.name === type && Point.isEqual(block.pos, pos)
        });
    }
    
    public updateBlock(source: BlocksType) {
        const index = this.blocks.findIndex(block => {
            return block.name === source.name
                && Point.isEqual(source.pos, block.pos);
        });
        
        this.blocks.splice(index, 1, source);
    }

    public updateEntity(source: EntitiesType) {
        const index = this.entities.findIndex(entity => {
            return entity.id === source.id
        });
        
        this.entities.splice(index, 1, source);
    }
}

export default Level;