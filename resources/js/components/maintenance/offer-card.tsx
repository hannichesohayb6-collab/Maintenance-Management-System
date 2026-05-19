import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

type OfferCardProps = {
    offer: {
        offer_description: string;
        estimated_cost: string | number;
        estimated_days: number;
        status: string;
        technician?: {
            full_name: string;
            rating?: number;
        } | null;
    } | null;
    title?: string;
};

export function OfferCard({ offer, title = 'Offer' }: OfferCardProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
                {offer ? (
                    <>
                        <p className="text-sm">{offer.offer_description}</p>
                        <Separator />
                        <p className="text-sm">
                            Technician: {offer.technician?.full_name ?? 'N/A'}
                            {offer.technician?.rating && (
                                <span className="ml-2 text-yellow-500 font-medium">
                                    ★ {offer.technician.rating.toFixed(1)}
                                </span>
                            )}
                        </p>
                        <p className="text-sm">Estimated Cost: ${offer.estimated_cost}</p>
                        <p className="text-sm">Estimated Days: {offer.estimated_days}</p>
                        <Badge variant="secondary">{offer.status}</Badge>
                    </>
                ) : (
                    <p className="text-sm text-muted-foreground">No offer yet.</p>
                )}
            </CardContent>
        </Card>
    );
}
