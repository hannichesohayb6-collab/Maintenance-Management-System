import { Link } from '@inertiajs/react';
import {
    ArrowRightIcon,
    ClipboardCheckIcon,
    ShieldCheckIcon,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { login, register } from '@/routes';

export function HeroSection() {
    return (
        <section
            className="relative mx-auto w-full max-w-5xl scroll-mt-24 px-6 lg:px-8"
            id="overview"
        >
            <div
                aria-hidden="true"
                className="absolute inset-x-0 -top-24 hidden h-80 bg-[radial-gradient(50%_70%_at_50%_0%,color-mix(in_oklab,var(--foreground)_10%,transparent),transparent)] lg:block"
            />

            <div
                aria-hidden="true"
                className="absolute inset-0 mx-auto hidden min-h-screen w-full max-w-5xl lg:block"
            >
                <div className="absolute inset-y-0 left-0 z-10 h-full w-px bg-gradient-to-b from-border via-border/80 to-transparent" />
                <div className="absolute inset-y-0 right-0 z-10 h-full w-px bg-gradient-to-b from-border via-border/80 to-transparent" />
            </div>

            <div className="relative flex flex-col items-center justify-center gap-5 pt-24 pb-24 text-center sm:pt-28 lg:pt-32">
                <div
                    aria-hidden="true"
                    className="absolute inset-0 -z-10 size-full overflow-hidden"
                >
                    <div className="absolute inset-y-0 left-4 w-px bg-gradient-to-b from-transparent via-border to-border md:left-8" />
                    <div className="absolute inset-y-0 right-4 w-px bg-gradient-to-b from-transparent via-border to-border md:right-8" />
                    <div className="absolute inset-y-0 left-8 w-px bg-gradient-to-b from-transparent via-border/50 to-border/50 md:left-12" />
                    <div className="absolute inset-y-0 right-8 w-px bg-gradient-to-b from-transparent via-border/50 to-border/50 md:right-12" />
                </div>

                <Link
                    className={cn(
                        'group mx-auto flex w-fit items-center gap-3 rounded-full border bg-card px-3 py-1 shadow-sm',
                        'animate-in transition-all delay-500 duration-500 ease-out fill-mode-backwards slide-in-from-bottom-10 fade-in',
                    )}
                    href={register()}
                >
                    <ClipboardCheckIcon className="size-3 text-muted-foreground" />
                    <span className="text-xs">
                        Requests, offers, and progress in one workflow
                    </span>
                    <span className="block h-5 border-l" />
                    <ArrowRightIcon className="size-3 duration-150 ease-out group-hover:translate-x-1" />
                </Link>

                <h1
                    className={cn(
                        'animate-in text-4xl font-semibold tracking-tight text-balance delay-100 duration-500 ease-out fill-mode-backwards slide-in-from-bottom-10 fade-in md:text-5xl lg:text-6xl',
                        'text-shadow-[0_0px_50px_color-mix(in_oklab,var(--foreground)_20%,transparent)]',
                    )}
                >
                    Manage maintenance requests from report to resolution.
                </h1>

                <p className="mx-auto max-w-2xl animate-in text-base leading-7 text-muted-foreground delay-200 duration-500 ease-out fill-mode-backwards slide-in-from-bottom-10 fade-in sm:text-lg md:text-xl">
                    A focused system for residents, technicians, and admins to
                    submit requests, coordinate offers, assign work, and track
                    status updates without losing context.
                </p>

                <div className="flex animate-in flex-row flex-wrap items-center justify-center gap-3 pt-2 delay-300 duration-500 ease-out fill-mode-backwards slide-in-from-bottom-10 fade-in">
                    <Button
                        asChild
                        className="rounded-full"
                        size="lg"
                        variant="secondary"
                    >
                        <Link href={login()}>
                            <ShieldCheckIcon />
                            Access dashboard
                        </Link>
                    </Button>
                    <Button asChild className="rounded-full" size="lg">
                        <Link href={register()}>
                            Create an account
                            <ArrowRightIcon />
                        </Link>
                    </Button>
                </div>
            </div>
        </section>
    );
}
