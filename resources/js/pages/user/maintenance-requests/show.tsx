import { Head, router } from '@inertiajs/react';
import { StatusTimeline } from '@/components/maintenance/status-timeline';
import { PageHeader } from '@/components/shared/page-header';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { acceptOffer, index, rejectOffer, show } from '@/routes/user/requests';

type OfferData = {
    id: number;
    offer_description: string;
    estimated_cost: string | number;
    estimated_days: number;
    status: string;
    sent_at: string | null;
    responded_at: string | null;
    technician?: {
        id: number;
        full_name: string;
    };
};

type MaintenanceRequestData = {
    id: number;
    title: string;
    description: string;
    location: string;
    priority: string;
    status: string;
    created_at: string;
    assigned_technician?: {
        id: number;
        full_name: string;
        email: string;
        phone: string;
    } | null;
};

export default function UserMaintenanceRequestShow({
    maintenanceRequest,
    latestOffer,
    statusHistory,
}: {
    maintenanceRequest: MaintenanceRequestData;
    latestOffer: OfferData | null;
    statusHistory: Array<{
        id: number;
        old_status: string | null;
        new_status: string;
        note: string | null;
        changed_at: string;
        changedBy?: {
            full_name: string;
        };
    }>;
}) {
    const canRespondToOffer = latestOffer !== null && latestOffer.status === 'sent';

    return (
        <>
            <Head title={`Request #${maintenanceRequest.id}`} />

            <div className="space-y-6 p-4">
                <PageHeader
                    title={`Request #${maintenanceRequest.id}`}
                    description="Request details, latest offer, and status history."
                />

                <div className="grid gap-6 lg:grid-cols-3">
                    <Card className="lg:col-span-2">
                        <CardHeader>
                            <CardTitle>Request Information</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-1">
                                <p className="text-sm text-muted-foreground">Title</p>
                                <p className="font-medium">{maintenanceRequest.title}</p>
                            </div>

                            <div className="space-y-1">
                                <p className="text-sm text-muted-foreground">Description</p>
                                <p>{maintenanceRequest.description}</p>
                            </div>

                            <div className="grid gap-4 sm:grid-cols-2">
                                <div className="space-y-1">
                                    <p className="text-sm text-muted-foreground">Location</p>
                                    <p>{maintenanceRequest.location}</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-sm text-muted-foreground">Created At</p>
                                    <p>{new Date(maintenanceRequest.created_at).toLocaleString()}</p>
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-2">
                                <Badge variant="outline">{maintenanceRequest.priority}</Badge>
                                <Badge>{maintenanceRequest.status}</Badge>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Latest Offer</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            {latestOffer ? (
                                <>
                                    <p className="text-sm">{latestOffer.offer_description}</p>
                                    <Separator />
                                    <p className="text-sm">
                                        Technician: {latestOffer.technician?.full_name ?? 'N/A'}
                                    </p>
                                    <p className="text-sm">Estimated Cost: ${latestOffer.estimated_cost}</p>
                                    <p className="text-sm">Estimated Days: {latestOffer.estimated_days}</p>
                                    <Badge variant="secondary">{latestOffer.status}</Badge>

                                    {canRespondToOffer && (
                                        <div className="flex gap-2 pt-2">
                                            <Button
                                                size="sm"
                                                onClick={() =>
                                                    router.patch(acceptOffer(maintenanceRequest.id).url)
                                                }
                                            >
                                                Accept
                                            </Button>
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                onClick={() =>
                                                    router.patch(rejectOffer(maintenanceRequest.id).url)
                                                }
                                            >
                                                Reject
                                            </Button>
                                        </div>
                                    )}
                                </>
                            ) : (
                                <p className="text-sm text-muted-foreground">No offer yet.</p>
                            )}
                        </CardContent>
                    </Card>
                </div>

                <StatusTimeline items={statusHistory} />
            </div>
        </>
    );
}

UserMaintenanceRequestShow.layout = (props: { maintenanceRequest: { id: number } }) => ({
    breadcrumbs: [
        {
            title: 'My Requests',
            href: index(),
        },
        {
            title: `Request #${props.maintenanceRequest.id}`,
            href: show(props.maintenanceRequest.id),
        },
    ],
});
