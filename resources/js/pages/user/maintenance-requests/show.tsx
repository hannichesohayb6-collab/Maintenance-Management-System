import { Head, router } from '@inertiajs/react';
import { OfferCard } from '@/components/maintenance/offer-card';
import { RequestDetailsCard } from '@/components/maintenance/request-details-card';
import { StatusTimeline } from '@/components/maintenance/status-timeline';
import { PageHeader } from '@/components/shared/page-header';
import { Button } from '@/components/ui/button';
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
    } | null;
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
    offers,
    statusHistory,
}: {
    maintenanceRequest: MaintenanceRequestData;
    offers: OfferData[];
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
    return (
        <>
            <Head title={`Request ${maintenanceRequest.title}`} />

            <div className="space-y-6 p-4">
                <PageHeader
                    title={`Request ${maintenanceRequest.title}`}
                    description="Request details, all offers, and status history."
                />

                <div className="grid gap-6 lg:grid-cols-3">
                    <div className="lg:col-span-2">
                        <RequestDetailsCard request={maintenanceRequest} showTechnician />
                    </div>

                    <div className="space-y-4">
                        {offers.length === 0 ? (
                            <OfferCard offer={null} title="Offers" />
                        ) : (
                            offers.map((offer) => (
                                <div key={offer.id} className="space-y-2">
                                    <OfferCard offer={offer} title={`Offer #${offer.id}`} />

                                    {offer.status === 'sent' && maintenanceRequest.status === 'pending' && (
                                        <div className="flex gap-2">
                                            <Button
                                                size="sm"
                                                onClick={() =>
                                                    router.post(acceptOffer(maintenanceRequest.id).url, {
                                                        offer_id: offer.id,
                                                    })
                                                }
                                            >
                                                Accept
                                            </Button>
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                onClick={() =>
                                                    router.post(rejectOffer(maintenanceRequest.id).url, {
                                                        offer_id: offer.id,
                                                    })
                                                }
                                            >
                                                Reject
                                            </Button>
                                        </div>
                                    )}
                                </div>
                            ))
                        )}
                    </div>
                </div>

                <StatusTimeline items={statusHistory} />
            </div>
        </>
    );
}

UserMaintenanceRequestShow.layout = (props: { maintenanceRequest: { id: number , title: string } }) => ({
    breadcrumbs: [
        {
            title: 'My Requests',
            href: index(),
        },
        {
            title: `Request ${props.maintenanceRequest.title}`,
            href: show(props.maintenanceRequest.id),
        },
    ],
});
