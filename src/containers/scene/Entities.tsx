import React from "react";
import Cow from "../../components/Cow";
import Goat from "../../components/Goat";
import Item from "../../components/Item";
import Pig from "../../components/Pig";
import Sheep from "../../components/Sheep";
import { video } from "../../config/video";
import { Layer } from "../../types";

const Entities = ({ layer }: {
    layer: Layer;
}) => {
    const batch = layer?.images.map((image) => {
        switch (image.target.id) {
            case 'diatopia:cow':
                return <Cow
                    key={image.target.uid}
                    id={image.target.uid}
                    size={video.gridSize}
                    x={image.position.x}
                    y={image.position.y}
                />
            case 'diatopia:goat':
                return <Goat
                    key={image.target.uid}
                    id={image.target.uid}
                    size={video.gridSize}
                    x={image.position.x}
                    y={image.position.y}
                />
            case 'diatopia:pig':
                return <Pig
                    key={image.target.uid}
                    id={image.target.uid}
                    size={video.gridSize}
                    x={image.position.x}
                    y={image.position.y}
                />
            case 'diatopia:sheep':
                return <Sheep
                    key={image.target.uid}
                    id={image.target.uid}
                    size={video.gridSize}
                    x={image.position.x}
                    y={image.position.y}
                />
            case 'diatopia:item':
                return <Item
                    key={image.target.uid}
                    id={image.target.item.id}
                    x={image.position.x}
                    y={image.position.y}
                />
            default:
                return null;
        }
    });

    return (
        <>{batch}</>
    );
};

export default Entities;
