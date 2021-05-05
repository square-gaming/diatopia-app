import Floor from "./Floor";
import Player from "../Player";
import Door from "./structure/Door";
import Wall from "./structure/Wall";
import Torch from "./light/Torch";

const constructors: {
    [blocksType: string]: any;
} = {
    'diatopia:floor': Floor,
    'diatopia:wall': Wall,
    'diatopia:door': Door,
    'diatopia:torch': Torch,
    'diatopia:player': Player
};

export default constructors;