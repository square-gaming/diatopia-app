import React, { useRef, useState } from 'react';
import { render } from '../controllers/renderer';
import useUpdate from '../hooks/useUpdate';
import { video } from '../config/video';
import Camera from '../controllers/Camera';
import { World } from '../types/reducers';
import GLOBAL from '../constants/global';

const Scene = ({worldRef, rendererRef}: {
    worldRef: React.MutableRefObject<World>;
    rendererRef: React.MutableRefObject<PIXI.Renderer>;
}) => {
    const cameraRef = useRef<Camera>(new Camera(GLOBAL.RENDER_ROWS * video.gridSize));
    const [scene, setScene] = useState<JSX.Element>(null!);

    useUpdate(video.fps, () => {
        setScene(render(rendererRef.current, worldRef.current, cameraRef.current));
    });

    return scene;
};

export default Scene;