import React, { memo } from "react";
import { Sprite } from "@inlet/react-pixi";
import itemModel from "../constants/itemModel";
import useIteration from "../hooks/useIteration";

const Item = ({ id, x, y }: {
    id: string;
    x: number;
    y: number;
}) => {
    const compensation = 8;
    const shift = 2 * Math.sin(useIteration());
    const rotation = Math.cos(useIteration(0.05));
    
    return (
        <Sprite
            image={itemModel[id]}
            x={compensation + x}
            y={compensation + y + shift}
            scale={[rotation, 1]}
            anchor={0.5}
        />
    );
};

export default memo(Item);