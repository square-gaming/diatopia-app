import { Coordinate } from "../../../types/models";
import Light from "./Light";

class Torch extends Light {
    constructor({ id, layer, pos, aspect, isConcrete, lightLevel }: {
        id: string;
        layer: number;
        pos: Coordinate;
        aspect: Coordinate;
        isConcrete: boolean;
        lightLevel: number;
    }) {
        super({ id, layer, pos, aspect, isConcrete, lightLevel });
    }
}

export default Torch;