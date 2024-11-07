// Confetti.tsx
import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';

interface ConfettiProps {
    isActive: boolean;
}

const Confetti: React.FC<ConfettiProps> = ({ isActive }) => {
    useEffect(() => {
        if (isActive) {
            const duration = 1500;
            const end = Date.now() + duration;

            const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff'];

            (function frame() {
                confetti({
                    particleCount: 3,
                    angle: 60,
                    spread: 55,
                    origin: { x: 0, y: 0.6 },
                    colors: colors,
                });

                confetti({
                    particleCount: 3,
                    angle: 120,
                    spread: 55,
                    origin: { x: 1, y: 0.6 },
                    colors: colors,
                });

                if (Date.now() < end) {
                    requestAnimationFrame(frame);
                }
            }());
        }
    }, [isActive]);

    return null;
};

export default Confetti;