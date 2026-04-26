import { Head, useForm } from '@inertiajs/react';
import { PageHeader } from '@/components/shared/page-header';
import { Badge } from '@/components/ui/badge';
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
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { index, store, update } from '@/routes/admin/technicians';

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
    const createForm = useForm({
        full_name: '',
        email: '',
        phone: '',
        password: '',
        password_confirmation: '',
    });

    const editForm = useForm({
        full_name: '',
        email: '',
        phone: '',
        is_active: true,
    });

    const openEditDialog = (technician: Technician) => {
        editForm.setData({
            full_name: technician.full_name,
            email: technician.email,
            phone: technician.phone,
            is_active: technician.is_active,
        });
    };

    return (
        <>
            <Head title="Manage Technicians" />

            <div className="space-y-6 p-4">
                <PageHeader
                    title="Manage Technicians"
                    description="Create, edit, activate, and deactivate technician accounts."
                    actions={(
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button>Create Technician</Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Create Technician</DialogTitle>
                                    <DialogDescription>
                                        Add a new technician account.
                                    </DialogDescription>
                                </DialogHeader>

                                <form
                                    className="space-y-4"
                                    onSubmit={(event) => {
                                        event.preventDefault();
                                        createForm.post(store().url, {
                                            preserveScroll: true,
                                            onSuccess: () => createForm.reset(),
                                        });
                                    }}
                                >
                                    <div className="grid gap-2">
                                        <Label htmlFor="create-full-name">Full Name</Label>
                                        <Input
                                            id="create-full-name"
                                            value={createForm.data.full_name}
                                            onChange={(event) =>
                                                createForm.setData('full_name', event.target.value)
                                            }
                                        />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="create-email">Email</Label>
                                        <Input
                                            id="create-email"
                                            type="email"
                                            value={createForm.data.email}
                                            onChange={(event) =>
                                                createForm.setData('email', event.target.value)
                                            }
                                        />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="create-phone">Phone</Label>
                                        <Input
                                            id="create-phone"
                                            value={createForm.data.phone}
                                            onChange={(event) =>
                                                createForm.setData('phone', event.target.value)
                                            }
                                        />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="create-password">Password</Label>
                                        <Input
                                            id="create-password"
                                            type="password"
                                            value={createForm.data.password}
                                            onChange={(event) =>
                                                createForm.setData('password', event.target.value)
                                            }
                                        />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="create-password-confirmation">Confirm Password</Label>
                                        <Input
                                            id="create-password-confirmation"
                                            type="password"
                                            value={createForm.data.password_confirmation}
                                            onChange={(event) =>
                                                createForm.setData('password_confirmation', event.target.value)
                                            }
                                        />
                                    </div>

                                    <Button type="submit" disabled={createForm.processing}>
                                        Save
                                    </Button>
                                </form>
                            </DialogContent>
                        </Dialog>
                    )}
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
                                                <Dialog>
                                                    <DialogTrigger asChild>
                                                        <Button
                                                            size="sm"
                                                            variant="outline"
                                                            onClick={() => openEditDialog(technician)}
                                                        >
                                                            Edit
                                                        </Button>
                                                    </DialogTrigger>
                                                    <DialogContent>
                                                        <DialogHeader>
                                                            <DialogTitle>Edit Technician</DialogTitle>
                                                            <DialogDescription>
                                                                Update technician profile and status.
                                                            </DialogDescription>
                                                        </DialogHeader>

                                                        <form
                                                            className="space-y-4"
                                                            onSubmit={(event) => {
                                                                event.preventDefault();
                                                                editForm.patch(update(technician.id).url, {
                                                                    preserveScroll: true,
                                                                });
                                                            }}
                                                        >
                                                            <div className="grid gap-2">
                                                                <Label htmlFor="edit-full-name">Full Name</Label>
                                                                <Input
                                                                    id="edit-full-name"
                                                                    value={editForm.data.full_name}
                                                                    onChange={(event) =>
                                                                        editForm.setData('full_name', event.target.value)
                                                                    }
                                                                />
                                                            </div>

                                                            <div className="grid gap-2">
                                                                <Label htmlFor="edit-email">Email</Label>
                                                                <Input
                                                                    id="edit-email"
                                                                    type="email"
                                                                    value={editForm.data.email}
                                                                    onChange={(event) =>
                                                                        editForm.setData('email', event.target.value)
                                                                    }
                                                                />
                                                            </div>

                                                            <div className="grid gap-2">
                                                                <Label htmlFor="edit-phone">Phone</Label>
                                                                <Input
                                                                    id="edit-phone"
                                                                    value={editForm.data.phone}
                                                                    onChange={(event) =>
                                                                        editForm.setData('phone', event.target.value)
                                                                    }
                                                                />
                                                            </div>

                                                            <div className="grid gap-2">
                                                                <Label htmlFor="edit-is-active">
                                                                    Active (true/false)
                                                                </Label>
                                                                <Input
                                                                    id="edit-is-active"
                                                                    value={String(editForm.data.is_active)}
                                                                    onChange={(event) =>
                                                                        editForm.setData(
                                                                            'is_active',
                                                                            event.target.value === 'true',
                                                                        )
                                                                    }
                                                                />
                                                            </div>

                                                            <Button type="submit" disabled={editForm.processing}>
                                                                Update
                                                            </Button>
                                                        </form>
                                                    </DialogContent>
                                                </Dialog>
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
