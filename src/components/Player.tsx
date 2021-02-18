import React from "react";
import { TilingSprite } from "@inlet/react-pixi";
import Player from "../models/Player";
import playerPng from '../assets/Player0.png';

const Component = (data: Player, size: number, x: number, y: number) => {
    const tilePosition = { x: 0, y: 0 };

    return (
        <TilingSprite
            key={data.id}
            image={playerPng}
            tilePosition={tilePosition}
            width={size}
            height={size}
            x={x}
            y={y}
        />
    );
};

export default Component;