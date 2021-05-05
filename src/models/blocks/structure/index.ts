import Door from "./Door";
import Wall from "./Wall";

const constructors: {
    [name: string]: any;
} = {
    'diatopia:wall': Wall,
    'diatopia:door': Door
};

export default constructors;