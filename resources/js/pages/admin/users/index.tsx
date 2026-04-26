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
import { index, toggleActive } from '@/routes/admin/users';

type AdminUser = {
    id: number;
    full_name: string;
    email: string;
    phone: string;
    is_active: boolean;
};

type PaginatedUsers = {
    data: AdminUser[];
};

export default function AdminUsersIndex({ users }: { users: PaginatedUsers }) {
    return (
        <>
            <Head title="Manage Users" />

            <div className="space-y-6 p-4">
                <PageHeader
                    title="Manage Users"
                    description="Activate or deactivate normal user accounts."
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
                                {users.data.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={5} className="text-center text-muted-foreground">
                                            No users found.
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    users.data.map((user) => (
                                        <TableRow key={user.id}>
                                            <TableCell>{user.full_name}</TableCell>
                                            <TableCell>{user.email}</TableCell>
                                            <TableCell>{user.phone}</TableCell>
                                            <TableCell>
                                                <Badge variant={user.is_active ? 'secondary' : 'outline'}>
                                                    {user.is_active ? 'Active' : 'Inactive'}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    onClick={() => router.patch(toggleActive(user.id))}
                                                >
                                                    {user.is_active ? 'Deactivate' : 'Activate'}
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

AdminUsersIndex.layout = {
    breadcrumbs: [
        {
            title: 'Users',
            href: index(),
        },
    ],
};
