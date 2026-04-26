import { Head, Link } from '@inertiajs/react';
import { RequestTable } from '@/components/maintenance/request-table';
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
                    actions={(
                        <Button asChild>
                            <Link href={create()}>Create Request</Link>
                        </Button>
                    )}
                />

                <Card>
                    <CardContent className="pt-6">
                        <RequestTable
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
