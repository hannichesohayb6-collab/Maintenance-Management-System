import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

type StatusTimelineItem = {
    id: number;
    old_status: string | null;
    new_status: string;
    note: string | null;
    changed_at: string;
    changed_by?: number;
    changed_by_name?: string;
    changed_by_user?: {
        full_name?: string;
    };
    changed_by_relation?: {
        full_name?: string;
    };
    changed_by_model?: {
        full_name?: string;
    };
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
                    items.map((item, index) => {
                        const changedBy =
                            item.changedBy?.full_name
                            ?? item.changed_by_name
                            ?? item.changed_by_user?.full_name
                            ?? item.changed_by_relation?.full_name
                            ?? item.changed_by_model?.full_name
                            ?? 'System';

                        return (
                            <div key={item.id} className="space-y-3">
                                <div className="flex flex-wrap items-center gap-2">
                                    <Badge variant="outline">{item.new_status}</Badge>
                                    {item.old_status && (
                                        <span className="text-xs text-muted-foreground">
                                            from {item.old_status}
                                        </span>
                                    )}
                                </div>

                                <p className="text-sm text-muted-foreground">
                                    Changed by {changedBy} on{' '}
                                    {new Date(item.changed_at).toLocaleString()}
                                </p>

                                {item.note && (
                                    <p className="text-sm">{item.note}</p>
                                )}

                                {index < items.length - 1 && <Separator />}
                            </div>
                        );
                    })
                )}
            </CardContent>
        </Card>
    );
}
