import Point from "../../../math/Point";
import { StructureInterface, Coordinate } from "../../../types/models";
import Segment from "../../../math/Segment";
import Block from "../../../core/Block";

abstract class Structure extends Block implements StructureInterface {
    type: number;
    pattern: number;
    frames: Segment[];

    constructor({
        name,
        layer,
        pos,
        aspect,
        type,
        pattern,
        isConcrete,
        frames
    }: {
        name: string;
        layer: number;
        pos: Point | Coordinate;
        aspect: Coordinate;
        isConcrete: boolean;
        type: number;
        pattern: number;
        frames: { start: Coordinate; end: Coordinate }[];
    }) {
        super({ name, layer, pos, aspect, isConcrete });
        this.type = type;
        this.pattern = pattern;
        this.isConcrete = isConcrete;
        this.frames = frames.map(frame => new Segment(new Point(frame.start), new Point(frame.end)))
    }
}

export default Structure;