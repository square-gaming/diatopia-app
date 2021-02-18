import ACTION_TYPE from "../constants/actionType";
import { Action } from "../types";
import { World, Payload, PayloadLevelInit } from "../types/reducers";
import Surface from "../models/level/Surface";
import Block from "../models/blocks";
import Point from "../math/Point";
import Player from "../models/Player";
import Entity from "../models/entity";

export default function receiver(
    worldRef: React.MutableRefObject<World>,
    action: Action
) {
    switch (action.type) {
        case ACTION_TYPE.LEVEL.INIT:
            const { time, lightLevel, spawnPos, blocks, entities, border }: Payload<PayloadLevelInit> = action.payload;

            worldRef.current.level = new Surface({
                time,
                lightLevel,
                spawnPos,
                blocks: blocks.map(block => new Block[block.name](block)),
                entities: entities.map(entity => new Entity[entity.name](entity)),
                border
            });
            break;
        case ACTION_TYPE.LEVEL.UPDATE.LIGHTLEVEL:
            worldRef.current.level.lightLevel = action.payload;
            break;
        case ACTION_TYPE.LEVEL.UPDATE.STRUCTURE:
            worldRef.current.level.updateBlock(new Block[action.payload.name](action.payload));
            break;
        case ACTION_TYPE.ENTITY.MOB.MOVE:
            worldRef.current.level.updateEntity(new Entity[action.payload.name](action.payload));
            break;
        case ACTION_TYPE.PLAYER.INIT:
            const playerInit = worldRef.current.players.get(action.payload);

            if (playerInit) {
                worldRef.current.player = playerInit;
            } else {
                console.error(`Player ${action.payload.id} could NOT be found.`);
            }
            
            break;
        case ACTION_TYPE.PLAYER.MOVE:
            worldRef.current.player.moveTo(new Point(action.payload.pos));
            worldRef.current.player.facing = action.payload.facing;
            break;
        case ACTION_TYPE.PLAYERS.INIT:
            worldRef.current.players = new Map(action.payload.map((player: any) => {
                return [player.id, new Player(player)];
            }));
            break;
        case ACTION_TYPE.PLAYERS.LEAVE:
            worldRef.current.players.delete(action.payload);
            break;
        case ACTION_TYPE.PLAYERS.JOIN:
            if (worldRef.current.player.id !== action.payload.id) {
                worldRef.current.players.set(
                    action.payload.id,
                    new Player(action.payload)
                );
            } else {

            }
            break;
        case ACTION_TYPE.PLAYERS.MOVE:
            const playersMoving = worldRef.current.players.get(action.payload.uid);

            if (playersMoving) {
                playersMoving.moveTo(new Point(action.payload.pos));
                playersMoving.facing = action.payload.facing;
            } else {
                console.error(`Player ${action.payload.uid} could NOT be found.`);
            }
            break;
        default:
            break;
    }
    console.log(action.type, worldRef.current)
}