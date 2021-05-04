import React from 'react';
import { Container } from '@inlet/react-pixi';
import HitPoint from './HitPoint';

const HealthBar = ({ point }: { point: number }) => {
  const hitPoints = Array.from(
    {
      length: Math.floor(point / 2),
    },
    (v, i) => <HitPoint index={i} isFull={true} key={i} />
  );

  if (point % 2 === 1) {
    hitPoints.push(
      <HitPoint
        index={hitPoints.length}
        isFull={false}
        key={hitPoints.length}
      />
    );
  }

  return <Container>{hitPoints}</Container>;
};

export default HealthBar;
