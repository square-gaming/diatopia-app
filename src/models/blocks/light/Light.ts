import Block from "../../../core/Block";
import { Coordinate } from "../../../types/models";

abstract class Light extends Block {
    lightLevel: number;

    constructor({
        name,
        layer,
        pos,
        aspect,
        isConcrete,
        lightLevel
    }: {
        name: string;
        layer: number;
        pos: Coordinate;
        aspect: Coordinate;
        isConcrete: boolean;
        lightLevel: number;
    }) {
        super({
            name,
            layer,
            pos,
            aspect,
            isConcrete
        });
        this.lightLevel = lightLevel;
    }
}

export default Light;