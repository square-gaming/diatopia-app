import Point from "../../models/Point";

export interface WindowProps {
    width: number;
    height: number;
    cellSize: number;
}

export interface RenderRegionProps {
    shift: Point;
}