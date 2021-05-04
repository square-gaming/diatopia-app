import React, { useRef } from 'react';
import { video } from '../../config/video';
import Camera from '../../controllers/Camera';
import GLOBAL from '../../constants/global';
import Sight from '../../components/Sight';
import LightMask from '../../components/LightMask';
import Vector from '../../math/Vector';
import { useApp } from '@inlet/react-pixi';
import { useAppSelector } from '../../app/hooks';
import { selectLevel, selectPlayers, selectPlayer } from '../../features/world/worldSlice';
import useIteration from '../../hooks/useIteration';
import Players from  './Players';
import Blocks from './Blocks';
import Entities from './Entities';

const Scene = () => {
    const cameraRef = useRef<Camera>(new Camera(GLOBAL.RENDER_ROWS * video.gridSize));
    const { renderer } = useApp();
    const level = useAppSelector(selectLevel);
    const players = useAppSelector(selectPlayers);
    const player = useAppSelector(selectPlayer);
    useIteration();

    cameraRef.current.position = player.pos;

    const layers = cameraRef.current.capture({
        blocks: Object.values(level.blocks),
        entities: Object.values(level.entities),
        players
    });

    return (
        <LightMask
            renderer={renderer}
            camera={cameraRef.current}
            skylightLevel={level.lightLevel}
            bound={new Vector(video.gridSize * GLOBAL.RENDER_COLUMNS, video.gridSize * GLOBAL.RENDER_ROWS)}
            lightsLayer={layers.blocks}
            structuresLayer={layers.blocks}
            blurSize={4}
            offset={cameraRef.current.offset}
        >
            <Blocks layer={layers.blocks} />
            <Entities layer={layers.entities} />
            <Players layer={layers.players} />
            <Sight
                camera={cameraRef.current}
                bound={new Vector(video.gridSize * GLOBAL.RENDER_COLUMNS, video.gridSize * GLOBAL.RENDER_ROWS)}
                observer={player.pos}
                blurSize={4}
                structuresLayer={layers.blocks}
            />
        </LightMask>
    );
};

export default Scene;
