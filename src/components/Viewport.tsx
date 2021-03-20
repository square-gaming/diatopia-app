import React, { useContext } from 'react';
import { Stage } from '@inlet/react-pixi';
import { StoreContext } from '../context/store';
import { StoreState } from '../types/context';

const Component = ({ width, height, children }: {
    width: number;
    height: number;
    children?: React.ReactNode
}) => {
    const { rendererRef } = useContext<StoreState>(StoreContext)
    const handleOnMount = ({renderer}: PIXI.Application) => {
        rendererRef.current = renderer;
    };

    return (
        <Stage width={width} height={height} onMount={handleOnMount}>
            {children}
        </Stage>
    );
};

export default Component;