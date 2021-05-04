import React from 'react';
import { Container } from '@inlet/react-pixi';
import { video } from '../../config/video';
import HotBarGrid from './HotBarGrid';
import { selectPlayerInventory } from '../../features/world/worldSlice';
import { useAppSelector } from '../../app/hooks';

const HotBar = ({ gridNumber }: {
  gridNumber: number;
}) => {
  const inventory = useAppSelector(selectPlayerInventory);
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
    </Container>
  );
};

export default HotBar;
