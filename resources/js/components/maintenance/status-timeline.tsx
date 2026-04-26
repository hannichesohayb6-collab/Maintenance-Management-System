import { RequestStatusBadge } from '@/components/maintenance/request-status-badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

type StatusTimelineItem = {
    id: number;
    old_status: string | null;
    new_status: string;
    note: string | null;
    changed_at: string;
    changedBy?: {
        full_name: string;
    };
};

export function StatusTimeline({ items }: { items: StatusTimelineItem[] }) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Status Timeline</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                {items.length === 0 ? (
                    <p className="text-sm text-muted-foreground">No status history yet.</p>
                ) : (
                    items.map((item, index) => (
                        <div key={item.id} className="space-y-3">
                            <div className="flex flex-wrap items-center gap-2">
                                <RequestStatusBadge status={item.new_status} />
                                {item.old_status && (
                                    <span className="text-xs text-muted-foreground">
                                        from {item.old_status}
                                    </span>
                                )}
                            </div>

                            <p className="text-sm text-muted-foreground">
                                Changed by {item.changedBy?.full_name ?? 'System'} on{' '}
                                {new Date(item.changed_at).toLocaleString()}
                            </p>

                            {item.note && <p className="text-sm">{item.note}</p>}

                            {index < items.length - 1 && <Separator />}
                        </div>
                    ))
                )}
            </CardContent>
        </Card>
    );
}
