import {
    ClipboardCheckIcon,
    ShieldCheckIcon,
    UsersIcon,
    WrenchIcon,
} from 'lucide-react';

const values = [
    {
        title: 'Clear request ownership',
        description:
            'Clients submit maintenance needs with the details technicians and admins need to act quickly.',
        icon: ClipboardCheckIcon,
    },
    {
        title: 'Technician coordination',
        description:
            'Technicians can review open requests, send offers, and keep assigned work moving.',
        icon: WrenchIcon,
    },
    {
        title: 'Admin visibility',
        description:
            'Admins manage users, technician access, and the full request lifecycle from one dashboard.',
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
                        A practical workspace for maintenance teams.
                    </h1>
                    <p className="text-base leading-7 text-muted-foreground">
                        The Maintenance Management System keeps requests,
                        offers, assignments, and status updates connected so
                        every role can see what needs attention.
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
        </div>
    );
}
