import { WorldState } from "../types/reducers";

const world = (state: WorldState = {level: undefined, player: undefined, players: undefined}, action: {type: string; payload: any;}) => {
    // switch (action.type) {
    //     case ACTION_TYPE.LEVEL.INIT:
    //         const { time, lightLevel, spawnPos, floors, structures }: Payload<PayloadLevelInit> = action.payload;
            
    //         state.level = new Surface({
    //             time,
    //             lightLevel,
    //             spawnPos,
    //             floors: floors.map(floor => new Floor(floor)),
    //             structures: structures.map(structure => new Structure[structure.className](structure)),
    //         });
    //         console.log(state.level)
    //         return state;
    //     case ACTION_TYPE.LEVEL.UPDATE.LIGHTLEVEL:
    //         if (state.level) {
    //             state.level.lightLevel = action.payload;
    //         }
    //         return state;
    //     case ACTION_TYPE.LEVEL.UPDATE.STRUCTURE:
    //         state.level?.updateStructure(new Structure[action.payload.className](action.payload));
            
    //         return state;
    //     case ACTION_TYPE.PLAYER.INIT:
    //         const playerInit = state.players?.get(action.payload);

    //         if (playerInit) {
    //             state.player = playerInit;
    //         } else {
    //             console.error(`Player ${action.payload.id} could NOT be found.`);
    //         }
            
    //         return state;
    //     case ACTION_TYPE.PLAYER.MOVE:
    //         if (state.player) {
    //             state.player.moveTo(new Point(action.payload.pos));
    //             state.player.facing = action.payload.facing;
    //         } else {
    //             console.error('Player has Not been initialized.');
    //         }
    //         return state;
    //     case ACTION_TYPE.PLAYERS.INIT:
    //         state.players = new Map(action.payload.map((player: { id: number; name: string; pos: Coordinate, motion: Coordinate, spawnPos: Coordinate; facing: Facing }) => {
    //             const { id, name, pos, motion, spawnPos, facing } = player;

    //             return [
    //                 id,
    //                 new Player({ id, name, pos, motion, spawnPos, facing })
    //             ];
    //         }));
    //         return state;
    //     case ACTION_TYPE.PLAYERS.LEAVE:
    //         state.players?.delete(action.payload);
    //         return state;
    //     case ACTION_TYPE.PLAYERS.JOIN:
    //         if (state.player?.id !== action.payload.id) {
    //             state.players?.set(
    //                 action.payload.id,
    //                 new Player({
    //                     id: action.payload.id,
    //                     name: action.payload.name,
    //                     pos: action.payload.pos,
    //                     motion: action.payload.motion,
    //                     spawnPos: action.payload.spawnPos,
    //                     facing: action.payload.facing
    //                 })
    //             );
    //         }
            
    //         return state;
    //     case ACTION_TYPE.PLAYERS.MOVE:
    //         const playersMoving = state.players?.get(action.payload.uid);

    //         if (playersMoving) {
    //             playersMoving.moveTo(new Point(action.payload.pos));
    //             playersMoving.facing = action.payload.facing;
    //         } else {
    //             console.error(`Player ${action.payload.uid} could NOT be found.`);
    //         }
    //         return state;
    //     default:
    //         return state;
    // }
};

export default world;