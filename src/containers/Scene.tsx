import React, { useRef, useState } from 'react';
import { render } from '../controllers/renderer';
import useUpdate from '../hooks/useUpdate';
import { video } from '../config/video';
import Camera from '../controllers/Camera';
import receiver from '../controllers/receiver';
import { World } from '../types/reducers';
import { GLOBAL } from '../constants/global';
import worldConfig from '../config/world';
import Client from '../controllers/Client';

const Scene = ({client, renderer}: {
    client: React.MutableRefObject<Client>;
    renderer: React.MutableRefObject<PIXI.Renderer>;
}) => {
    const worldRef = useRef<World>(worldConfig);
    const cameraRef = useRef<Camera>(new Camera(GLOBAL.RENDER_ROWS * video.gridSize));
    const [scene, setScene] = useState<JSX.Element>(null!);
    
    useUpdate(video.fps, () => {
        client.current.release().then(actions => {
            actions.forEach(action => receiver(worldRef, action));
            setScene(render(renderer.current, worldRef.current, cameraRef.current));
        });
    });

    return scene;
};

export default Scene;