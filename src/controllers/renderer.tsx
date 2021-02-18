import { WorldState } from '../types/reducers';
import Camera from './Camera';
import Group from '../components/Group';
import Sight from '../components/Sight';
import { video } from '../config/video';
import { GLOBAL } from '../constants/global';
import React from 'react';
import Vector from '../math/Vector';
import LightMask from '../components/LightMask';
import { Renderer } from 'pixi.js';

export function render(renderer: Renderer, world: WorldState, camera: Camera) {
    if (world.level && world.players && world.player) {
        camera.position = world.player.pos;
        const layers = camera.capture([
            Object.values(world.level.blocks),
            Object.values(world.level.entities),
            Array.from(world.players, ([, player]) => player)
        ]);
        const groups = layers.map(layer => {
            return <Group key={layer.order} layer={layer} children={layer.images.map(image => image.toSprite)} />
        });

        groups.push(<Sight
            camera={camera}
            bound={new Vector(video.gridSize * GLOBAL.RENDER_COLUMNS, video.gridSize * GLOBAL.RENDER_ROWS)}
            observer={world.player.pos}
            blurSize={4}
            structuresLayer={layers[1]}
        />);
        
        const view = <LightMask
            renderer={renderer}
            camera={camera}
            skylightLevel={world.level.lightLevel}
            bound={new Vector(video.gridSize * GLOBAL.RENDER_COLUMNS, video.gridSize * GLOBAL.RENDER_ROWS)}
            lightsLayer={layers[2]}
            structuresLayer={layers[1]}
            blurSize={4}
            offset={camera.offset}
            children={groups}
        />;

        return view;
    } else {
        throw Error();
    }
}