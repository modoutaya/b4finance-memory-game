import { useState, useEffect, useRef } from 'react';

export const useProgress = (maxTimeInSeconds: number): [number, (() => void)] => {
    const [elapsedTime, setElapsedTime] = useState(0);
    const [progress, setProgress] = useState(0);
    const timeout = useRef<NodeJS.Timeout>(setInterval(() => { }));
    useEffect(() => {
        timeout.current = setInterval(() => {
            if (progress < 1) {
                setElapsedTime(t => t + 1);
            }
        }, 1000);

        return () => clearInterval(timeout.current);
    }, [progress]);

    useEffect(() => {
        setProgress(elapsedTime / maxTimeInSeconds);

        if(elapsedTime >= maxTimeInSeconds) {
            clearInterval(timeout.current);
        }
    }, [elapsedTime, maxTimeInSeconds]);

    const stopProgressBar = () => clearInterval(timeout.current);

    return [progress * 100, stopProgressBar];
};