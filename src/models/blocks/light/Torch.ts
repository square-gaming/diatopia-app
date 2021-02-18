import { Coordinate } from "../../../types/models";
import Light from "./Light";

class Torch extends Light {
    constructor({ name, layer, pos, aspect, isConcrete, lightLevel }: {
        name: string;
        layer: number;
        pos: Coordinate;
        aspect: Coordinate;
        isConcrete: boolean;
        lightLevel: number;
    }) {
        super({ name, layer, pos, aspect, isConcrete, lightLevel });
    }
}

export default Torch;