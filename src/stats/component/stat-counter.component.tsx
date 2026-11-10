'use client';

import { useEffect, useRef } from 'react';

interface Props {
    readonly value: number;
}

const format = new Intl.NumberFormat('en-US');

export function StatCounter({ value }: Props) {
    const ref = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        const element = ref.current;
        if (!element || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            return undefined;
        }
        if (element.getBoundingClientRect().top < window.innerHeight) {
            return undefined;
        }
        let frame = 0;
        element.textContent = '0';
        const observer = new IntersectionObserver(
            entries => {
                if (!entries.some(entry => entry.isIntersecting)) {
                    return;
                }
                observer.disconnect();
                const start = performance.now();
                const tick = (now: number): void => {
                    const progress = Math.min((now - start) / 1700, 1);
                    element.textContent = format.format(Math.round(value * (1 - (1 - progress) ** 4)));
                    if (progress < 1) {
                        frame = window.requestAnimationFrame(tick);
                    }
                };
                frame = window.requestAnimationFrame(tick);
            },
            { threshold: 0.5 }
        );
        observer.observe(element);

        return () => {
            observer.disconnect();
            window.cancelAnimationFrame(frame);
        };
    }, [value]);

    return (
        <span ref={ref} aria-hidden="true">
            {format.format(value)}
        </span>
    );
}
