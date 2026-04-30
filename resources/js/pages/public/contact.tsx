import { Link } from '@inertiajs/react';
import {
    ArrowRightIcon,
    MailIcon,
    MessageSquareIcon,
    WrenchIcon,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { login, register } from '@/routes';

const contactOptions = [
    {
        title: 'Request support',
        description:
            'Use your account dashboard to follow requests, offers, and technician updates.',
        icon: MessageSquareIcon,
    },
    {
        title: 'Maintenance coordination',
        description:
            'Technicians can sign in to review available requests and manage assigned tasks.',
        icon: WrenchIcon,
    },
    {
        title: 'Administration',
        description:
            'Admins can manage users, technicians, and the full maintenance request history.',
        icon: MailIcon,
    },
];

export default function Contact() {
    return (
        <div className="px-6 py-16 lg:px-8">
            <section className="mx-auto max-w-5xl space-y-8">
                <div className="max-w-2xl space-y-4">
                    <p className="text-sm font-medium tracking-[0.2em] text-muted-foreground uppercase">
                        Contact
                    </p>
                    <h1 className="text-4xl font-semibold tracking-tight text-balance md:text-5xl">
                        Get to the right maintenance workflow faster.
                    </h1>
                    <p className="text-base leading-7 text-muted-foreground">
                        Sign in to manage an existing request, create an account
                        to submit a new issue, or use the admin tools to
                        coordinate technicians and request status.
                    </p>
                </div>

                <div className="flex flex-wrap gap-3">
                    <Button asChild size="lg">
                        <Link href={login()}>
                            Sign in
                            <ArrowRightIcon />
                        </Link>
                    </Button>
                    <Button asChild size="lg" variant="outline">
                        <Link href={register()}>Create account</Link>
                    </Button>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                    {contactOptions.map((option) => (
                        <article
                            className="rounded-lg border bg-card p-5 shadow-xs"
                            key={option.title}
                        >
                            <option.icon className="size-5 text-muted-foreground" />
                            <h2 className="mt-4 font-medium">{option.title}</h2>
                            <p className="mt-2 text-sm leading-6 text-muted-foreground">
                                {option.description}
                            </p>
                        </article>
                    ))}
                </div>
            </section>
        </div>
    );
}
