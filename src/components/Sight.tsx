import { Container, Graphics } from "@inlet/react-pixi";
import { filters } from "pixi.js";
import React, { useCallback } from "react";
import { video } from "../config/video";
import GLOBAL from "../constants/global";
import NewCamera from "../controllers/Camera";
import Sight from "../controllers/Sight";
import Point from "../math/Point";
import Vector from "../math/Vector";
import { Layer } from "../types";

const Component = ({
    camera,
    observer,
    bound,
    blurSize,
    structuresLayer = { visibility: true, images: [], order: 1 },
}: {
    camera: NewCamera;
    bound: Vector;
    observer: Point;
    blurSize?: number;
    structuresLayer: Layer; 
}) => {
    const intersects = new Sight(camera, observer, bound, structuresLayer).area;
    const path = intersects
        .map(intersect => [
            Math.round(intersect.point.x),
            Math.round(intersect.point.y)
        ])
        .flat();
    const blindSpot = useCallback((g: PIXI.Graphics) => {
        g.clear();
        g.beginFill(0x000000);
        g.drawRect(0, 0, video.gridSize * GLOBAL.RENDER_ROWS, video.gridSize * GLOBAL.RENDER_COLUMNS)
        g.beginHole();
        g.drawPolygon(path);
        g.endHole();
        g.endFill();
    }, [path]);

    return (
        <Container>
            <Graphics draw={blindSpot} filters={blurSize ? [new filters.BlurFilter(blurSize)] : undefined} />
        </Container>
    );
};

export default Component;