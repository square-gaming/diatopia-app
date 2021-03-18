import React from "react";
import { TilingSprite } from "@inlet/react-pixi";
import GUIPng from '../assets/GUI0.png'; 

const Component = ({index, isFull}: {
    index: number,
    isFull: boolean
}) => {
    const tilePosition = { x: isFull ? 0 : -16, y: -16 };

    return (
        <TilingSprite
            key={index}
            image={GUIPng}
            tilePosition={tilePosition}
            width={16}
            height={16}
            x={index * 16}
        />
    );
};

export default Component;
