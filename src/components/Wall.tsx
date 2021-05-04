import React, { memo } from "react";
import { TilingSprite } from "@inlet/react-pixi";
import WallClass from "../models/blocks/structure/Wall";
import wallPng from "../assets/Wall.png";

const Wall = ({ type, pattern, size, x, y }: {
    type: number;
    pattern: number
    size: number;
    x: number;
    y: number;
}) => {
    const benchmark = -type * 96;
    const tilePosition = { x: 0, y: 0 };

    switch (pattern) {
        case WallClass.PATTERNS.TOP_LEFT:
            tilePosition.x = 0;
            tilePosition.y = benchmark - 96;
            break;
        case WallClass.PATTERNS.TOP_RIGHT:
            tilePosition.x = -64;
            tilePosition.y = benchmark - 96;
            break;
        case WallClass.PATTERNS.BOTTOM_LEFT:
            tilePosition.x = 0;
            tilePosition.y = benchmark - 160;
            break;
        case WallClass.PATTERNS.BOTTOM_RIGHT:
            tilePosition.x = -64;
            tilePosition.y = benchmark - 160;
            break;
        case WallClass.PATTERNS.NORTH_SOUTH:
            tilePosition.x = 0;
            tilePosition.y = benchmark - 128;
            break;
        case WallClass.PATTERNS.EAST_WEST:
            tilePosition.x = -32;
            tilePosition.y = benchmark - 96;
            break;
        case WallClass.PATTERNS.INDIVIDUAL:
            tilePosition.x = -32;
            tilePosition.y = benchmark -128;
            break;
        case WallClass.PATTERNS.INTERSECTION:
            tilePosition.x = -128;
            tilePosition.y = benchmark - 128;
            break;
        case WallClass.PATTERNS.T:
            tilePosition.x = -128;
            tilePosition.y = benchmark - 96;
            break;
        case WallClass.PATTERNS.T_90_DEG:
            tilePosition.x = -160;
            tilePosition.y = benchmark - 128;
            break;
        case WallClass.PATTERNS.T_180_DEG:
            tilePosition.x = -128;
            tilePosition.y = benchmark - 160;
            break;
        case WallClass.PATTERNS.T_270_DEG:
            tilePosition.x = -96;
            tilePosition.y = benchmark - 128;
            break;
        case WallClass.PATTERNS.SURFACE:
            tilePosition.x = -96;
            tilePosition.y = benchmark -96;
            break;
        default:
            break;
    }
    return (
        <TilingSprite
            key={`Wall(${x},${y})`}
            image={wallPng}
            tilePosition={tilePosition}
            width={size}
            height={size}
            x={x}
            y={y}
        />
    );
};

export default memo(Wall);