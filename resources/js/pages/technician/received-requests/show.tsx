import { Head, useForm } from '@inertiajs/react';
import type { FormEvent } from 'react';
import { OfferCard } from '@/components/maintenance/offer-card';
import { RequestDetailsCard } from '@/components/maintenance/request-details-card';
import { StatusTimeline } from '@/components/maintenance/status-timeline';
import { PageHeader } from '@/components/shared/page-header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { index, show, updateStatus } from '@/routes/technician/requests';
import { store as storeOffer } from '@/routes/technician/requests/offers';

type MaintenanceRequestData = {
    id: number;
    title: string;
    description: string;
    location: string;
    priority: string;
    status: string;
    created_at: string;
    user?: {
        id: number;
        full_name: string;
        email: string;
        phone: string;
    } | null;
    assigned_technician_id: number | null;
};

type OfferData = {
    id: number;
    offer_description: string;
    estimated_cost: string | number;
    estimated_days: number;
    status: string;
    sent_at: string | null;
    technician?: {
        id: number;
        full_name: string;
    } | null;
};

export default function TechnicianReceivedRequestShow({
    maintenanceRequest,
    offers,
    statusHistory,
    canSendOffer,
    canUpdateStatus,
}: {
    maintenanceRequest: MaintenanceRequestData;
    offers: OfferData[];
    canSendOffer: boolean;
    canUpdateStatus: boolean;
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
    const offerForm = useForm({
        offer_description: '',
        estimated_cost: '',
        estimated_days: 1,
    });

    const statusForm = useForm<{
        status: 'technician_assigned' | 'in_progress' | 'completed' | 'cancelled';
        note: string;
    }>({
        status: 'technician_assigned',
        note: '',
    });

    const submitOffer = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        offerForm.post(storeOffer(maintenanceRequest.id).url, {
            preserveScroll: true,
            onSuccess: () => offerForm.reset(),
        });
    };

    const submitStatus = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        statusForm.post(updateStatus(maintenanceRequest.id).url, {
            preserveScroll: true,
            onSuccess: () => statusForm.setData('note', ''),
        });
    };

    return (
        <>
            <Head title={`Technician Request #${maintenanceRequest.id}`} />

            <div className="space-y-6 p-4">
                <PageHeader
                    title={`Request #${maintenanceRequest.id}`}
                    description="Review request details, send one offer, and update assigned work."
                />

                <div className="grid gap-6 lg:grid-cols-2">
                    <div className="space-y-4">
                        <RequestDetailsCard
                            request={maintenanceRequest}
                            title="Request Summary"
                            showUser
                        />
                    </div>

                    <Card>
                        <CardHeader>
                            <CardTitle>Send Offer</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {canSendOffer ? (
                                <form onSubmit={submitOffer} className="space-y-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="offer_description">Offer Description</Label>
                                        <Textarea
                                            id="offer_description"
                                            value={offerForm.data.offer_description}
                                            onChange={(event) =>
                                                offerForm.setData('offer_description', event.target.value)
                                            }
                                        />
                                        {offerForm.errors.offer_description && (
                                            <p className="text-sm text-destructive">{offerForm.errors.offer_description}</p>
                                        )}
                                    </div>

                                    <div className="grid gap-4 sm:grid-cols-2">
                                        <div className="grid gap-2">
                                            <Label htmlFor="estimated_cost">Estimated Cost</Label>
                                            <Input
                                                id="estimated_cost"
                                                type="number"
                                                min="0"
                                                step="0.01"
                                                value={offerForm.data.estimated_cost}
                                                onChange={(event) => offerForm.setData('estimated_cost', event.target.value)}
                                            />
                                            {offerForm.errors.estimated_cost && (
                                                <p className="text-sm text-destructive">{offerForm.errors.estimated_cost}</p>
                                            )}
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="estimated_days">Estimated Days</Label>
                                            <Input
                                                id="estimated_days"
                                                type="number"
                                                min="1"
                                                value={offerForm.data.estimated_days}
                                                onChange={(event) =>
                                                    offerForm.setData('estimated_days', Number(event.target.value))
                                                }
                                            />
                                            {offerForm.errors.estimated_days && (
                                                <p className="text-sm text-destructive">{offerForm.errors.estimated_days}</p>
                                            )}
                                        </div>
                                    </div>

                                    <Button type="submit" disabled={offerForm.processing}>
                                        Send Offer
                                    </Button>
                                </form>
                            ) : (
                                <p className="text-sm text-muted-foreground">
                                    You can send one offer while the request is still pending.
                                </p>
                            )}
                        </CardContent>
                    </Card>
                </div>

                {canUpdateStatus && (
                    <Card>
                        <CardHeader>
                            <CardTitle>Update Status</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={submitStatus} className="grid gap-4 md:grid-cols-[220px_1fr_auto] md:items-end">
                                <div className="grid gap-2">
                                    <Label>Status</Label>
                                    <Select
                                        value={statusForm.data.status}
                                        onValueChange={(value: typeof statusForm.data.status) =>
                                            statusForm.setData('status', value)
                                        }
                                    >
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="technician_assigned">Technician Assigned</SelectItem>
                                            <SelectItem value="in_progress">In Progress</SelectItem>
                                            <SelectItem value="completed">Completed</SelectItem>
                                            <SelectItem value="cancelled">Cancelled</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="note">Note (optional)</Label>
                                    <Input
                                        id="note"
                                        value={statusForm.data.note}
                                        onChange={(event) => statusForm.setData('note', event.target.value)}
                                        placeholder="Status update note..."
                                    />
                                </div>

                                <Button type="submit" disabled={statusForm.processing}>
                                    Update
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                )}

                <div className="grid gap-4 md:grid-cols-2">
                    {offers.length === 0 ? (
                        <OfferCard offer={null} title="Offers" />
                    ) : (
                        offers.map((offer) => (
                            <OfferCard key={offer.id} offer={offer} title={`Offer #${offer.id}`} />
                        ))
                    )}
                </div>

                <StatusTimeline items={statusHistory} />
            </div>
        </>
    );
}

TechnicianReceivedRequestShow.layout = (props: { maintenanceRequest: { id: number } }) => ({
    breadcrumbs: [
        {
            title: 'Available Requests',
            href: index(),
        },
        {
            title: `Request #${props.maintenanceRequest.id}`,
            href: show(props.maintenanceRequest.id),
        },
    ],
});
