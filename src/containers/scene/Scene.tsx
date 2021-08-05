import React, { useEffect, useRef } from 'react';
import { video } from '../../config/video';
import GLOBAL from '../../constants/global';
import Sight from './Sight';
import LightMask from './LightMask';
import Vector from '../../math/Vector';
import { useAppSelector } from '../../app/hooks';
import { selectLevel, selectPlayers, selectPlayer } from '../../features/world/worldSlice';
import useIteration from '../../hooks/useIteration';
import Players from  './Players';
import Blocks from './Blocks';
import Entities from './Entities';
import Camera from '../../controllers/Camera';

const Scene = () => {
    const cameraRef = useRef<Camera>(
        new Camera(
            video.gridSize * GLOBAL.VIEWPORT_COLUMNS,
            video.gridSize * GLOBAL.VIEWPORT_ROWS,
            { x: 1900, y: 1900 },
            32
        )
    );
    const level = useAppSelector(selectLevel);
    const players = useAppSelector(selectPlayers);
    const player = useAppSelector(selectPlayer);
    useIteration();

    useEffect(() => {
        cameraRef.current.follow(player);
    }, [player]);

    const layers = cameraRef.current.capture({
        blocks: level.blocks,
        entities: level.entities,
        players
    });

    return (
        <LightMask
            camera={cameraRef.current}
            skylightLevel={level.lightLevel}
            bound={new Vector(video.gridSize * GLOBAL.RENDER_COLUMNS, video.gridSize * GLOBAL.RENDER_ROWS)}
            lightsLayer={layers.blocks}
            structuresLayer={layers.blocks}
            blurSize={4}
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
