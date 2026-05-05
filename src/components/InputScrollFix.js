'use client';

import { useEffect } from 'react';

export default function InputScrollFix() {
    useEffect(() => {
        const handleWheel = (e) => {
            if (document.activeElement.type === 'number') {
                document.activeElement.blur();
            }
        };

        window.addEventListener('wheel', handleWheel);

        return () => {
            window.removeEventListener('wheel', handleWheel);
        };
    }, []);

    return null;
}
