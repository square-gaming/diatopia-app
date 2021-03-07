import Door from "./Door";
import Wall from "./Wall";
import Player from "./Player";
import Floor from "./Floor";
import Void from "./Void";
import Torch from "./Torch";
import Cow from "./Cow";
import Sheep from "./Sheep";

const constructors: {
    [name: string]: (data: any, size: number, x: number, y: number) => JSX.Element;
} = {
    'Floor': Floor,
    'Wall': Wall,
    'Door': Door,
    'Torch': Torch,
    'Player': Player,
    'Cow': Cow,
    'Sheep': Sheep,
    'Object': Void
};

export default constructors;
