import { CallToAction } from '@/components/cta';
import { FeatureSection } from '@/components/feature-section';
import { HeroSection } from '@/components/hero';
import { LogosSection } from '@/components/logos-section';

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
        <>
            <HeroSection />
            <LogosSection />
            <section className="border-t px-6 py-12 lg:px-8">
                <FeatureSection />
            </section>
            <WorkflowSection />
            <section className="px-6 py-12 lg:px-8">
                <CallToAction />
            </section>
        </>
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

                <div
                    className="grid scroll-mt-24 gap-4 md:grid-cols-3"
                    id="workflow"
                >
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
