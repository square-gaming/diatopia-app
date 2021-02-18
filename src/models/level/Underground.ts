import Point from "../../math/Point";
import Time from "../Time";
import Level from "./Level";
import { Coordinate, UndergroundInterface } from "../../types/models";
import { BlocksType, EntitiesType } from "../../types";
import Vector from "../../math/Vector";

class Underground extends Level implements UndergroundInterface {
    constructor({ time, lightLevel, spawnPos, blocks, entities, border }: {
        time: Time | { lastTime: number; dayTime: number };
        lightLevel: number;
        spawnPos: Point | Coordinate;
        blocks: BlocksType[];
        entities: EntitiesType[];
        border: Vector;
    }) {
        super({ time, lightLevel, spawnPos, blocks, entities, border });
    }
}

export default Underground;