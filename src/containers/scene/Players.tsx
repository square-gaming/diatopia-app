import React from "react";
import Player from "../../components/Player";
import { video } from "../../config/video";
import { Layer } from "../../types";

const Players = ({ layer }: {
    layer: Layer;
}) => {
    const batch = layer?.images.map((image) =>
        <Player
            key={image.target.uid}
            id={image.target.uid}
            size={video.gridSize}
            x={image.position.x}
            y={image.position.y}
        />
    );

    return (
        <>{batch}</>
    );
};

export default Players;
