import React from 'react';
import { Container } from '@inlet/react-pixi';
import HealthBar from './HUD/HealthBar';
import HotBar from './HUD/HotBar';
import { selectPlayer } from '../features/world/worldSlice';
import { useAppSelector } from '../app/hooks';

const UserInterface = () => {
    const player = useAppSelector(selectPlayer);

    return (
        <Container>
            <HealthBar point={player.health} />
            <HotBar gridNumber={4} />
        </Container>
    );
};

export default UserInterface;
