import { Link } from '@inertiajs/react';
import type { ReactNode } from 'react';
import { RequestPriorityBadge } from '@/components/maintenance/request-priority-badge';
import { RequestStatusBadge } from '@/components/maintenance/request-status-badge';
import { Button } from '@/components/ui/button';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';

type RequestTableRow = {
    id: number;
    title: string;
    priority: string;
    status: string;
    created_at?: string;
    user?: {
        full_name: string;
    } | null;
    assigned_technician?: {
        full_name: string;
    } | null;
};

type RequestTableProps = {
    requests: RequestTableRow[];
    emptyMessage: string;
    detailsHref?: (id: number) => string;
    showUser?: boolean;
    showTechnician?: boolean;
    actions?: (request: RequestTableRow) => ReactNode;
};

export function RequestTable({
    requests,
    emptyMessage,
    detailsHref,
    showUser = false,
    showTechnician = false,
    actions,
}: RequestTableProps) {
    const columnCount =
        4 + (showUser ? 1 : 0) + (showTechnician ? 1 : 0) + (actions || detailsHref ? 1 : 0);

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Title</TableHead>
                    {showUser && <TableHead>User</TableHead>}
                    {showTechnician && <TableHead>Technician</TableHead>}
                    <TableHead>Priority</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Created</TableHead>
                    {(actions || detailsHref) && <TableHead className="text-right">Actions</TableHead>}
                </TableRow>
            </TableHeader>
            <TableBody>
                {requests.length === 0 ? (
                    <TableRow>
                        <TableCell colSpan={columnCount} className="text-center text-muted-foreground">
                            {emptyMessage}
                        </TableCell>
                    </TableRow>
                ) : (
                    requests.map((request) => (
                        <TableRow key={request.id}>
                            <TableCell>{request.title}</TableCell>
                            {showUser && <TableCell>{request.user?.full_name ?? 'N/A'}</TableCell>}
                            {showTechnician && (
                                <TableCell>{request.assigned_technician?.full_name ?? 'Not assigned'}</TableCell>
                            )}
                            <TableCell>
                                <RequestPriorityBadge priority={request.priority} />
                            </TableCell>
                            <TableCell>
                                <RequestStatusBadge status={request.status} />
                            </TableCell>
                            <TableCell>
                                {request.created_at ? new Date(request.created_at).toLocaleDateString() : '-'}
                            </TableCell>
                            {(actions || detailsHref) && (
                                <TableCell className="text-right">
                                    <div className="flex justify-end gap-2">
                                        {detailsHref && (
                                            <Button asChild size="sm" variant="outline">
                                                <Link href={detailsHref(request.id)}>View</Link>
                                            </Button>
                                        )}
                                        {actions?.(request)}
                                    </div>
                                </TableCell>
                            )}
                        </TableRow>
                    ))
                )}
            </TableBody>
        </Table>
    );
}
