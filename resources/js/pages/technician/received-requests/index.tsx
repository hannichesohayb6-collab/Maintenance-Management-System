import { Head, Link, router } from '@inertiajs/react';
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
import { accept, index, reject, show } from '@/routes/technician/requests';

type TechnicianRequestRow = {
    id: number;
    title: string;
    priority: string;
    status: string;
    created_at: string;
    assigned_technician_id: number | null;
    user?: {
        id: number;
        full_name: string;
    };
    assigned_technician?: {
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
            <Head title="Received Requests" />

            <div className="space-y-6 p-4">
                <PageHeader
                    title="Received Requests"
                    description="Review pending requests and assigned work."
                />

                <Card>
                    <CardContent className="pt-6">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Title</TableHead>
                                    <TableHead>User</TableHead>
                                    <TableHead>Priority</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Created</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {requests.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={6} className="text-center text-muted-foreground">
                                            No requests available.
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    requests.map((request) => (
                                        <TableRow key={request.id}>
                                            <TableCell>{request.title}</TableCell>
                                            <TableCell>{request.user?.full_name ?? 'N/A'}</TableCell>
                                            <TableCell>
                                                <Badge variant="outline">{request.priority}</Badge>
                                            </TableCell>
                                            <TableCell>
                                                <Badge>{request.status}</Badge>
                                            </TableCell>
                                            <TableCell>
                                                {new Date(request.created_at).toLocaleDateString()}
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex justify-end gap-2">
                                                    <Button asChild size="sm" variant="outline">
                                                        <Link href={show(request.id)}>Details</Link>
                                                    </Button>
                                                    {request.status === 'pending' && (
                                                        <>
                                                            <Button
                                                                size="sm"
                                                                onClick={() => router.patch(accept(request.id).url)}
                                                            >
                                                                Accept
                                                            </Button>
                                                            <Button
                                                                size="sm"
                                                                variant="outline"
                                                                onClick={() => router.patch(reject(request.id).url)}
                                                            >
                                                                Reject
                                                            </Button>
                                                        </>
                                                    )}
                                                </div>
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

TechnicianReceivedRequestsIndex.layout = {
    breadcrumbs: [
        {
            title: 'Received Requests',
            href: index(),
        },
    ],
};
