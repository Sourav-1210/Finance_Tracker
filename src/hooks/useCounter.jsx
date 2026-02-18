import { useState, useEffect } from 'react';

export const useCounter = (end, duration = 600, start = 0) => {
    const [count, setCount] = useState(start);

    useEffect(() => {
        if (start === end) return;

        const increment = (end - start) / (duration / 16); // 60fps
        let current = start;

        const timer = setInterval(() => {
            current += increment;
            if ((increment > 0 && current >= end) || (increment < 0 && current <= end)) {
                setCount(end);
                clearInterval(timer);
            } else {
                setCount(Math.floor(current));
            }
        }, 16);

        return () => clearInterval(timer);
    }, [end, duration, start]);

    return count;
};
