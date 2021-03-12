import React, { useContext } from 'react';
import { video } from '../config/video';
import GLOBAL from '../constants/global';
import Viewport from '../components/Viewport';
import Scene from './Scene';
import UserInterface from './UserInterface';
import { StoreContext } from '../context/store';
import { StoreState } from '../types/context';

const App = () => {
    const { clientRef, rendererRef } = useContext<StoreState>(StoreContext);

    return (
        <Viewport width={video.gridSize * GLOBAL.VIEWPORT_COLUMNS} height={video.gridSize * GLOBAL.VIEWPORT_ROWS}>
            <Scene client={clientRef} renderer={rendererRef} />
            <UserInterface />
        </Viewport>
    );
};

export default App;