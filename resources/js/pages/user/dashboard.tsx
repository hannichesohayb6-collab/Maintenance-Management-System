import { Head } from '@inertiajs/react';
import { CheckCircle2, ClipboardList, Clock3, Wrench } from 'lucide-react';
import { PageHeader } from '@/components/shared/page-header';
import { StatCard } from '@/components/shared/stat-card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { dashboard } from '@/routes';

type UserDashboardProps = {
    totalRequests: number;
    pendingRequests: number;
    inProgressRequests: number;
    completedRequests: number;
};

export default function UserDashboard({
    totalRequests,
    pendingRequests,
    inProgressRequests,
    completedRequests,
}: UserDashboardProps) {
    return (
        <>
            <Head title="User Dashboard" />

            <div className="space-y-6 p-4">
                <PageHeader
                    title="User Dashboard"
                    description="Overview of your maintenance requests."
                />

                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                    <StatCard label="Total Requests" value={totalRequests} icon={ClipboardList} />
                    <StatCard label="Pending Requests" value={pendingRequests} icon={Clock3} />
                    <StatCard label="In Progress" value={inProgressRequests} icon={Wrench} />
                    <StatCard label="Completed" value={completedRequests} icon={CheckCircle2} />
                </div>

                <Separator />

                <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">Pending: {pendingRequests}</Badge>
                    <Badge variant="secondary">In Progress: {inProgressRequests}</Badge>
                    <Badge variant="secondary">Completed: {completedRequests}</Badge>
                </div>
            </div>
        </>
    );
}

UserDashboard.layout = {
    breadcrumbs: [
        {
            title: 'Dashboard',
            href: dashboard(),
        },
    ],
};
