import { Head, Link } from '@inertiajs/react';
import { Plus, Wrench } from 'lucide-react';
import { RequestCardGrid } from '@/components/maintenance/request-card-grid';
import { PageHeader } from '@/components/shared/page-header';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { create, index, show } from '@/routes/user/requests';

type MaintenanceRequestRow = {
    id: number;
    title: string;
    priority: string;
    status: string;
    created_at: string;
    assigned_technician?: {
        id: number;
        full_name: string;
    } | null;
};

export default function UserMaintenanceRequestsIndex({
    requests,
}: {
    requests: MaintenanceRequestRow[];
}) {
    return (
        <>
            <Head title="My Requests" />

            <div className="space-y-6 p-4">
                <PageHeader
                    title="My Requests"
                    description="Track your maintenance requests and offers."
                    actions={
                        <Button asChild>
                            <Link href={create()}>
                                <Plus className="size-4" />
                                Create Request
                            </Link>
                        </Button>
                    }
                />

                <Card>
                    <CardContent className="pt-6">
                        <div className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
                            <Wrench className="size-4" />
                            <span>
                                {requests.length} request
                                {requests.length === 1 ? '' : 's'} in your queue
                            </span>
                        </div>
                        <RequestCardGrid
                            requests={requests}
                            showTechnician
                            emptyMessage="No requests found."
                            detailsHref={(id) => show(id).url}
                        />
                    </CardContent>
                </Card>
            </div>
        </>
    );
}

UserMaintenanceRequestsIndex.layout = {
    breadcrumbs: [
        {
            title: 'My Requests',
            href: index(),
        },
    ],
};
