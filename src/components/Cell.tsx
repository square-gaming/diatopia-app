import React from 'react';
import styled from 'styled-components';
import { CellProps, FloorViewProps, StructureViewProps } from '../types/components';
import Player from '../models/Player';
import Floor from '../models/blocks/Floor';
import Wall from '../models/blocks/structure/Wall';
import floorPng from '../assets/Floor.png';
import wallPng from '../assets/Wall.png';
import doorClosePng from '../assets/Door0.png'; 
import doorOpenPng from '../assets/Door1.png'; 
import playerPng from '../assets/Player0.png';
import Door from '../models/blocks/structure/Door';

const Wrapper = styled.td`
    position: relative;
    width: 32px;
    height: 32px;
    min-width: 32px;
    max-width: 32px;
    min-height: 32px;
    max-height: 32px;
`;
const FloorView = styled.div<FloorViewProps>`
position: absolute;
top: 0;
left: 0;
width: 100%;
height: 100%;
background: ${({info}) => {
    switch (info.type) {
        case Floor.TYPES.PLAIN:
            return `url(${floorPng}) -256px -224px`;
        case Floor.TYPES.TILE:
            return `url(${floorPng}) -32px -224px`;
        default:
            return 'black';
    }
}};
`;
const StructureView = styled.div<StructureViewProps>`
position: absolute;
top: 0;
left: 0;
width: 100%;
height: 100%;
background: ${({info}) => {
        let image;
        let benchmark;
        if (info === null) {
            return 'transparent';
        } else if (info instanceof Door) {
            image = `url(${info.isOpen ? doorOpenPng : doorClosePng})`;
            benchmark = -info.type*32;
            switch (info.pattern) {
                case Door.PATTERNS.NORTH_SOUTH:
                    return image+` 0 ${benchmark}px;`
                case Door.PATTERNS.EAST_WEST:
                    return image+` -32px ${benchmark}px;`
                default:
                    break;
            }
        } else if (info instanceof Wall) {
            image = `url(${wallPng})`;
            benchmark = -info.type*96;
            switch (info.pattern) {
                case Wall.PATTERNS.TOP_LEFT:
                    return image+` 0 ${benchmark-96}px;`
                case Wall.PATTERNS.TOP_RIGHT:
                    return image+` -64px ${benchmark-96}px;`
                case Wall.PATTERNS.BOTTOM_LEFT:
                    return image+` 0 ${benchmark-160}px;`
                case Wall.PATTERNS.BOTTOM_RIGHT:
                    return image+` -64px ${benchmark-160}px;`
                case Wall.PATTERNS.NORTH_SOUTH:
                    return image+` 0 ${benchmark-128}px;`
                case Wall.PATTERNS.EAST_WEST:
                    return image+` -32px ${benchmark-96}px;`
                default:
                    break;
            }
        } else if (info instanceof Player) {
            return `url(${playerPng}) 0 0;`;
        } else {
            return 'black';
        }
    }};
`;
const Cell = ({floor, structure}: CellProps) => {
    return (
        <Wrapper>
            <FloorView info={floor} />
            <StructureView info={structure} />
        </Wrapper>
    );
};

export default Cell;