import React, { memo } from "react";
import { TilingSprite } from "@inlet/react-pixi";
import Floor from "../models/blocks/Floor";
import floorPng from "../assets/Floor.png";

const Component = ({ type, pattern, size, x, y }: {
    type: number;
    pattern: number;
    size: number;
    x: number;
    y: number;
}) => {
    const benchmark = -type * 96;
    const tilePosition = { x: 0, y: 0 };

    switch (pattern) {
        case Floor.PATTERNS.GRID.TOP_LEFT:
            tilePosition.x = 0;
            tilePosition.y = benchmark - 96;
            break;
        case Floor.PATTERNS.GRID.TOP_CENTER:
            tilePosition.x = -32;
            tilePosition.y = benchmark - 96;
            break;
        case Floor.PATTERNS.GRID.TOP_RIGHT:
            tilePosition.x = -64;
            tilePosition.y = benchmark - 96;
            break;
        case Floor.PATTERNS.GRID.MIDDLE_LEFT:
            tilePosition.x = 0;
            tilePosition.y = benchmark - 128;
            break;
        case Floor.PATTERNS.GRID.MIDDLE_CENTER:
            tilePosition.x = -32;
            tilePosition.y = benchmark - 128;
            break;
        case Floor.PATTERNS.GRID.MIDDLE_RIGHT:
            tilePosition.x = -64;
            tilePosition.y = benchmark - 128;
            break;
        case Floor.PATTERNS.GRID.BOTTOM_LEFT:
            tilePosition.x = 0;
            tilePosition.y = benchmark - 160;
            break;
        case Floor.PATTERNS.GRID.BOTTOM_CENTER:
            tilePosition.x = -32;
            tilePosition.y = benchmark - 160;
            break;
        case Floor.PATTERNS.GRID.BOTTOM_RIGHT:
            tilePosition.x = -64;
            tilePosition.y = benchmark - 160;
            break;
        case Floor.PATTERNS.VERTICAL.TOP:
            tilePosition.x = -96;
            tilePosition.y = benchmark - 96;
            break;
        case Floor.PATTERNS.VERTICAL.MIDDLE:
            tilePosition.x = -96;
            tilePosition.y = benchmark - 128;
            break;
        case Floor.PATTERNS.VERTICAL.BOTTOM:
            tilePosition.x = -96;
            tilePosition.y = benchmark - 160;
            break;
        case Floor.PATTERNS.HORIZONTAL.LEFT:
            tilePosition.x = -128;
            tilePosition.y = benchmark - 128;
            break;
        case Floor.PATTERNS.HORIZONTAL.MIDDLE:
            tilePosition.x = -160;
            tilePosition.y = benchmark - 128;
            break;
        case Floor.PATTERNS.HORIZONTAL.RIGHT:
            tilePosition.x = -192;
            tilePosition.y = benchmark - 128;
            break;
        case Floor.PATTERNS.INDIVIDUAL:
            tilePosition.x = -160;
            tilePosition.y = benchmark - 96;
            break;
        case Floor.PATTERNS.INTERSECTION:
            tilePosition.x = -160;
            tilePosition.y = benchmark - 160;
            break;
        default:
            break;
    }
    return (
        <TilingSprite
            key={`Floor(${x},${y})`}
            image={floorPng}
            tilePosition={tilePosition}
            width={size}
            height={size}
            x={x}
            y={y}
        />
    );
};

export default memo(Component);