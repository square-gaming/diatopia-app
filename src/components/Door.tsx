import React from "react";
import { TilingSprite } from "@inlet/react-pixi";
import Door from "../models/blocks/structure/Door";
import doorClosePng from '../assets/Door0.png'; 
import doorOpenPng from '../assets/Door1.png'; 

const Component = (data: Door, size: number, x: number, y: number) => {
    const benchmark = -data.type * 32;
    const tilePosition = { x: 0, y: 0 };
    
    switch (data.pattern) {
        case Door.PATTERNS.NORTH_SOUTH:
            tilePosition.x = 0;
            tilePosition.y = benchmark;
            break;
        case Door.PATTERNS.EAST_WEST:
            tilePosition.x = -32;
            tilePosition.y = benchmark;
            break;
        default:
            break;
    }
    
    return (
        <TilingSprite
            key={`Door(${x},${y})`}
            image={data.isOpen ? doorOpenPng : doorClosePng}
            tilePosition={tilePosition}
            width={size}
            height={size}
            x={x}
            y={y}
        />
    );
};

export default Component;