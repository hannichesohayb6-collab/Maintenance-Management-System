import { Head } from '@inertiajs/react';
import { RequestTable } from '@/components/maintenance/request-table';
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
                                <RequestTable
                                    requests={assignedTasks}
                                    showUser
                                    emptyMessage="No tasks found."
                                    detailsHref={(id) => show(id).url}
                                />
                            </TabsContent>
                            <TabsContent value="in-progress">
                                <RequestTable
                                    requests={inProgress}
                                    showUser
                                    emptyMessage="No tasks found."
                                    detailsHref={(id) => show(id).url}
                                />
                            </TabsContent>
                            <TabsContent value="completed">
                                <RequestTable
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
