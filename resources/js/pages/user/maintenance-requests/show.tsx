import { Head, router, useForm } from '@inertiajs/react';
import { useState } from 'react';
import { OfferCard } from '@/components/maintenance/offer-card';
import { RequestDetailsCard } from '@/components/maintenance/request-details-card';
import { StatusTimeline } from '@/components/maintenance/status-timeline';
import { PageHeader } from '@/components/shared/page-header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { acceptOffer, index, rejectOffer, show } from '@/routes/user/requests';
import { Star } from 'lucide-react';

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
    images?: Array<{ id: number; image_path: string }>;
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
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState('');

    const submitRating = () => {
        router.post(`/user/requests/${maintenanceRequest.id}/rate`, {
            rating,
            comment,
        }, {
            onSuccess: () => {
                // Success handling
            }
        });
    };

    return (
        <>
            <Head title={`Request ${maintenanceRequest.title}`} />

            <div className="space-y-6 p-4">
                <PageHeader
                    title={`Request ${maintenanceRequest.title}`}
                    description="Request details, all offers, and status history."
                />

                <div className="grid gap-6 lg:grid-cols-3">
                    <div className="lg:col-span-2 space-y-6">
                        <RequestDetailsCard request={maintenanceRequest} showTechnician />

                        {maintenanceRequest.images && maintenanceRequest.images.length > 0 && (
                            <div className="space-y-3">
                                <Label>Attached Images</Label>
                                <div className="grid grid-cols-3 gap-4">
                                    {maintenanceRequest.images.map((img) => (
                                        <img
                                            key={img.id}
                                            src={`/storage/${img.image_path}`}
                                            alt="Request image"
                                            className="aspect-square w-full object-cover rounded-md border"
                                        />
                                    ))}
                                </div>
                            </div>
                        )}

                        {maintenanceRequest.status === 'completed' && (
                            <div className="rounded-xl border bg-card p-6 shadow-sm space-y-4">
                                <div className="flex items-center gap-2">
                                    <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                                    <Label className="text-base font-semibold">Rate Your Technician</Label>
                                </div>
                                <div className="grid gap-4">
                                    <div className="flex items-center gap-3">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <Button
                                                key={star}
                                                variant="ghost"
                                                size="icon"
                                                className={`h-8 w-8 ${rating >= star ? 'text-yellow-500' : 'text-muted-foreground'}`}
                                                onClick={() => setRating(star)}
                                            >
                                                <Star className={`h-5 w-5 ${rating >= star ? 'fill-yellow-500' : ''}`} />
                                            </Button>
                                        ))}
                                        <span className="text-sm font-medium text-muted-foreground">{rating} / 5</span>
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="comment">Comments (Optional)</Label>
                                        <Textarea
                                            id="comment"
                                            value={comment}
                                            onChange={(e) => setComment(e.target.value)}
                                            placeholder="How was the service?"
                                            rows={3}
                                        />
                                    </div>
                                    <Button onClick={submitRating} className="w-fit">
                                        Submit Rating
                                    </Button>
                                </div>
                            </div>
                        )}
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
