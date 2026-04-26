import { Head } from '@inertiajs/react';
import { RequestTable } from '@/components/maintenance/request-table';
import { PageHeader } from '@/components/shared/page-header';
import { Card, CardContent } from '@/components/ui/card';
import { index, show } from '@/routes/technician/requests';

type TechnicianRequestRow = {
    id: number;
    title: string;
    priority: string;
    status: string;
    created_at: string;
    user?: {
        id: number;
        full_name: string;
    } | null;
};

export default function TechnicianReceivedRequestsIndex({
    requests,
}: {
    requests: TechnicianRequestRow[];
}) {
    return (
        <>
            <Head title="Available Requests" />

            <div className="space-y-6 p-4">
                <PageHeader
                    title="Available Requests"
                    description="Browse pending requests and send one offer per request."
                />

                <Card>
                    <CardContent className="pt-6">
                        <RequestTable
                            requests={requests}
                            showUser
                            emptyMessage="No requests available."
                            detailsHref={(id) => show(id).url}
                        />
                    </CardContent>
                </Card>
            </div>
        </>
    );
}

TechnicianReceivedRequestsIndex.layout = {
    breadcrumbs: [
        {
            title: 'Available Requests',
            href: index(),
        },
    ],
};
