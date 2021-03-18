import React from 'react';
import { Container } from '@inlet/react-pixi';
import { World } from '../types/reducers';
import HealthBar from '../components/HealthBar';

const UserInterface = ({worldRef}: {
    worldRef: React.MutableRefObject<World>;
}) => {
    return (
        <Container>
            <HealthBar point={worldRef.current.player.health} />
        </Container>
    );
};

export default UserInterface;