import type { ComponentProps } from 'react';
import { cn } from '@/lib/utils';
import appLogo from '@/images/app-logo.png';

export default function AppLogoIcon({
    alt = 'Fixly',
    className,
    ...props
}: ComponentProps<'img'>) {
    return (
        <img
            {...props}
            alt={alt}
            className={cn('block h-auto w-auto object-contain', className)}
            src={appLogo}
        />
    );
}
