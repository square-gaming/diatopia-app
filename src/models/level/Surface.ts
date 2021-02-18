import Level from "./Level";
import Point from "../../math/Point";
import Time from "../Time";
import { BlocksType, EntitiesType } from "../../types";
import { Coordinate, SurfaceInterface } from "../../types/models";
import Vector from "../../math/Vector";

class Surface extends Level implements SurfaceInterface {
    constructor({ time, lightLevel, spawnPos, blocks, entities, border }: {
        time: Time | { lastTime: number; dayTime: number };
        lightLevel: number;
        spawnPos: Point | Coordinate;
        blocks: BlocksType[],
        entities: EntitiesType[],
        border: Vector | Coordinate;
    }) {
        super({ time, lightLevel, spawnPos, blocks, entities, border });
    }
}

export default Surface;