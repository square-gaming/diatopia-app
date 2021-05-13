import React, { useEffect } from 'react';
import Scene from './scene/Scene';
import UserInterface from './UserInterface';
import Controller from '../controllers/control';
import receiver from '../controllers/receiver';
import Client from '../controllers/Client';
import { useAppDispatch } from '../app/hooks';

const Main = ({ username, location, clientRef}: {
    username: string;
    location: string;
    clientRef: React.MutableRefObject<Client>;
}) => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (window.WebSocket) {
			clientRef.current.connect(
				{ username },
				location,
				() => {
                    const controller = new Controller();

					controller.setUp(clientRef.current);
                    clientRef.current.onAction(() => {
                        clientRef.current.release().then(actions => {
                            actions.forEach(action => receiver(dispatch, action));
                        });
                    });
				}
			);
		} else {
			alert("WebSocket not supported by your browser!");
		}
    }, [clientRef, username, location, dispatch]);

    return (
        <>
            <Scene />
            <UserInterface />
        </>
    )
};

export default Main;
