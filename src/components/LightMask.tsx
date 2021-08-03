import React, { memo, useMemo } from 'react';
import { Container } from '@inlet/react-pixi';
import { video } from '../config/video';
import GLOBAL from '../constants/global';
import * as PIXI from 'pixi.js';
import { Layer } from '../types';
import Vector from '../math/Vector';
import Light from '../controllers/Light';
import NewCamera from '../controllers/Camera';

const Component = ({
    renderer,
    camera,
    skylightLevel,
    bound,
    lightsLayer = { visibility: true, images: [], order: 2 },
    structuresLayer = { visibility: true, images: [], order: 1 },
    blurSize = 0,
    children
}: {
    renderer: PIXI.Renderer;
    camera: NewCamera;
    skylightLevel: number;
    bound: Vector;
    lightsLayer: Layer;
    structuresLayer: Layer;
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

    const lightSprite = new PIXI.Sprite(renderer.generateTexture(
        light,
        PIXI.SCALE_MODES.NEAREST,
        1,
        new PIXI.Rectangle(
            0,
            0,
            video.gridSize * GLOBAL.RENDER_COLUMNS,
            video.gridSize * GLOBAL.RENDER_ROWS
        )
    ));

    return (
        <Container mask={lightSprite}>
            {children}
        </Container>
    );
}

export default memo(Component);