import React, { memo, useMemo } from 'react';
import { Container } from '@inlet/react-pixi';
import Point from '../math/Point';
import { video } from '../config/video';
import GLOBAL from '../constants/global';
import * as PIXI from 'pixi.js';
import { Layer } from '../types';
import Camera from '../controllers/Camera';
import Vector from '../math/Vector';
import Light from '../controllers/Light';

const Component = ({
    renderer,
    camera,
    skylightLevel,
    bound,
    lightsLayer = { visibility: true, images: [], order: 2 },
    structuresLayer = { visibility: true, images: [], order: 1 },
    offset,
    blurSize = 0,
    children
}: {
    renderer: PIXI.Renderer;
    camera: Camera;
    skylightLevel: number;
    bound: Vector;
    lightsLayer: Layer;
    structuresLayer: Layer;
    offset: Point;
    blurSize?: number;
    children: JSX.Element[];
}) => {
    const areas = new Light(camera, bound, lightsLayer, structuresLayer, 36).areas;
    const light = useMemo(() => new PIXI.Graphics(), []);

    light.clear();
    light.beginFill(0xff0000, skylightLevel * 0.05);
    light.drawRect(0, 0, video.gridSize * GLOBAL.RENDER_ROWS, video.gridSize * GLOBAL.RENDER_COLUMNS);
    areas.forEach(area => {
        const path = area.vertices
            .map(vertex => [
                Math.round(vertex.point.x),
                Math.round(vertex.point.y)
            ])
            .flat();

        light.beginFill(0xff0000, area.lightLevel * 0.05);
        light.drawPolygon(path);
        light.endFill();
    });
    light.endFill();

    if (blurSize) {
        light.filters = [new PIXI.filters.BlurFilter(blurSize)];
    }
    
    /**
     * Covert Graphics to Sprite since Graphic can only hold alpha 0/1.
     * Besides, number 0.1 is a magic number. I don't know why.
     * */ 
    const lightSprite = new PIXI.Sprite(renderer.generateTexture(
        light,
        PIXI.SCALE_MODES.NEAREST,
        1,
        new PIXI.Rectangle(
            blurSize ? -offset.x * 0.1 : -offset.x,
            blurSize ? -offset.y * 0.1 : -offset.y,
            video.gridSize * GLOBAL.RENDER_COLUMNS,
            video.gridSize * GLOBAL.RENDER_ROWS
        )
    ));

    return (
        <Container
            mask={lightSprite}
            position={[offset.x, offset.y]}
        >
            {children}
        </Container>
    );
}

export default memo(Component);