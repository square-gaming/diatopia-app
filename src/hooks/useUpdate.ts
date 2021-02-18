import { useEffect, useRef, useCallback } from 'react';

const useUpdate = (fps: number, callback: (...arg: any[]) => void) => {
    // Use useRef for mutable variables that we want to persist
    // without triggering a re-render on their change
    const fpsInterval = 1000 / fps;
    const startTime = Date.now();
    const requestRef = useRef(0);
    const thenRef = useRef(startTime);
    const nowRef = useRef(startTime);

    const animate = useCallback(() => {
        nowRef.current = Date.now();

        let elapsed = nowRef.current - thenRef.current;

        if (elapsed > fpsInterval) {
            thenRef.current = nowRef.current - (elapsed % fpsInterval);
            callback();
        }

        requestRef.current = requestAnimationFrame(animate);
    }, [callback, fpsInterval])

    useEffect(() => {
        requestRef.current = requestAnimationFrame(animate);

        return () => cancelAnimationFrame(requestRef.current);
    }, [animate]);
}

export default useUpdate;