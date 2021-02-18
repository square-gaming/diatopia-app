import Point from "../math/Point";
import { GLOBAL } from "../constants/global";
import { Coordinate } from "../types/models";
import Vector from "../math/Vector";

abstract class Block {
    name: string;
    layer: number;
    pos: Point;
    aspect: Vector;
    isConcrete: boolean;

    constructor({
        name, layer, pos, aspect, isConcrete
    }: {
        name: string;
        layer: number;
        pos: Coordinate;
        aspect: Coordinate;
        isConcrete: boolean;
    }) {
        this.name = name;
        this.layer = layer;
        this.pos = pos instanceof Point ? pos : new Point(pos);
        this.aspect = new Vector(aspect);
        this.isConcrete = isConcrete;
    }

    public get width(): number {
        return this.aspect.width;
    }

    public get height(): number {
        return this.aspect.height;
    }

    public get borderPos(): [Point, Point] {
        return [
            this.pos.clone(),
            this.pos.clone().add(new Vector(this.width - 1, this.height - 1))
        ];
    }

    public get adjacentPos(): Point[] {
        return [
            this.pos.clone()
                .add(new Vector(this.width / 2, 0))
                .add(Vector.up.multiply(GLOBAL.UNIT_LENGTH - 1)),
            this.pos.clone()
                .add(new Vector(this.width, this.height / 2))
                .add(Vector.right.multiply(GLOBAL.UNIT_LENGTH - 1)),
            this.pos.clone()
                .add(new Vector(this.width / 2, this.height))
                .add(Vector.down.multiply(GLOBAL.UNIT_LENGTH - 1)),
            this.pos.clone()
                .add(new Vector(0, this.height / 2))
                .add(Vector.left.multiply(GLOBAL.UNIT_LENGTH - 1))
        ];
    }
}

export default Block;