import React, { memo } from "react";
import { TilingSprite } from "@inlet/react-pixi";
import DoorClass from "../models/blocks/structure/Door";
import doorClosePng from '../assets/Door0.png'; 
import doorOpenPng from '../assets/Door1.png'; 

const Door = ({ type, pattern, isOpen, size, x, y }: {
    type: number;
    pattern: number;
    isOpen: boolean;
    size: number;
    x: number;
    y: number;
}) => {
    const benchmark = -type * 32;
    const tilePosition = { x: 0, y: 0 };
    
    switch (pattern) {
        case DoorClass.PATTERNS.NORTH_SOUTH:
            tilePosition.x = 0;
            tilePosition.y = benchmark;
            break;
        case DoorClass.PATTERNS.EAST_WEST:
            tilePosition.x = -32;
            tilePosition.y = benchmark;
            break;
        default:
            break;
    }
    
    return (
        <TilingSprite
            key={`Door(${x},${y})`}
            image={isOpen ? doorOpenPng : doorClosePng}
            tilePosition={tilePosition}
            width={size}
            height={size}
            x={x}
            y={y}
        />
    );
};

export default memo(Door);