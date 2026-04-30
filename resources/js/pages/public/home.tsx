import { Link } from '@inertiajs/react';
import { Header } from '@/components/header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { login, register } from '@/routes';

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

export default function Home() {
    return (
        <div className="min-h-screen bg-background">
            <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-6 lg:px-8">
                <Header />

                <div className="flex flex-col gap-12 py-4">
                    <section
                        id="overview"
                        className="grid scroll-mt-24 gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center"
                    >
                        <div className="space-y-6">
                            <div className="space-y-3">
                                <p className="text-sm font-medium tracking-[0.2em] text-muted-foreground uppercase">
                                    Maintenance Management System
                                </p>
                                <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
                                    Track maintenance requests from report to
                                    resolution.
                                </h1>
                                <p className="max-w-2xl text-base text-muted-foreground sm:text-lg">
                                    A focused workflow for residents,
                                    technicians, and admins to manage requests,
                                    offers, assignments, and status updates
                                    without losing context.
                                </p>
                            </div>

                            <div className="flex flex-wrap gap-3">
                                <Button asChild size="lg">
                                    <Link href={login()}>Log in</Link>
                                </Button>
                                <Button asChild size="lg" variant="outline">
                                    <Link href={register()}>Register</Link>
                                </Button>
                            </div>
                        </div>

                        <Card
                            id="workflow"
                            className="scroll-mt-24 border-border/60"
                        >
                            <CardHeader>
                                <CardTitle>How it works</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {workflowSteps.map((step, index) => (
                                    <div key={step.title} className="space-y-3">
                                        <div>
                                            <h2 className="font-medium">
                                                {step.title}
                                            </h2>
                                            <p className="text-sm text-muted-foreground">
                                                {step.description}
                                            </p>
                                        </div>
                                        {index < workflowSteps.length - 1 && (
                                            <Separator />
                                        )}
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    </section>

                    <section
                        id="roles"
                        className="grid scroll-mt-24 gap-4 md:grid-cols-3"
                    >
                        {workflowSteps.map((step) => (
                            <Card
                                key={step.title}
                                className="h-full border-border/60"
                            >
                                <CardHeader>
                                    <CardTitle className="text-lg">
                                        {step.title}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm leading-6 text-muted-foreground">
                                        {step.description}
                                    </p>
                                </CardContent>
                            </Card>
                        ))}
                    </section>
                </div>
            </div>
        </div>
    );
}
