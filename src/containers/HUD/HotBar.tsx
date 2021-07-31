import React from 'react';
import { Container, Sprite } from '@inlet/react-pixi';
import { video } from '../../config/video';
import HotBarGrid from './HotBarGrid';
import { selectSelectedItemSlot, selectPlayerInventory } from '../../features/world/worldSlice';
import { useAppSelector } from '../../app/hooks';
import hotbargridFocusPng from "../../assets/hotbargrid_focus.png";

const HotBar = ({ gridNumber }: {
  gridNumber: number;
}) => {
  const inventory = useAppSelector(selectPlayerInventory);
  const selectedItemSlot = useAppSelector(selectSelectedItemSlot);
  const grids = Array.from(
    { length: gridNumber },
    (_v, i) => <HotBarGrid
      key={i}
      {...inventory.find(item => item.slot === i)}
      position={[i * video.gridSize - Math.floor(gridNumber / 2) * video.gridSize, 0]}
    />
  );

  return (
    <Container position={[video.gridSize * 7 / 2, video.gridSize * 6]}>
      {grids}
      <Sprite
        image={hotbargridFocusPng}
        position={[(selectedItemSlot - 1) * video.gridSize - Math.floor(gridNumber / 2) * video.gridSize, 0]}
        anchor={[0.5, 0.5]}
      />
    </Container>
  );
};

export default HotBar;
