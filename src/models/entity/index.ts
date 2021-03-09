import Cow from "./mobs/Cow";
import Goat from "./mobs/Goat";
import Sheep from "./mobs/Sheep";

const constructors: {
    [entitiesType: string]: any;
} = {
    'Cow': Cow, 
    'Goat': Goat
    'Cow': Cow,
    'Sheep': Sheep
};

export default constructors;