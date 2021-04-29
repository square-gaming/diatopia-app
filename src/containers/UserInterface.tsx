import React from 'react';
import { Container } from '@inlet/react-pixi';
import HealthBar from '../components/HealthBar';
import { selectPlayer } from '../features/world/worldSlice';
import { useAppSelector } from '../app/hooks';

const UserInterface = () => {
    const player = useAppSelector(selectPlayer);

    return (
        <Container>
            <HealthBar point={player.health} />
        </Container>
    );
};

export default UserInterface;