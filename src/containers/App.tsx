import React, { useContext, useEffect, useRef } from 'react';
import { video } from '../config/video';
import GLOBAL from '../constants/global';
import Viewport from '../components/Viewport';
import Scene from './Scene';
import UserInterface from './UserInterface';
import { StoreContext } from '../context/store';
import { StoreState } from '../types/context';
import Controller from '../controllers/control';
import { World } from '../types/reducers';
import worldConfig from '../config/world';

const App = ({username}: {
    username: string;
}) => {
    const { clientRef, rendererRef } = useContext<StoreState>(StoreContext);
    const worldRef = useRef<World>(worldConfig);

    useEffect(() => {
        if (window.WebSocket) {
			clientRef.current.connect(
				{ username },
				"ws://192.168.0.0:443/websocket",
				() => {
                    const controller = new Controller();

					controller.setUp(clientRef.current, worldRef.current);
				}
			);
		} else {
			alert("WebSocket not supported by your browser!");
		}
    }, [clientRef, username]);

    return (
        <Viewport
            width={video.gridSize * GLOBAL.VIEWPORT_COLUMNS}
            height={video.gridSize * GLOBAL.VIEWPORT_ROWS}
        >
            <Scene
                worldRef={worldRef}
                clientRef={clientRef}
                rendererRef={rendererRef}
            />
            <UserInterface />
        </Viewport>
    );
};

export default App;