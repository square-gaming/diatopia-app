import Point from "../../models/Point";
import Floor from "../../models/Floor";
import { Toward, Facing, BlocksType } from "..";
import Vector from "../../math/Vector";

export interface Coordinate {
    x: number;
    y: number;
}
export interface EntityInterface {
    id: string;
    facing: Facing;
    rotation: number;
    speed: number;
}
export interface PlayerInterface extends EntityInterface {
    spawnPos: Point;
    move(vec: Vector): void;
    moveTo(pos: Point): void;
    facingPos: Point;
}
export interface StructureInterface {
    type: number;
    pattern: number;
}
export interface WallInterface extends StructureInterface {
}
export interface DoorInterface extends StructureInterface {
    toward: Toward;
    isOpen: boolean;
}
export interface AbilitiesInfo {
    speed: number;
}
export interface CellInfo {
    pos: Point;
    size?: number;
    floor: Floor;
    structure: any;
}
export interface LevelInterface {
    spawnPos: Point;
    border: Vector;
    blocks: BlocksType[];
    lightLevel: number;
    time: Time;
}
export interface SurfaceInterface {

}
export interface UndergroundInterface {
    
}