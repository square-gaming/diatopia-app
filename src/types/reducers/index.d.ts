import { Level } from "../../types";
import Player from "../../models/Player";
import { Coordinate } from "../models";

export interface World {
    level: Level;
    player: Player;
    players: Map<number, Player>;
}
export interface WorldState {
    level: Level | undefined;
    player: Player | undefined;
    players: Map<number, Player> | undefined;
}
export type Payload<T extends PayloadLevelInit> = T;
export interface PayloadLevelInit {
    spawnPos: Coordinate;
    blocks: any[];
    entities: any[];
    time: {
        lastTime: number;
        dayTime: number;
    };
    lightLevel: number;
    border: Coordinate;
}
export interface PayloadPlayerJoin {
    id: number;
    name: string;
    pos: Coordinate;
    spawnPos: Coordinate;
}