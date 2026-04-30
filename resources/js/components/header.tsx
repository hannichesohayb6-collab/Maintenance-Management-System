'use client';
import { Link } from '@inertiajs/react';
import AppLogo from '@/components/app-logo';
import { MobileNav } from '@/components/mobile-nav';
import { ThemeToggleButton } from '@/components/theme-toggle-button';
import { Button } from '@/components/ui/button';
import { useScroll } from '@/hooks/use-scroll';
import { cn } from '@/lib/utils';
import { about, contact, home, login, register } from '@/routes';

export const navLinks = [
    {
        label: 'Overview',
        href: `${home.url()}#overview`,
    },
    {
        label: 'Workflow',
        href: `${home.url()}#workflow`,
    },
    {
        label: 'Roles',
        href: `${home.url()}#roles`,
    },
    {
        label: 'About',
        href: about(),
    },
    {
        label: 'Contact',
        href: contact(),
    },
];

export function Header() {
    const scrolled = useScroll(10);

    return (
        <header
            className={cn(
                'fixed inset-x-0 top-0 z-50 mx-auto w-full max-w-5xl border-b border-border/70 bg-background/95 backdrop-blur-sm supports-backdrop-filter:bg-background/80 md:top-2 md:rounded-md md:border md:transition-all md:ease-out',
                {
                    'md:max-w-4xl md:shadow': scrolled,
                },
            )}
        >
            <nav
                className={cn(
                    'flex h-14 w-full items-center justify-between px-4 md:h-12 md:transition-all md:ease-out',
                    {
                        'md:px-2': scrolled,
                    },
                )}
            >
                <Link
                    className="rounded-md p-2 hover:bg-muted dark:hover:bg-muted/50"
                    href={home()}
                >
                    <div className="flex items-center">
                        <AppLogo />
                    </div>
                </Link>
                <div className="hidden items-center gap-2 md:flex">
                    <div className="flex items-center gap-1">
                        {navLinks.map((link) => (
                            <Button
                                asChild
                                key={link.label}
                                size="sm"
                                variant="ghost"
                            >
                                <Link href={link.href}>{link.label}</Link>
                            </Button>
                        ))}
                    </div>
                    <ThemeToggleButton />
                    <Button asChild size="sm" variant="outline">
                        <Link href={login()}>Sign In</Link>
                    </Button>
                    <Button asChild size="sm">
                        <Link href={register()}>Get Started</Link>
                    </Button>
                </div>
                <MobileNav />
            </nav>
        </header>
    );
}
