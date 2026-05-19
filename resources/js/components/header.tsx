'use client';
import { Link } from '@inertiajs/react';
import { ClipboardList, Home, Info, Mail } from 'lucide-react';
import AppLogo from '@/components/app-logo';
import { MobileNav } from '@/components/mobile-nav';
import { ThemeToggleButton } from '@/components/theme-toggle-button';
import { Button } from '@/components/ui/button';
import { useCurrentUrl } from '@/hooks/use-current-url';
import { useScroll } from '@/hooks/use-scroll';
import { cn } from '@/lib/utils';
import {
    about,
    availableRequests,
    contact,
    home,
    login,
    register,
} from '@/routes';

export const navLinks = [
    {
        label: 'Home',
        href: home.url(),
        icon: Home,
    },
    {
        label: ' Requests',
        href: availableRequests.url(),
        icon: ClipboardList,
    },
    {
        label: 'Contact',
        href: contact.url(),
        icon: Mail,
    },
    {
        label: 'About',
        href: about.url(),
        icon: Info,
    },
];

export function Header() {
    const scrolled = useScroll(10);
    const { isCurrentUrl } = useCurrentUrl();

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
                <Link className="rounded-md p-2" href={home()}>
                    <div className="flex items-center">
                        <AppLogo />
                    </div>
                </Link>
                <div className="hidden items-center gap-2 md:flex">
                    <div className="flex items-center gap-1">
                        {navLinks.map((link) => (
                            <Link
                                className={cn(
                                    'inline-flex h-8 items-center justify-center gap-2 rounded-full px-3 text-sm font-medium transition-colors',
                                    isCurrentUrl(link.href)
                                        ? 'bg-primary text-primary-foreground shadow-sm'
                                        : 'text-muted-foreground hover:bg-accent hover:text-foreground',
                                )}
                                href={link.href}
                                key={link.label}
                            >
                                <link.icon className="size-4" />
                                <span>{link.label}</span>
                            </Link>
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
