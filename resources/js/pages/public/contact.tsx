import { Link } from '@inertiajs/react';
import { ArrowRightIcon } from 'lucide-react';

import { ContactSection } from '@/components/contact-section';
import { Button } from '@/components/ui/button';
import { login, register } from '@/routes';

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

                <ContactSection />
            </section>
        </div>
    );
}
