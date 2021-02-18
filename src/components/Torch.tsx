import React from "react";
import { TilingSprite } from "@inlet/react-pixi";
import torchPng from '../assets/Torch.png'; 
import Torch from "../models/blocks/light/Torch";

const Component = (data: Torch, size: number, x: number, y: number) => {
    const tilePosition = { x: 0, y: 0 };

    return (
        <TilingSprite
            key={`Torch(${x},${y})`}
            image={torchPng}
            tilePosition={tilePosition}
            width={size}
            height={size}
            x={x}
            y={y}
        />
    );
};

export default Component;