import React, { useEffect, useRef } from 'react';
import Scene from './Scene';
import UserInterface from './UserInterface';
import Controller from '../controllers/control';
import { World } from '../types/reducers';
import worldConfig from '../config/world';
import receiver from '../controllers/receiver';
import Client from '../controllers/Client';

const Main = ({username, clientRef, rendererRef}: {
    username: string;
    clientRef: React.MutableRefObject<Client>;
    rendererRef: React.MutableRefObject<PIXI.Renderer>;
}) => {
    const worldRef = useRef<World>(worldConfig);

    useEffect(() => {
        if (window.WebSocket) {
			clientRef.current.connect(
				{ username },
				process.env.REACT_APP_WSS_URI,
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
        <>
            <Scene
                worldRef={worldRef}
                rendererRef={rendererRef}
            />
            <UserInterface worldRef={worldRef} />
        </>
    )
};

export default Main;
