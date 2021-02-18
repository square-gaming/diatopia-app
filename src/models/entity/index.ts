import Cow from "./mobs/Cow";

const constructors: {
    [entitiesType: string]: any;
} = {
    'Cow': Cow
};

export default constructors;