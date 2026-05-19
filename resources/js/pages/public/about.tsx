import { Check, ShieldCheckIcon, UsersIcon, WrenchIcon } from 'lucide-react';

import { FaqsSection } from '@/components/faqs-section';

const values = [
    {
        title: 'Radical Transparency',
        description:
            ' By using features like Status history and Priority tracking you arent just managing tasks; you are building trust.',
        icon: Check,
    },
    {
        title: 'Empowered Autonomyn',
        description:
            'Through Technician offers, professionals have the agency to choose work that matches their specific skill set and schedule.',
        icon: WrenchIcon,
    },
    {
        title: 'Proof of Excellence',
        description:
            'The Status history acts as a digital portfolio, documenting their successful resolutions and building a record of reliability.',
        icon: ShieldCheckIcon,
    },
];

export default function About() {
    return (
        <div className="px-6 py-16 lg:px-8">
            <section className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
                <div className="space-y-4">
                    <p className="text-sm font-medium tracking-[0.2em] text-muted-foreground uppercase">
                        About the system
                    </p>
                    <h1 className="text-4xl font-semibold tracking-tight text-balance md:text-5xl">
                        Our Objectives
                    </h1>
                    <p className="text-base leading-7 text-muted-foreground">
                        To simplify complex infrastructure care through an
                        integrated, high-performance Maintenance Management
                        System. We bridge the gap between users, technicians,
                        and administrators to ensure that every request is
                        handled with speed and transparency.
                    </p>
                </div>

                <div className="grid gap-4">
                    {values.map((value) => (
                        <article
                            className="rounded-lg border bg-card p-5 shadow-xs"
                            key={value.title}
                        >
                            <div className="flex gap-4">
                                <span className="flex size-10 shrink-0 items-center justify-center rounded-md bg-muted text-foreground">
                                    <value.icon className="size-5" />
                                </span>
                                <div>
                                    <h2 className="font-medium">
                                        {value.title}
                                    </h2>
                                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                                        {value.description}
                                    </p>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </section>

            <section className="mx-auto mt-12 grid max-w-5xl gap-4 md:grid-cols-3">
                {[
                    ['Clients', 'Submit and follow maintenance requests.'],
                    ['Technicians', 'Offer, accept, and update assigned work.'],
                    [
                        'Admins',
                        'Control users, technicians, and request history.',
                    ],
                ].map(([title, description]) => (
                    <div
                        className="rounded-lg border border-border/60 p-4"
                        key={title}
                    >
                        <UsersIcon className="mb-3 size-5 text-muted-foreground" />
                        <h3 className="font-medium">{title}</h3>
                        <p className="mt-2 text-sm leading-6 text-muted-foreground">
                            {description}
                        </p>
                    </div>
                ))}
            </section>

            <FaqsSection />
        </div>
    );
}
