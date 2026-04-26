import { Head, Link } from '@inertiajs/react';
import { PageHeader } from '@/components/shared/page-header';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { myTasks } from '@/routes/technician';
import { show } from '@/routes/technician/requests';

type TaskRow = {
    id: number;
    title: string;
    priority: string;
    status: string;
    user?: {
        id: number;
        full_name: string;
    };
};

function TaskTable({ items }: { items: TaskRow[] }) {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>User</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {items.length === 0 ? (
                    <TableRow>
                        <TableCell colSpan={5} className="text-center text-muted-foreground">
                            No tasks found.
                        </TableCell>
                    </TableRow>
                ) : (
                    items.map((task) => (
                        <TableRow key={task.id}>
                            <TableCell>{task.title}</TableCell>
                            <TableCell>{task.user?.full_name ?? 'N/A'}</TableCell>
                            <TableCell>
                                <Badge variant="outline">{task.priority}</Badge>
                            </TableCell>
                            <TableCell>
                                <Badge>{task.status}</Badge>
                            </TableCell>
                            <TableCell className="text-right">
                                <Link href={show(task.id)} className="text-sm underline">
                                    View
                                </Link>
                            </TableCell>
                        </TableRow>
                    ))
                )}
            </TableBody>
        </Table>
    );
}

export default function TechnicianMyTasks({
    acceptedOrUnderReview,
    inProgress,
    completed,
}: {
    acceptedOrUnderReview: TaskRow[];
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
                        <Tabs defaultValue="under-review" className="space-y-4">
                            <TabsList>
                                <TabsTrigger value="under-review">
                                    Under Review ({acceptedOrUnderReview.length})
                                </TabsTrigger>
                                <TabsTrigger value="in-progress">
                                    In Progress ({inProgress.length})
                                </TabsTrigger>
                                <TabsTrigger value="completed">
                                    Completed ({completed.length})
                                </TabsTrigger>
                            </TabsList>

                            <TabsContent value="under-review">
                                <TaskTable items={acceptedOrUnderReview} />
                            </TabsContent>
                            <TabsContent value="in-progress">
                                <TaskTable items={inProgress} />
                            </TabsContent>
                            <TabsContent value="completed">
                                <TaskTable items={completed} />
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
