import type { PropsWithChildren } from 'react';
import { Link } from '@inertiajs/react';

import AppLogo from '@/components/app-logo';
import { Header } from '@/components/header';
import { ThemeToggleButton } from '@/components/theme-toggle-button';
import { about, contact, home } from '@/routes';

const footerLinks = [
    { label: 'Home', href: home() },
    { label: 'About', href: about() },
    { label: 'Contact', href: contact() },
];

export default function PublicLayout({ children }: PropsWithChildren) {
    return (
        <div className="min-h-screen overflow-hidden bg-background text-foreground">
            <Header />

            <main className="grow pt-16">{children}</main>

            <footer className="border-t bg-background/95 px-6 py-8 lg:px-8">
                <div className="mx-auto flex max-w-5xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
                    <Link className="flex items-center gap-2" href={home()}>
                        <AppLogo />
                    </Link>

                    <nav className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                        {footerLinks.map((link) => (
                            <Link
                                className="rounded-md px-2 py-1 transition-colors hover:bg-muted hover:text-foreground"
                                href={link.href}
                                key={link.label}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>

                    <div className="flex items-center gap-3">
                        <p className="text-sm text-muted-foreground">
                            Maintenance workflows, clearly tracked.
                        </p>
                        <ThemeToggleButton />
                    </div>
                </div>
            </footer>
        </div>
    );
}
