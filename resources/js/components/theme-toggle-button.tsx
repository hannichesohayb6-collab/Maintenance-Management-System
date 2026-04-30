import { MoonIcon, SunIcon } from 'lucide-react';

import { useAppearance } from '@/hooks/use-appearance';
import { Button } from '@/components/ui/button';

export function ThemeToggleButton() {
    const { appearance, updateAppearance } = useAppearance();
    const isDark = appearance === 'dark';

    const label = isDark ? 'Switch to light mode' : 'Switch to dark mode';

    return (
        <Button
            aria-label={label}
            className="relative"
            onClick={() => updateAppearance(isDark ? 'light' : 'dark')}
            size="icon-sm"
            type="button"
            variant="outline"
        >
            <SunIcon className="size-4 scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
            <MoonIcon className="absolute size-4 scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
        </Button>
    );
}
