import React from "react";
import { TextStyle } from "pixi.js";
import { Container, Text } from "@inlet/react-pixi";
import GLOBAL from "../constants/global";
import { video } from "../config/video";
import STAGE_TYPE from "../constants/stageType";

const Title = ({setStage}: {
    setStage: React.Dispatch<React.SetStateAction<STAGE_TYPE>>;
}) => {
    const playClickHandler = (event: PIXI.InteractionEvent) => {
        setStage(STAGE_TYPE.MAIN);
    };
    
    return (
        <Container>
            <Text
                text="Diatopia"
                anchor={0.5}
                x={GLOBAL.VIEWPORT_COLUMNS * video.gridSize / 2}
                y={GLOBAL.VIEWPORT_ROWS * video.gridSize / 4}
                style={
                    new TextStyle({
                        fontFamily: '"Source Sans Pro", Helvetica, sans-serif',
                        fontSize: 50,
                        fill: '#ffffff',
                        strokeThickness: 5,
                    })
                }
            />
            <Text
                buttonMode={true}
                interactive={true}
                click={playClickHandler}
                text="Play"
                anchor={0.5}
                x={GLOBAL.VIEWPORT_COLUMNS * video.gridSize / 2}
                y={GLOBAL.VIEWPORT_ROWS * video.gridSize / 2}
                style={
                    new TextStyle({
                        fontFamily: '"Source Sans Pro", Helvetica, sans-serif',
                        fontSize: 18,
                        fill: '#ffffff',
                        strokeThickness: 5,
                    })
                }
            />
        </Container>
    );
};

export default Title;
