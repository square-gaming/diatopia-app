import Floor from "../../models/Floor";
import Player from "../../models/Player";
import Point from "../../models/Point";
import Structure from "../../models/blocks/structure/Structure";

export interface CellProps {
    readonly floor: Floor;
    readonly structure: any;
}
export interface FloorViewProps {
    readonly info: Floor;
}
export interface StructureViewProps {
    readonly info: Structure;
}
export interface PlayerProps {
    readonly info: Player;
    readonly shiftPos: Point;
}