import React from "react";
import { Text, Container, Sprite } from "@inlet/react-pixi";
import hotbargridPng from "../../assets/hotbargrid.png";
import { TextStyle } from "pixi.js";
import itemModel from "../../constants/itemModel";

const HotBarGrid = ({ count, slot, id, position }: {
    count?: number;
    slot?: number;
    id?: string;
    position: [number, number]
}) => {
    return (
        <Container position={position}>
            <Sprite image={hotbargridPng} />
            {id && <Sprite image={itemModel[id]} anchor={0.5} position={[16, 16]} />}
            {count && <Text isSprite anchor={0.5} position={[24, 20]} text={count.toString()} style={new TextStyle({fontSize: 14, fill: '#fff'})} />}
        </Container>
    );
};

export default HotBarGrid;
