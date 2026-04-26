import { Head, router } from '@inertiajs/react';
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
import { index, toggleActive } from '@/routes/admin/technicians';

type Technician = {
    id: number;
    full_name: string;
    email: string;
    phone: string;
    is_active: boolean;
};

type PaginatedTechnicians = {
    data: Technician[];
};

export default function AdminTechniciansIndex({
    technicians,
}: {
    technicians: PaginatedTechnicians;
}) {
    return (
        <>
            <Head title="Manage Technicians" />

            <div className="space-y-6 p-4">
                <PageHeader
                    title="Manage Technicians"
                    description="Activate or deactivate technician accounts."
                />

                <Card>
                    <CardContent className="pt-6">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Full Name</TableHead>
                                    <TableHead>Email</TableHead>
                                    <TableHead>Phone</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Action</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {technicians.data.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={5} className="text-center text-muted-foreground">
                                            No technicians found.
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    technicians.data.map((technician) => (
                                        <TableRow key={technician.id}>
                                            <TableCell>{technician.full_name}</TableCell>
                                            <TableCell>{technician.email}</TableCell>
                                            <TableCell>{technician.phone}</TableCell>
                                            <TableCell>
                                                <Badge variant={technician.is_active ? 'secondary' : 'outline'}>
                                                    {technician.is_active ? 'Active' : 'Inactive'}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <Button
                                                    size="sm"
                                                    variant={technician.is_active ? 'outline' : 'default'}
                                                    onClick={() => router.post(toggleActive(technician.id).url)}
                                                >
                                                    {technician.is_active ? 'Deactivate' : 'Activate'}
                                                </Button>
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

AdminTechniciansIndex.layout = {
    breadcrumbs: [
        {
            title: 'Technicians',
            href: index(),
        },
    ],
};
