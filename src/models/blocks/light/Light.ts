import Block from "../../../core/Block";
import { Coordinate } from "../../../types/models";

abstract class Light extends Block {
    lightLevel: number;

    constructor({
        id,
        layer,
        pos,
        aspect,
        isConcrete,
        lightLevel
    }: {
        id: string;
        layer: number;
        pos: Coordinate;
        aspect: Coordinate;
        isConcrete: boolean;
        lightLevel: number;
    }) {
        super({
            id,
            layer,
            pos,
            aspect,
            isConcrete
        });
        this.lightLevel = lightLevel;
    }
}

export default Light;