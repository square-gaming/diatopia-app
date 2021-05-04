import { Direction } from "../types";
import ACTION_TYPE from "./actionType";

const Action = {
    update: () => ({
        type: ACTION_TYPE.WORLD.UPDATE
    }),
    move: (dir: Direction, motion: boolean) => ({
        type: ACTION_TYPE.PLAYER.MOVE,
        payload: {
            dir,
            motion
        }
    }),
    interact: () => ({
        type: ACTION_TYPE.PLAYER.INTERACT,
        payload: null,
    })
};

Object.freeze(Action);

export default Action;