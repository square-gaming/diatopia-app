import Cow from "./mobs/Cow";
import Sheep from "./mobs/Sheep";

const constructors: {
    [entitiesType: string]: any;
} = {
    'Cow': Cow,
    'Sheep': Sheep

};

export default constructors;