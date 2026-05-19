import { Head } from '@inertiajs/react';
import { BadgeCheck, Clock3, Hammer } from 'lucide-react';
import { RequestCardGrid } from '@/components/maintenance/request-card-grid';
import { PageHeader } from '@/components/shared/page-header';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { myTasks } from '@/routes/technician';
import { show } from '@/routes/technician/requests';

type TaskRow = {
    id: number;
    title: string;
    priority: string;
    status: string;
    created_at?: string;
    user?: {
        id: number;
        full_name: string;
    } | null;
};

export default function TechnicianMyTasks({
    assignedTasks,
    inProgress,
    completed,
}: {
    assignedTasks: TaskRow[];
    inProgress: TaskRow[];
    completed: TaskRow[];
}) {
    const totalTasks =
        assignedTasks.length + inProgress.length + completed.length;

    return (
        <>
            <Head title="My Tasks" />

            <div className="space-y-6 p-4">
                <PageHeader
                    title="My Tasks"
                    description="Monitor assigned requests by progress stage."
                />

                <Card>
                    <CardContent className="pt-6">
                        <div className="mb-6 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                            <span className="flex items-center gap-2">
                                <Hammer className="size-4" />
                                {totalTasks} total task
                                {totalTasks === 1 ? '' : 's'}
                            </span>
                            <span className="flex items-center gap-2">
                                <Clock3 className="size-4" />
                                {inProgress.length} currently in progress
                            </span>
                            <span className="flex items-center gap-2">
                                <BadgeCheck className="size-4" />
                                {completed.length} completed
                            </span>
                        </div>
                        <Tabs defaultValue="assigned" className="space-y-4">
                            <TabsList>
                                <TabsTrigger value="assigned">
                                    Assigned ({assignedTasks.length})
                                </TabsTrigger>
                                <TabsTrigger value="in-progress">
                                    In Progress ({inProgress.length})
                                </TabsTrigger>
                                <TabsTrigger value="completed">
                                    Completed ({completed.length})
                                </TabsTrigger>
                            </TabsList>

                            <TabsContent value="assigned">
                                <RequestCardGrid
                                    requests={assignedTasks}
                                    showUser
                                    emptyMessage="No tasks found."
                                    detailsHref={(id) => show(id).url}
                                />
                            </TabsContent>
                            <TabsContent value="in-progress">
                                <RequestCardGrid
                                    requests={inProgress}
                                    showUser
                                    emptyMessage="No tasks found."
                                    detailsHref={(id) => show(id).url}
                                />
                            </TabsContent>
                            <TabsContent value="completed">
                                <RequestCardGrid
                                    requests={completed}
                                    showUser
                                    emptyMessage="No tasks found."
                                    detailsHref={(id) => show(id).url}
                                />
                            </TabsContent>
                        </Tabs>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}

TechnicianMyTasks.layout = {
    breadcrumbs: [
        {
            title: 'My Tasks',
            href: myTasks(),
        },
    ],
};
