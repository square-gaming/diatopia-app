import Door from "./Door";
import Wall from "./Wall";

const constructors: {
    [name: string]: any;
} = {
    'Wall': Wall,
    'Door': Door
};

export default constructors;