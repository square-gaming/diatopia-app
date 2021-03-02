import React from "react";
import { TilingSprite } from "@inlet/react-pixi";
import QuadrupedPng from '../assets/Quadruped0.png';
import Cow from "../models/entity/mobs/Cow";

const Component = (data: Cow, size: number, x: number, y: number) => {
    const tilePosition = { x: -32, y: -32 };

    return (
        <TilingSprite
            key={data.id}
            image={QuadrupedPng}
            tilePosition={tilePosition}
            width={size}
            height={size}
            x={x}
            y={y}
        />
    );
};

export default Component;