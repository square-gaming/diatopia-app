import Floor from "./Floor";
import Player from "../Player";
import Door from "./structure/Door";
import Wall from "./structure/Wall";
import Torch from "./light/Torch";

const constructors: {
    [blocksType: string]: any;
} = {
    'Floor': Floor,
    'Wall': Wall,
    'Door': Door,
    'Torch': Torch,
    'Player': Player
};

export default constructors;