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
import { Cows, Doors, Floors, Goats, Pigs, Players, Sheeps, Torchs, Walls } from  './withScene';

const Scene = () => {
    const cameraRef = useRef<Camera>(new Camera(GLOBAL.RENDER_ROWS * video.gridSize));
    const { renderer } = useApp();
    const level = useAppSelector(selectLevel);
    const players = useAppSelector(selectPlayers);
    const player = useAppSelector(selectPlayer);
    useIteration();

    cameraRef.current.position = player.pos;

    const layers = cameraRef.current.capture([
        Object.values(level.blocks),
        Object.values(level.entities),
        players
    ]);

    return (
        <LightMask
            renderer={renderer}
            camera={cameraRef.current}
            skylightLevel={level.lightLevel}
            bound={new Vector(video.gridSize * GLOBAL.RENDER_COLUMNS, video.gridSize * GLOBAL.RENDER_ROWS)}
            lightsLayer={layers.Torch}
            structuresLayer={layers.Wall}
            blurSize={4}
            offset={cameraRef.current.offset}
        >
            <Floors layer={layers.Floor} />
            <Walls layer={layers.Wall} />
            <Doors layer={layers.Door} />
            <Players layer={layers.Player} />
            <Cows layer={layers.Cow} />
            <Goats layer={layers.Goat} />
            <Pigs layer={layers.Pig} />
            <Sheeps layer={layers.Sheep} />
            <Torchs layer={layers.Torch} />
            <Sight
                camera={cameraRef.current}
                bound={new Vector(video.gridSize * GLOBAL.RENDER_COLUMNS, video.gridSize * GLOBAL.RENDER_ROWS)}
                observer={player.pos}
                blurSize={4}
                structuresLayer={layers.Wall}
            />
        </LightMask>
    );
};

export default Scene;
