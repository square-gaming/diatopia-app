import Wall from "../models/blocks/structure/Wall";
import Door from "../models/blocks/structure/Door";
import Surface from "../models/level/Surface";
import Underground from "../models/level/Underground";
import Image from "../models/Image";
import Cow from "../models/entity/mobs/Cow";
import Sheep from "../models/entity/mobs/Sheep";
import Goat from "../models/entity/mobs/Goat";
import Pig from "../models/entity/mobs/Pig";
import DoorItem from "../models/entity/item/Door";

export interface Layer {
    visibility: boolean;
    images: Image[];
    order: number;
}
export interface Action {
    type: string;
    payload?: any;
}
export type Direction = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7
export type Facing = 0 | 1 | 2 | 3
export type Toward = 0 | 1
export type Level = Surface | Underground
export type Structure = Wall | Door
export type BlocksType = Floor | Wall | Door | Torch;
export type EntitiesType = MobsType | ItemsType;
export type MobsType = Cow | Sheep | Goat | Pig;
export type ItemsType = DoorItem;