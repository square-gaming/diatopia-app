import { Facing } from "../../../types";
import { Coordinate } from "../../../types/models";
import Item from "./Item";
import DoorItem from "../../item/Door";

class Door extends Item {
    item: DoorItem;
    
    constructor({ id, layer, pos, aspect, isConcrete, uid, facing, rotation, speed, motion, age, health }: {
        id: string;
        layer: number;
        pos: Coordinate;
        aspect: Coordinate;
        isConcrete: boolean;
        uid: string;
        facing: Facing;
        rotation: number;
        speed: number;
        motion: Coordinate;
        age: number;
        health: number;
    }) {
        super({ id, layer, pos, aspect, isConcrete, uid, facing, rotation, speed, motion, age, health })
        this.item = new DoorItem({ count: 1 });
    }
}

export default Door;
