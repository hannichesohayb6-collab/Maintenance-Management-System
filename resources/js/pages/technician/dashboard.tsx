import { Head } from '@inertiajs/react';
import { BadgeCheck, Hammer, Inbox, Send } from 'lucide-react';
import { PageHeader } from '@/components/shared/page-header';
import { StatCard } from '@/components/shared/stat-card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { dashboard } from '@/routes';

type TechnicianDashboardProps = {
    newRequests: number;
    offersSent: number;
    inProgressRequests: number;
    completedRequests: number;
};

export default function TechnicianDashboard({
    newRequests,
    offersSent,
    inProgressRequests,
    completedRequests,
}: TechnicianDashboardProps) {
    return (
        <>
            <Head title="Technician Dashboard" />

            <div className="space-y-6 p-4">
                <PageHeader
                    title="Technician Dashboard"
                    description="Track new requests, offers, and assigned work."
                />

                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                    <StatCard label="New Requests" value={newRequests} icon={Inbox} />
                    <StatCard label="Offers Sent" value={offersSent} icon={Send} />
                    <StatCard label="In Progress" value={inProgressRequests} icon={Hammer} />
                    <StatCard label="Completed" value={completedRequests} icon={BadgeCheck} />
                </div>

                <Separator />

                <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">New: {newRequests}</Badge>
                    <Badge variant="secondary">In Progress: {inProgressRequests}</Badge>
                    <Badge variant="secondary">Completed: {completedRequests}</Badge>
                </div>
            </div>
        </>
    );
}

TechnicianDashboard.layout = {
    breadcrumbs: [
        {
            title: 'Dashboard',
            href: dashboard(),
        },
    ],
};
