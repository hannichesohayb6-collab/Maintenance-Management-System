import { Head } from '@inertiajs/react';
import { CheckCircle2, ClipboardList, UserCog, Users } from 'lucide-react';
import { PageHeader } from '@/components/shared/page-header';
import { StatCard } from '@/components/shared/stat-card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { dashboard } from '@/routes';

type AdminDashboardProps = {
    totalUsers: number;
    totalTechnicians: number;
    totalRequests: number;
    completedRequests: number;
};

export default function AdminDashboard({
    totalUsers,
    totalTechnicians,
    totalRequests,
    completedRequests,
}: AdminDashboardProps) {
    return (
        <>
            <Head title="Admin Dashboard" />

            <div className="space-y-6 p-4">
                <PageHeader
                    title="Admin Dashboard"
                    description="System-wide operational overview."
                />

                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                    <StatCard label="Total Users" value={totalUsers} icon={Users} />
                    <StatCard label="Total Technicians" value={totalTechnicians} icon={UserCog} />
                    <StatCard label="Total Requests" value={totalRequests} icon={ClipboardList} />
                    <StatCard label="Completed Requests" value={completedRequests} icon={CheckCircle2} />
                </div>

                <Separator />

                <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">Users: {totalUsers}</Badge>
                    <Badge variant="secondary">Technicians: {totalTechnicians}</Badge>
                    <Badge variant="secondary">Completed: {completedRequests}</Badge>
                </div>
            </div>
        </>
    );
}

AdminDashboard.layout = {
    breadcrumbs: [
        {
            title: 'Dashboard',
            href: dashboard(),
        },
    ],
};
