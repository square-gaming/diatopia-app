import React, { useRef, useState } from 'react';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { video } from '../config/video';
import GLOBAL from '../constants/global';
import Viewport from '../components/Viewport';
import Main from './Main';
import Title from './Title';
import STAGE_TYPE from '../constants/stageType';
import world from "../features/world/worldSlice";
import Client from '../controllers/Client';

const store = configureStore({
    reducer: {
        world
    },
    middleware: getDefaultMiddleware({
        serializableCheck: false
    })
});
const App = ({username}: {
    username: string;
}) => {
    const clientRef = useRef(new Client());
    const [stage, setStage] = useState(STAGE_TYPE.TITLE)

    return (
        <Viewport
            width={video.gridSize * GLOBAL.VIEWPORT_COLUMNS}
            height={video.gridSize * GLOBAL.VIEWPORT_ROWS}
        >
            <Provider store={store}>
            {stage === STAGE_TYPE.TITLE && 
                <Title
                    setStage={setStage}
                />
            }
            {stage === STAGE_TYPE.MAIN &&
                <Main
                    username={username}
                    clientRef={clientRef}
                />
            }
            </Provider>
        </Viewport>
    );
};

export default App;
