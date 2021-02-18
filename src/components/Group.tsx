import React from 'react';
import { Container } from '@inlet/react-pixi';
import { Layer } from '../types';

const Component = ({ layer, children }: {
    layer: Layer;
    children: JSX.Element[];
}) => {
    return (
        <Container key={layer.order}>
            {children}
        </Container>
    );
};

export default Component;