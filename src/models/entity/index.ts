import Cow from "./mobs/Cow";
import Goat from "./mobs/Goat";

const constructors: {
    [entitiesType: string]: any;
} = {
    'Cow': Cow, 
    'Goat': Goat
};

export default constructors;