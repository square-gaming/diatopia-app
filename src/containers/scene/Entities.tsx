import React from "react";
import Cow from "../../components/Cow";
import Goat from "../../components/Goat";
import Pig from "../../components/Pig";
import Sheep from "../../components/Sheep";
import { video } from "../../config/video";
import { Layer } from "../../types";

const Entities = ({ layer }: {
    layer: Layer;
}) => {
    const batch = layer?.images.map((image) => {
        switch (image.target.name) {
            case 'Cow':
                return <Cow
                    key={image.target.id}
                    id={image.target.id}
                    size={video.gridSize}
                    x={image.position.x}
                    y={image.position.y}
                />
            case 'Goat':
                return <Goat
                    key={image.target.id}
                    id={image.target.id}
                    size={video.gridSize}
                    x={image.position.x}
                    y={image.position.y}
                />
            case 'Pig':
                return <Pig
                    key={image.target.id}
                    id={image.target.id}
                    size={video.gridSize}
                    x={image.position.x}
                    y={image.position.y}
                />
            case 'Sheep':
                return <Sheep
                    key={image.target.id}
                    id={image.target.id}
                    size={video.gridSize}
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
