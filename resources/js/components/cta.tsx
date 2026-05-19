import { Link } from '@inertiajs/react';
import { ArrowRightIcon, ClipboardListIcon } from 'lucide-react';

import { register } from '@/routes';
import { Button } from '@/components/ui/button';
import { FullWidthDivider } from '@/components/ui/full-width-divider';

export function CallToAction() {
    return (
        <div className="relative mx-auto flex w-full max-w-3xl flex-col justify-between gap-y-6 border-x bg-secondary/80 px-2 py-8 md:px-4 dark:bg-secondary/40">
            <FullWidthDivider className="-top-px" />

            <div className="space-y-1">
                <h2 className="text-center text-2xl font-semibold tracking-tight md:text-4xl">
                    Ready to streamline maintenance?
                </h2>
                <p className="text-center text-sm text-balance text-muted-foreground md:text-base">
                    Create an account, submit requests, and keep every
                    maintenance update in one clear workflow.
                </p>
            </div>

            <div className="flex items-center justify-center gap-2">
                <Button asChild>
                    <Link href={register()}>
                        Get started
                        <ArrowRightIcon data-icon="inline-end" />
                    </Link>
                </Button>
            </div>

            <div className="flex items-center justify-center gap-2">
                <ClipboardListIcon className="size-4 text-muted-foreground" />
                <p className="text-center text-sm text-muted-foreground">
                    Designed for residents, technicians, and administrators.
                </p>
            </div>

            <FullWidthDivider className="-bottom-px" />
        </div>
    );
}
