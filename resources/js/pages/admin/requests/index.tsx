import { Head } from '@inertiajs/react';
import { useMemo, useState } from 'react';
import { PageHeader } from '@/components/shared/page-header';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { index } from '@/routes/admin/requests';

type AdminRequest = {
    id: number;
    title: string;
    priority: string;
    status: string;
    created_at: string;
    user?: {
        id: number;
        full_name: string;
    } | null;
    assigned_technician?: {
        id: number;
        full_name: string;
    } | null;
    latest_offer?: {
        id: number;
        offer_description: string;
        estimated_cost: string | number;
        estimated_days: number;
        status: string;
    } | null;
    status_history?: Array<{
        id: number;
        old_status: string | null;
        new_status: string;
        note: string | null;
        changed_at: string;
        changedBy?: {
            full_name: string;
        };
    }>;
};

type PaginatedRequests = {
    data: AdminRequest[];
};

export default function AdminRequestsIndex({
    requests,
}: {
    requests: PaginatedRequests;
}) {
    const [statusFilter, setStatusFilter] = useState<string>('all');
    const [priorityFilter, setPriorityFilter] = useState<string>('all');

    const filteredRequests = useMemo(() => {
        return requests.data.filter((request) => {
            const statusMatches = statusFilter === 'all' || request.status === statusFilter;
            const priorityMatches = priorityFilter === 'all' || request.priority === priorityFilter;

            return statusMatches && priorityMatches;
        });
    }, [priorityFilter, requests.data, statusFilter]);

    return (
        <>
            <Head title="Manage Requests" />

            <div className="space-y-6 p-4">
                <PageHeader
                    title="Manage Requests"
                    description="Supervise all maintenance requests with status and priority filters."
                />

                <div className="flex flex-wrap gap-3">
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                        <SelectTrigger className="w-[220px]">
                            <SelectValue placeholder="Filter by status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Statuses</SelectItem>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="under_review">Under Review</SelectItem>
                            <SelectItem value="offer_sent">Offer Sent</SelectItem>
                            <SelectItem value="offer_accepted">Offer Accepted</SelectItem>
                            <SelectItem value="offer_rejected">Offer Rejected</SelectItem>
                            <SelectItem value="in_progress">In Progress</SelectItem>
                            <SelectItem value="completed">Completed</SelectItem>
                            <SelectItem value="cancelled">Cancelled</SelectItem>
                        </SelectContent>
                    </Select>

                    <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                        <SelectTrigger className="w-[220px]">
                            <SelectValue placeholder="Filter by priority" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Priorities</SelectItem>
                            <SelectItem value="low">Low</SelectItem>
                            <SelectItem value="medium">Medium</SelectItem>
                            <SelectItem value="high">High</SelectItem>
                            <SelectItem value="urgent">Urgent</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <Card>
                    <CardContent className="pt-6">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Title</TableHead>
                                    <TableHead>User</TableHead>
                                    <TableHead>Technician</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Priority</TableHead>
                                    <TableHead>Created</TableHead>
                                    <TableHead className="text-right">Details</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredRequests.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={7} className="text-center text-muted-foreground">
                                            No matching requests found.
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    filteredRequests.map((request) => (
                                        <TableRow key={request.id}>
                                            <TableCell>{request.title}</TableCell>
                                            <TableCell>{request.user?.full_name ?? 'N/A'}</TableCell>
                                            <TableCell>{request.assigned_technician?.full_name ?? 'Unassigned'}</TableCell>
                                            <TableCell>
                                                <Badge>{request.status}</Badge>
                                            </TableCell>
                                            <TableCell>
                                                <Badge variant="outline">{request.priority}</Badge>
                                            </TableCell>
                                            <TableCell>{new Date(request.created_at).toLocaleDateString()}</TableCell>
                                            <TableCell className="text-right">
                                                <Dialog>
                                                    <DialogTrigger className="text-sm underline">
                                                        View
                                                    </DialogTrigger>
                                                    <DialogContent className="max-w-2xl">
                                                        <DialogHeader>
                                                            <DialogTitle>
                                                                Request #{request.id} Details
                                                            </DialogTitle>
                                                            <DialogDescription>
                                                                Full request details, latest offer, and history.
                                                            </DialogDescription>
                                                        </DialogHeader>

                                                        <div className="space-y-4">
                                                            <div>
                                                                <p className="font-medium">{request.title}</p>
                                                                <p className="text-sm text-muted-foreground">
                                                                    Status: {request.status} | Priority: {request.priority}
                                                                </p>
                                                            </div>

                                                            <div>
                                                                <p className="text-sm font-medium">Latest Offer</p>
                                                                {request.latest_offer ? (
                                                                    <div className="mt-1 text-sm text-muted-foreground">
                                                                        {request.latest_offer.offer_description} | $
                                                                        {request.latest_offer.estimated_cost} |{' '}
                                                                        {request.latest_offer.estimated_days} day(s)
                                                                    </div>
                                                                ) : (
                                                                    <p className="mt-1 text-sm text-muted-foreground">
                                                                        No offer yet.
                                                                    </p>
                                                                )}
                                                            </div>

                                                            <div>
                                                                <p className="text-sm font-medium">History</p>
                                                                <div className="mt-1 space-y-1">
                                                                    {(request.status_history ?? []).slice(0, 5).map((entry) => (
                                                                        <p key={entry.id} className="text-sm text-muted-foreground">
                                                                            {entry.new_status} by{' '}
                                                                            {entry.changedBy?.full_name ?? 'System'} on{' '}
                                                                            {new Date(entry.changed_at).toLocaleString()}
                                                                        </p>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </DialogContent>
                                                </Dialog>
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

AdminRequestsIndex.layout = {
    breadcrumbs: [
        {
            title: 'Requests',
            href: index(),
        },
    ],
};
