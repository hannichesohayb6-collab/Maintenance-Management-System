import type React from 'react';

import { cn } from '@/lib/utils';

type InfiniteSliderProps = {
    children: React.ReactNode;
    gap?: number;
    speed?: number;
    speedOnHover?: number;
    direction?: 'horizontal' | 'vertical';
    reverse?: boolean;
    className?: string;
};

type SliderStyle = React.CSSProperties & {
    '--infinite-slider-gap': string;
    '--infinite-slider-duration': string;
};

export function InfiniteSlider({
    children,
    gap = 16,
    speed = 80,
    speedOnHover,
    direction = 'horizontal',
    reverse = false,
    className,
}: InfiniteSliderProps) {
    const duration = `${Math.max(8, 1200 / speed)}s`;
    const hoverDuration = speedOnHover
        ? `${Math.max(8, 1200 / speedOnHover)}s`
        : undefined;

    return (
        <div
            className={cn('overflow-hidden', className)}
            style={
                {
                    '--infinite-slider-gap': `${gap}px`,
                    '--infinite-slider-duration': duration,
                } as SliderStyle
            }
        >
            <div
                className={cn(
                    'flex w-max gap-[var(--infinite-slider-gap)] will-change-transform',
                    'animate-[infinite-slider-horizontal_var(--infinite-slider-duration)_linear_infinite]',
                    direction === 'vertical' &&
                        'flex-col animate-[infinite-slider-vertical_var(--infinite-slider-duration)_linear_infinite]',
                    reverse && '[animation-direction:reverse]',
                    speedOnHover &&
                        'hover:[animation-duration:var(--infinite-slider-hover-duration)]',
                )}
                style={
                    {
                        '--infinite-slider-hover-duration': hoverDuration,
                    } as React.CSSProperties
                }
            >
                <div className="flex shrink-0 gap-[var(--infinite-slider-gap)]">
                    {children}
                </div>
                <div
                    aria-hidden="true"
                    className="flex shrink-0 gap-[var(--infinite-slider-gap)]"
                >
                    {children}
                </div>
            </div>
        </div>
    );
}
