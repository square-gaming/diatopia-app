import Point from "../math/Point";
import { GLOBAL } from "../constants/global";

export function alignPoint(pos: Point): Point {
    return new Point({
        x: Math.round((pos.x) / GLOBAL.UNIT_LENGTH) * GLOBAL.UNIT_LENGTH,
        y: Math.round((pos.y) / GLOBAL.UNIT_LENGTH) * GLOBAL.UNIT_LENGTH
    });
}