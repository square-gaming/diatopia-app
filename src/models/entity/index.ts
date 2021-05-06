import Cow from "./mobs/Cow";
import Goat from "./mobs/Goat";
import Sheep from "./mobs/Sheep";
import Pig from "./mobs/Pig";
import Door from "./item/Door";

const constructors: {
    [entitiesType: string]: any;
} = {
    'diatopia:goat': Goat,
    'diatopia:cow': Cow,
    'diatopia:sheep': Sheep,
    'diatopia:pig': Pig,
    'diatopia:item': Door,
};

export default constructors;
