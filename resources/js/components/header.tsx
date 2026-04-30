'use client';
import { Link } from '@inertiajs/react';
import AppLogo from '@/components/app-logo';
import { MobileNav } from '@/components/mobile-nav';
import { Button } from '@/components/ui/button';
import { useScroll } from '@/hooks/use-scroll';
import { cn } from '@/lib/utils';
import { home, login, register } from '@/routes';

export const navLinks = [
    {
        label: 'Overview',
        href: '#overview',
    },
    {
        label: 'Workflow',
        href: '#workflow',
    },
    {
        label: 'Roles',
        href: '#roles',
    },
];

export function Header() {
    const scrolled = useScroll(10);

    return (
        <header
            className={cn(
                'sticky top-0 z-50 mx-auto w-full max-w-4xl border-b border-transparent md:rounded-md md:border md:transition-all md:ease-out',
                {
                    'border-border bg-background/95 backdrop-blur-sm supports-backdrop-filter:bg-background/50 md:top-2 md:max-w-3xl md:shadow':
                        scrolled,
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
                    <div>
                        {navLinks.map((link) => (
                            <Button
                                asChild
                                key={link.label}
                                size="sm"
                                variant="ghost"
                            >
                                <a href={link.href}>{link.label}</a>
                            </Button>
                        ))}
                    </div>
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
