import React from "react";
import { TilingSprite } from "@inlet/react-pixi";
import Wall from "../models/blocks/structure/Wall";
import wallPng from "../assets/Wall.png";

const Component = (data: Wall, size: number, x: number, y: number) => {
    const benchmark = -data.type * 96;
    const tilePosition = { x: 0, y: 0 };

    switch (data.pattern) {
        case Wall.PATTERNS.TOP_LEFT:
            tilePosition.x = 0;
            tilePosition.y = benchmark - 96;
            break;
        case Wall.PATTERNS.TOP_RIGHT:
            tilePosition.x = -64;
            tilePosition.y = benchmark - 96;
            break;
        case Wall.PATTERNS.BOTTOM_LEFT:
            tilePosition.x = 0;
            tilePosition.y = benchmark - 160;
            break;
        case Wall.PATTERNS.BOTTOM_RIGHT:
            tilePosition.x = -64;
            tilePosition.y = benchmark - 160;
            break;
        case Wall.PATTERNS.NORTH_SOUTH:
            tilePosition.x = 0;
            tilePosition.y = benchmark - 128;
            break;
        case Wall.PATTERNS.EAST_WEST:
            tilePosition.x = -32;
            tilePosition.y = benchmark - 96;
            break;
        case Wall.PATTERNS.INDIVIDUAL:
            tilePosition.x = -32;
            tilePosition.y = benchmark -128;
            break;
        case Wall.PATTERNS.INTERSECTION:
            tilePosition.x = -128;
            tilePosition.y = benchmark - 128;
            break;
        case Wall.PATTERNS.T:
            tilePosition.x = -128;
            tilePosition.y = benchmark - 96;
            break;
        case Wall.PATTERNS.T_90_DEG:
            tilePosition.x = -160;
            tilePosition.y = benchmark - 128;
            break;
        case Wall.PATTERNS.T_180_DEG:
            tilePosition.x = -128;
            tilePosition.y = benchmark - 160;
            break;
        case Wall.PATTERNS.T_270_DEG:
            tilePosition.x = -96;
            tilePosition.y = benchmark - 128;
            break;
        case Wall.PATTERNS.SURFACE:
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

export default Component;