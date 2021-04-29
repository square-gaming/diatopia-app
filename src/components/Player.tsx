import React, { memo } from "react";
import { TilingSprite } from "@inlet/react-pixi";
import playerPng from '../assets/Player0.png';

const Component = ({ id, size, x, y }: {
    id: string;
    size: number;
    x: number;
    y: number;
}) => {
    const tilePosition = { x: 0, y: 0 };

    return (
        <TilingSprite
            key={id}
            image={playerPng}
            tilePosition={tilePosition}
            width={size}
            height={size}
            x={x}
            y={y}
        />
    );
};

export default memo(Component);