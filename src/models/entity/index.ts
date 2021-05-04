import Cow from "./mobs/Cow";
import Goat from "./mobs/Goat";
import Sheep from "./mobs/Sheep";
import Pig from "./mobs/Pig";

const constructors: {
    [entitiesType: string]: any;
} = {
    'Goat': Goat,
    'Cow': Cow,
    'Sheep': Sheep,
    'Pig': Pig
};

export default constructors;