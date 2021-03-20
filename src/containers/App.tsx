import React, { useContext, useState } from 'react';
import { video } from '../config/video';
import GLOBAL from '../constants/global';
import Viewport from '../components/Viewport';
import Main from './Main';
import { StoreContext } from '../context/store';
import { StoreState } from '../types/context';
import Title from './Title';
import STAGE_TYPE from '../constants/stageType';

const App = ({username}: {
    username: string;
}) => {
    const { clientRef, rendererRef } = useContext<StoreState>(StoreContext);
    const [stage, setStage] = useState(STAGE_TYPE.TITLE)

    return (
        <Viewport
            width={video.gridSize * GLOBAL.VIEWPORT_COLUMNS}
            height={video.gridSize * GLOBAL.VIEWPORT_ROWS}
        >
            {stage === STAGE_TYPE.TITLE && 
                <Title
                    setStage={setStage}
                />
            }
            {stage === STAGE_TYPE.MAIN &&
                <Main
                    username={username}
                    clientRef={clientRef}
                    rendererRef={rendererRef}
                />
            }
        </Viewport>
    );
};

export default App;
