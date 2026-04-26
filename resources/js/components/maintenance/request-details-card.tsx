import { RequestPriorityBadge } from '@/components/maintenance/request-priority-badge';
import { RequestStatusBadge } from '@/components/maintenance/request-status-badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type Person = {
    full_name: string;
    email?: string;
    phone?: string;
} | null | undefined;

type RequestDetailsCardProps = {
    request: {
        title: string;
        description: string;
        location: string;
        priority: string;
        status: string;
        created_at: string;
        user?: Person;
        assigned_technician?: Person;
        assignedTechnician?: Person;
    };
    title?: string;
    showUser?: boolean;
    showTechnician?: boolean;
};

export function RequestDetailsCard({
    request,
    title = 'Request Details',
    showUser = false,
    showTechnician = false,
}: RequestDetailsCardProps) {
    const technician = request.assigned_technician ?? request.assignedTechnician;

    return (
        <Card>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Title</p>
                    <p className="font-medium">{request.title}</p>
                </div>

                <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Description</p>
                    <p>{request.description}</p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Location</p>
                        <p>{request.location}</p>
                    </div>
                    <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Created At</p>
                        <p>{new Date(request.created_at).toLocaleString()}</p>
                    </div>
                </div>

                {showUser && (
                    <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">User</p>
                        <p>{request.user?.full_name ?? 'N/A'}</p>
                    </div>
                )}

                {showTechnician && (
                    <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Technician</p>
                        <p>{technician?.full_name ?? 'Not assigned'}</p>
                    </div>
                )}

                <div className="flex flex-wrap gap-2">
                    <RequestPriorityBadge priority={request.priority} />
                    <RequestStatusBadge status={request.status} />
                </div>
            </CardContent>
        </Card>
    );
}
