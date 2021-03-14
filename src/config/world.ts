import Surface from "../models/level/Surface";
import Player from "../models/Player";

const world = {
    level: new Surface({
        time: {
            lastTime: 0,
            dayTime: 0
        },
        lightLevel: 0,
        spawnPos: { x: 0, y: 0 },
        blocks: [],
        entities: [],
        border: { x: 0, y: 0 }
    }),
    players: new Map(),
    player: new Player({
        name: 'Player',
        layer: 2,
        pos: { x: 0, y: 0 },
        aspect: { x: 0, y: 0 },
        isConcrete: true,
        id: '',
        rotation: 0,
        speed: 0,
        spawnPos: { x: 0, y: 0 },
        facing: 0,
        motion: { x: 0, y: 0 },
        isMotion: false
    })
};

export default world;