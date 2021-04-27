import React from "react";
import Cow from "../../components/Cow";
import Door from "../../components/Door";
import Floor from '../../components/Floor';
import Goat from "../../components/Goat";
import Pig from "../../components/Pig";
import Player from "../../components/Player";
import Sheep from "../../components/Sheep";
import Torch from "../../components/Torch";
import Wall from '../../components/Wall';
import { video } from "../../config/video";
import { Layer } from "../../types";

const withScene = (Comp: React.ComponentType<any>, name: string) => ({ layer }: {
    layer: Layer;
}) => {
    const batch = layer?.images.map((image) =>
        <Comp
            key={image.target.id ? image.target.id : `${name}(${image.position.x},${image.position.y})`}
            type={image.target.type}
            pattern={image.target.pattern}
            isOpen={image.target.isOpen}
            size={video.gridSize}
            x={image.position.x}
            y={image.position.y}
        />
    );

    return (
        <>{batch}</>
    );
};

const Floors = withScene(Floor, 'Floor');
const Walls = withScene(Wall, 'Wall');
const Doors = withScene(Door, 'Door');
const Players = withScene(Player, 'Player');
const Cows = withScene(Cow, 'Cow');
const Goats = withScene(Goat, 'Goat');
const Pigs = withScene(Pig, 'Pig');
const Sheeps = withScene(Sheep, 'Sheep');
const Torchs = withScene(Torch, 'Torch');

export {
    Floors,
    Walls,
    Doors,
    Players,
    Cows,
    Goats,
    Pigs,
    Sheeps,
    Torchs,
};
export default withScene;