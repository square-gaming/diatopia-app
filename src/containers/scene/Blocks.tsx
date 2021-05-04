import React from "react";
import Door from "../../components/Door";
import Floor from "../../components/Floor";
import Torch from "../../components/Torch";
import Wall from "../../components/Wall";
import { video } from "../../config/video";
import { Layer } from "../../types";

const Blocks = ({ layer }: {
    layer: Layer;
}) => {
    const batch = layer?.images.map((image) => {
        switch (image.target.name) {
            case 'Floor':
                return <Floor
                    key={`${image.target.name}(${image.position.x},${image.position.y})`}
                    type={image.target.type}
                    pattern={image.target.pattern}
                    size={video.gridSize}
                    x={image.position.x}
                    y={image.position.y}
                />
            case 'Door':
                return <Door
                    key={`${image.target.name}(${image.position.x},${image.position.y})`}
                    type={image.target.type}
                    pattern={image.target.pattern}
                    isOpen={image.target.isOpen}
                    size={video.gridSize}
                    x={image.position.x}
                    y={image.position.y}
                />
            case 'Wall':
                return <Wall
                    key={`${image.target.name}(${image.position.x},${image.position.y})`}
                    type={image.target.type}
                    pattern={image.target.pattern}
                    size={video.gridSize}
                    x={image.position.x}
                    y={image.position.y}
                />
            case 'Torch':
                return <Torch
                    key={`${image.target.name}(${image.position.x},${image.position.y})`}
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

export default Blocks;
