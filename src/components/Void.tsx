import React from 'react';
import { Graphics } from '@inlet/react-pixi';

const Component = (data: any, size: number, x: number, y: number) => {
    return <Graphics key={`(${x},${y})`} draw={g => {
        g.clear();
        g.beginFill(0, 0);
        g.drawRect(x, y, size, size);
        g.endFill();
    }} />;
}

export default Component;