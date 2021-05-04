import React, { memo } from "react";
import { TilingSprite } from "@inlet/react-pixi";
import QuadrupedPng from "../assets/Quadruped0.png";

const Component = ({ id, size, x, y }: {
  id: string;
  size: number;
  x: number;
  y: number;
}) => {
  const tilePosition = { x: -32, y: -32 * 2 };

  return (
    <TilingSprite
      key={id}
      image={QuadrupedPng}
      tilePosition={tilePosition}
      width={size}
      height={size}
      x={x}
      y={y}
    />
  );
};

export default memo(Component);
