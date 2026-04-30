import { Link } from '@inertiajs/react';
import {
    ArrowRightIcon,
    ClipboardCheckIcon,
    ShieldCheckIcon,
    WrenchIcon,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { home, login, register } from '@/routes';

const workflowSteps = [
    {
        title: 'Submit a request',
        description:
            'Residents can describe the issue, set the priority, and share the location in a few clicks.',
    },
    {
        title: 'Coordinate technician work',
        description:
            'Technicians receive requests, review them, send offers, and update progress in one place.',
    },
    {
        title: 'Monitor the full lifecycle',
        description:
            'Admins can track every request from pending to completed with a clear history trail.',
    },
];

const roleHighlights = [
    {
        label: 'Residents',
        description: 'Report issues and follow every update.',
    },
    {
        label: 'Technicians',
        description: 'Review requests, send offers, and update work.',
    },
    {
        label: 'Admins',
        description: 'Manage users, technicians, and request history.',
    },
];

export default function Home() {
    return (
        <div className="min-h-screen overflow-hidden bg-background">
            <header className="relative z-20 mx-auto flex max-w-6xl items-center justify-between px-6 py-5 lg:px-8">
                <Link
                    className="flex items-center gap-2 font-semibold tracking-tight"
                    href={home()}
                >
                    <span className="flex size-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
                        <WrenchIcon className="size-4" />
                    </span>
                    MaintenanceMS
                </Link>

                <nav className="flex items-center gap-2">
                    <Button asChild size="sm" variant="ghost">
                        <Link href={login()}>Log in</Link>
                    </Button>
                    <Button asChild size="sm">
                        <Link href={register()}>Register</Link>
                    </Button>
                </nav>
            </header>

            <main className="grow">
                <HeroSection />
                <WorkflowSection />
            </main>
        </div>
    );
}

function HeroSection() {
    return (
        <section className="relative mx-auto w-full max-w-5xl px-6 lg:px-8">
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

function WorkflowSection() {
    return (
        <section className="relative border-t px-6 pt-6 pb-12 lg:px-8">
            <div className="mx-auto flex max-w-5xl flex-col gap-8">
                <div className="space-y-2 text-center">
                    <h2 className="text-lg font-medium tracking-tight text-muted-foreground md:text-xl">
                        Built for{' '}
                        <span className="text-foreground">
                            maintenance teams
                        </span>
                    </h2>
                    <p className="mx-auto max-w-2xl text-sm leading-6 text-muted-foreground">
                        Each role gets the tools needed to move a request
                        forward clearly.
                    </p>
                </div>

                <div className="grid gap-3 md:grid-cols-3">
                    {roleHighlights.map((role) => (
                        <div
                            key={role.label}
                            className="rounded-lg border bg-card p-4 shadow-xs"
                        >
                            <h3 className="font-medium">{role.label}</h3>
                            <p className="mt-2 text-sm leading-6 text-muted-foreground">
                                {role.description}
                            </p>
                        </div>
                    ))}
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                    {workflowSteps.map((step, index) => (
                        <div
                            key={step.title}
                            className="flex gap-4 rounded-lg border border-border/60 p-4"
                        >
                            <span className="flex size-8 shrink-0 items-center justify-center rounded-md bg-muted text-sm font-medium">
                                {index + 1}
                            </span>
                            <div>
                                <h3 className="font-medium">{step.title}</h3>
                                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                                    {step.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
