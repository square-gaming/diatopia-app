import React from 'react';
import { Stage } from '@inlet/react-pixi';

const Component = ({ width, height, children }: {
    width: number;
    height: number;
    children?: React.ReactNode
}) => {
    return (
        <Stage width={width} height={height}>
            {children}
        </Stage>
    );
};

export default Component;