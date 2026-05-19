import { Head, Link, usePage } from '@inertiajs/react';
import { ArrowRight, ClipboardList, LogIn, Search } from 'lucide-react';
import { RequestCardGrid } from '@/components/maintenance/request-card-grid';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { availableRequests, login } from '@/routes';
import type { Auth } from '@/types/auth';

type PublicRequestRow = {
    id: number;
    title: string;
    priority: string;
    status: string;
    created_at: string;
    user?: {
        id: number;
        full_name: string;
        avatar?: string;
    } | null;
};

export default function PublicAvailableRequests({
    requests,
}: {
    requests: PublicRequestRow[];
}) {
    const { auth } = usePage<{ auth?: Auth }>().props;

    return (
        <>
            <Head title="Available Requests" />

            <div className="px-6 py-16 lg:px-8">
                <section className="mx-auto max-w-5xl space-y-8">
                    <div className="grid gap-6 rounded-3xl border border-border/60 bg-card/70 p-6 shadow-sm backdrop-blur md:grid-cols-[1.2fr_0.8fr] md:p-8">
                        <div className="space-y-4">
                            <p className="flex items-center gap-2 text-sm font-medium tracking-[0.2em] text-muted-foreground uppercase">
                                <Search className="size-4" />
                                Public listings
                            </p>
                            <h1 className="text-4xl font-semibold tracking-tight text-balance md:text-5xl">
                                Browse available maintenance requests
                            </h1>
                            <p className="max-w-2xl text-base leading-7 text-muted-foreground">
                                Anyone can explore open maintenance requests
                                here. Sign in to open a request and continue
                                with the technician workflow.
                            </p>
                            <div className="flex flex-wrap gap-3">
                                <Button asChild>
                                    <Link href={login()}>
                                        <LogIn className="size-4" />
                                        Sign In to Continue
                                    </Link>
                                </Button>
                                <Button asChild variant="outline">
                                    <Link href={availableRequests()}>
                                        <ClipboardList className="size-4" />
                                        {requests.length} open request
                                        {requests.length === 1 ? '' : 's'}
                                    </Link>
                                </Button>
                            </div>
                        </div>

                        <Card className="gap-4 border-border/60 bg-background/80">
                            <CardContent className="space-y-4 pt-6">
                                <div className="flex items-center gap-3">
                                    <span className="flex size-11 items-center justify-center rounded-2xl bg-muted text-foreground">
                                        <ClipboardList className="size-5" />
                                    </span>
                                    <div>
                                        <p className="text-sm font-medium">
                                            How access works
                                        </p>
                                        <p className="text-sm text-muted-foreground">
                                            Public visitors can browse. Opening
                                            a request sends them to login.
                                        </p>
                                    </div>
                                </div>
                                <div className="rounded-2xl border border-dashed border-border/70 bg-muted/30 p-4 text-sm leading-6 text-muted-foreground">
                                    After signing in, technicians can review the
                                    request, send an offer, and manage status
                                    updates from their workspace.
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <RequestCardGrid
                        requests={requests}
                        showUser
                        emptyMessage="No public requests are available right now."
                        actions={() => (
                            <Button asChild size="sm">
                                <Link
                                    href={
                                        auth?.user
                                            ? availableRequests()
                                            : login()
                                    }
                                >
                                    <ArrowRight className="size-4" />
                                    View Request
                                </Link>
                            </Button>
                        )}
                    />
                </section>
            </div>
        </>
    );
}
