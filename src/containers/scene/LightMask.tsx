import React, { memo, useMemo } from 'react';
import { Container, useApp } from '@inlet/react-pixi';
import { video } from '../../config/video';
import GLOBAL from '../../constants/global';
import * as PIXI from 'pixi.js';
import { Layer } from '../../types';
import Vector from '../../math/Vector';
import Camera from '../../controllers/Camera';
import useLight from '../../hooks/useLight';

const Component = ({
    camera,
    skylightLevel,
    bound,
    lightsLayer = { visibility: true, images: [], order: 2 },
    structuresLayer = { visibility: true, images: [], order: 1 },
    blurSize = 0,
    children
}: {
    camera: Camera;
    skylightLevel: number;
    bound: Vector;
    lightsLayer: Layer;
    structuresLayer: Layer;
    blurSize?: number;
    children: JSX.Element[];
}) => {
    const { renderer } = useApp();
    const light = useLight(camera, bound, lightsLayer, 36);
    const lightGraphic = useMemo(() => new PIXI.Graphics(), []);

    light.update(structuresLayer);

    lightGraphic.clear();
    lightGraphic.beginFill(0xff0000, skylightLevel * 0.05);
    lightGraphic.drawRect(0, 0, video.gridSize * GLOBAL.RENDER_ROWS, video.gridSize * GLOBAL.RENDER_COLUMNS);
    light.areas.forEach(area => {
        const path = area.vertices
            .map(vertex => [
                Math.round(vertex.point.x),
                Math.round(vertex.point.y)
            ])
            .flat();

        lightGraphic.beginFill(0xff0000, area.lightLevel * 0.05);
        lightGraphic.drawPolygon(path);
        lightGraphic.endFill();
    });
    lightGraphic.endFill();

    if (blurSize) {
        lightGraphic.filters = [new PIXI.filters.BlurFilter(blurSize)];
    }

    const lightSprite = new PIXI.Sprite(renderer.generateTexture(
        lightGraphic,
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