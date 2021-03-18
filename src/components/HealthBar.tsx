import React from "react";
import { Container } from "@inlet/react-pixi";
import HitPoint from "./HitPoint";

const Component = ({point}: {
    point: number
}) => {
    const hitPoints = Array.from({
        length: Math.floor(point / 2)
    }, (v, i) => <HitPoint index={i} isFull={true} />);

    if (point % 2 === 1) {
        hitPoints.push(<HitPoint index={hitPoints.length} isFull={false} />);
    }

    return (
        <Container>
            {hitPoints}
        </Container>
    );
};

export default Component;