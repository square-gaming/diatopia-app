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
import receiver from '../controllers/receiver';

const App = ({username}: {
    username: string;
}) => {
    const { clientRef, rendererRef } = useContext<StoreState>(StoreContext);
    const worldRef = useRef<World>(worldConfig);

    useEffect(() => {
        if (window.WebSocket) {
			clientRef.current.connect(
				{ username },
				"ws://118.169.80.159:443/websocket",
				() => {
                    const controller = new Controller();

					controller.setUp(clientRef.current, worldRef.current.player);
                    clientRef.current.onAction(() => {
                        clientRef.current.release().then(actions => {
                            actions.forEach(action => receiver(worldRef, action));
                        });
                    });
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
                rendererRef={rendererRef}
            />
            <UserInterface />
        </Viewport>
    );
};

export default App;