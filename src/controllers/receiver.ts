import ACTION_TYPE from "../constants/actionType";
import Surface from "../models/level/Surface";
import Player from "../models/Player";
import { ThunkDispatch, AnyAction, PayloadAction } from "@reduxjs/toolkit";
import { Dispatch } from "react";
import { initLevel, updateEntity, updateLightlevel, updateStructure } from "../features/world/worldSlice";
import { initPlayers, removePlayer, addPlayer, movePlayerById, movePlayer, initPlayer } from "../features/world/worldSlice";

export default function receiver(
    dispatch: ThunkDispatch<{
        players: Map<string, Player>;
        level: Surface;
    }, null, AnyAction> & ThunkDispatch<{
        players: Map<string, Player>;
        level: Surface;
    }, undefined, AnyAction> & Dispatch<AnyAction>,
    action: PayloadAction<any>
) {
    switch (action.type) {
        case ACTION_TYPE.LEVEL.INIT:
            dispatch(initLevel(action.payload));
            break;
        case ACTION_TYPE.LEVEL.UPDATE.LIGHTLEVEL:
            dispatch(updateLightlevel(action.payload));
            break;
        case ACTION_TYPE.LEVEL.UPDATE.STRUCTURE:
            dispatch(updateStructure(action.payload));
            break;
        case ACTION_TYPE.ENTITY.MOB.MOVE:
            dispatch(updateEntity(action.payload));
            break;
        case ACTION_TYPE.PLAYER.INIT:
            dispatch(initPlayer(action.payload));
            break;
        case ACTION_TYPE.PLAYER.MOVE:
            dispatch(movePlayer(action.payload));
            break;
        case ACTION_TYPE.PLAYERS.INIT:
            dispatch(initPlayers(action.payload))
            break;
        case ACTION_TYPE.PLAYERS.LEAVE:
            dispatch(removePlayer(action.payload));
            break;
        case ACTION_TYPE.PLAYERS.JOIN:
            dispatch(addPlayer(action.payload));
            break;
        case ACTION_TYPE.PLAYERS.MOVE:
            dispatch(movePlayerById(action.payload));
            break;
        default:
            break;
    }
    console.log(action)
    // console.log(action.type, worldRef.current)
}