import React, { useRef, useState } from 'react';
import { render } from '../controllers/renderer';
import useUpdate from '../hooks/useUpdate';
import { video } from '../config/video';
import Camera from '../controllers/Camera';
import receiver from '../controllers/receiver';
import { World } from '../types/reducers';
import GLOBAL from '../constants/global';
import Client from '../controllers/Client';

const Scene = ({worldRef, clientRef, rendererRef}: {
    worldRef: React.MutableRefObject<World>;
    clientRef: React.MutableRefObject<Client>;
    rendererRef: React.MutableRefObject<PIXI.Renderer>;
}) => {
    const cameraRef = useRef<Camera>(new Camera(GLOBAL.RENDER_ROWS * video.gridSize));
    const [scene, setScene] = useState<JSX.Element>(null!);
    
    useUpdate(video.fps, () => {
        clientRef.current.release().then(actions => {
            actions.forEach(action => receiver(worldRef, action));
            setScene(render(rendererRef.current, worldRef.current, cameraRef.current));
        });
    });

    return scene;
};

export default Scene;