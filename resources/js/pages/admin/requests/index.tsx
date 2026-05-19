import { Head } from '@inertiajs/react';
import { Eye, Filter, UserRound, UserRoundCog } from 'lucide-react';
import { useState } from 'react';
import { OfferCard } from '@/components/maintenance/offer-card';
import { RequestCardGrid } from '@/components/maintenance/request-card-grid';
import { RequestDetailsCard } from '@/components/maintenance/request-details-card';
import { StatusTimeline } from '@/components/maintenance/status-timeline';
import { PageHeader } from '@/components/shared/page-header';
import { Button } from '@/components/ui/button';
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
import { index } from '@/routes/admin/requests';

type AdminRequest = {
    id: number;
    title: string;
    description: string;
    location: string;
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
        technician?: {
            full_name: string;
        } | null;
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

    const filteredRequests = requests.data.filter((request) => {
        const statusMatches =
            statusFilter === 'all' || request.status === statusFilter;
        const priorityMatches =
            priorityFilter === 'all' || request.priority === priorityFilter;

        return statusMatches && priorityMatches;
    });

    return (
        <>
            <Head title="Manage Requests" />

            <div className="space-y-6 p-4">
                <PageHeader
                    title="Manage Requests"
                    description="Supervise all maintenance requests with status and priority filters."
                />

                <div className="flex flex-wrap gap-3">
                    <Select
                        value={statusFilter}
                        onValueChange={setStatusFilter}
                    >
                        <SelectTrigger className="w-[220px]">
                            <SelectValue placeholder="Filter by status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Statuses</SelectItem>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="technician_assigned">
                                Technician Assigned
                            </SelectItem>
                            <SelectItem value="in_progress">
                                In Progress
                            </SelectItem>
                            <SelectItem value="completed">Completed</SelectItem>
                            <SelectItem value="cancelled">Cancelled</SelectItem>
                        </SelectContent>
                    </Select>

                    <Select
                        value={priorityFilter}
                        onValueChange={setPriorityFilter}
                    >
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
                        <div className="mb-6 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                            <span className="flex items-center gap-2">
                                <Filter className="size-4" />
                                {filteredRequests.length} matching request
                                {filteredRequests.length === 1 ? '' : 's'}
                            </span>
                            <span className="flex items-center gap-2">
                                <UserRound className="size-4" />
                                Users and admins can review every card quickly
                            </span>
                            <span className="flex items-center gap-2">
                                <UserRoundCog className="size-4" />
                                Technician assignment stays visible on each
                                request
                            </span>
                        </div>
                        <RequestCardGrid
                            requests={filteredRequests}
                            showUser
                            showTechnician
                            emptyMessage="No matching requests found."
                            actions={(request) => (
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button size="sm" variant="outline">
                                            <Eye className="size-4" />
                                            Details
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent className="max-h-[90vh] max-w-4xl overflow-hidden p-0 sm:max-w-4xl">
                                        <DialogHeader className="border-b px-6 pt-6 pb-4">
                                            <DialogTitle>
                                                Request #{request.id} Details
                                            </DialogTitle>
                                            <DialogDescription>
                                                Full request details, latest
                                                offer, and history.
                                            </DialogDescription>
                                        </DialogHeader>

                                        <div className="max-h-[calc(90vh-88px)] space-y-6 overflow-y-auto px-6 pb-6">
                                            <RequestDetailsCard
                                                request={request}
                                                showUser
                                                showTechnician
                                            />

                                            <OfferCard
                                                offer={
                                                    request.latest_offer ?? null
                                                }
                                            />

                                            <StatusTimeline
                                                items={
                                                    request.status_history ?? []
                                                }
                                            />
                                        </div>
                                    </DialogContent>
                                </Dialog>
                            )}
                        />
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
