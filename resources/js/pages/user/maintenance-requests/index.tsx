import { Head, Link } from '@inertiajs/react';
import { PageHeader } from '@/components/shared/page-header';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { create, index, show } from '@/routes/user/requests';

type MaintenanceRequestRow = {
    id: number;
    title: string;
    priority: string;
    status: string;
    created_at: string;
    assigned_technician_id: number | null;
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
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Title</TableHead>
                                    <TableHead>Priority</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Technician</TableHead>
                                    <TableHead>Created At</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {requests.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={6} className="text-center text-muted-foreground">
                                            No requests found.
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    requests.map((request) => (
                                        <TableRow key={request.id}>
                                            <TableCell>{request.title}</TableCell>
                                            <TableCell>
                                                <Badge variant="outline">{request.priority}</Badge>
                                            </TableCell>
                                            <TableCell>
                                                <Badge>{request.status}</Badge>
                                            </TableCell>
                                            <TableCell>
                                                {request.assigned_technician?.full_name ?? 'Not assigned'}
                                            </TableCell>
                                            <TableCell>
                                                {new Date(request.created_at).toLocaleDateString()}
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <Button asChild size="sm" variant="outline">
                                                    <Link href={show(request.id)}>View</Link>
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
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
