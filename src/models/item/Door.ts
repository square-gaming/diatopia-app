import Item from "./Item";

class Door extends Item {
    constructor({ count, slot }: {
        count: number,
        slot?: number,
    }) {
        super({id: 'diatopia:door', count, slot});
    }
}

export default Door;
