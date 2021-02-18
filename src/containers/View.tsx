import { useContext, useRef, useState } from 'react';
import { StoreState } from '../types/context';
import { StoreContext } from '../context/store';
import { render } from '../controllers/renderer';
import useUpdate from '../hooks/useUpdate';
import { video } from '../config/video';
import Camera from '../controllers/Camera';
import receiver from '../controllers/receiver';
import { World } from '../types/reducers';
import { GLOBAL } from '../constants/global';
import worldConfig from '../config/world';
import React from 'react';
import Viewport from '../components/Viewport';

const View = () => {
    const worldRef = useRef<World>(worldConfig);
    const cameraRef = useRef<Camera>(new Camera(GLOBAL.RENDER_ROWS * video.gridSize));
    const [view, setView] = useState<JSX.Element>(null!);
    const { clientRef, rendererRef } = useContext<StoreState>(StoreContext);

    useUpdate(video.fps, () => {
        clientRef.current.release().then(actions => {
            actions.forEach(action => receiver(worldRef, action));
            setView(render(rendererRef.current, worldRef.current, cameraRef.current));
        });
    });

    return (
        <Viewport width={video.gridSize * GLOBAL.VIEWPORT_COLUMNS} height={video.gridSize * GLOBAL.VIEWPORT_ROWS}>
            {view}
        </Viewport>
    );
};

export default View;