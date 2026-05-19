import { Head, router } from '@inertiajs/react';
import { Mail, Phone, Power, UserRound, Users } from 'lucide-react';
import { PageHeader } from '@/components/shared/page-header';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { useInitials } from '@/hooks/use-initials';
import { index, toggleActive } from '@/routes/admin/users';

type AdminUser = {
    id: number;
    full_name: string;
    email: string;
    phone: string;
    is_active: boolean;
    avatar?: string;
};

type PaginatedUsers = {
    data: AdminUser[];
};

export default function AdminUsersIndex({ users }: { users: PaginatedUsers }) {
    const getInitials = useInitials();

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
                        <div className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
                            <Users className="size-4" />
                            <span>
                                {users.data.length} user account
                                {users.data.length === 1 ? '' : 's'}
                            </span>
                        </div>
                        {users.data.length === 0 ? (
                            <Card className="border-dashed">
                                <CardContent className="flex flex-col items-center justify-center gap-3 py-12 text-center">
                                    <Users className="size-10 text-muted-foreground" />
                                    <div className="space-y-1">
                                        <p className="font-medium">
                                            No users found
                                        </p>
                                        <p className="text-sm text-muted-foreground">
                                            User accounts will appear here as
                                            cards.
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>
                        ) : (
                            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                                {users.data.map((user) => (
                                    <Card key={user.id} className="gap-4">
                                        <CardHeader className="gap-4 border-b bg-muted/20 pb-4">
                                            <div className="flex items-start justify-between gap-3">
                                                <div className="flex items-center gap-3">
                                                    <Avatar className="size-12 border border-border/60">
                                                        <AvatarImage
                                                            src={user.avatar}
                                                            alt={user.full_name}
                                                        />
                                                        <AvatarFallback className="bg-neutral-200 font-medium text-black dark:bg-neutral-700 dark:text-white">
                                                            {getInitials(
                                                                user.full_name,
                                                            )}
                                                        </AvatarFallback>
                                                    </Avatar>
                                                    <div className="space-y-1">
                                                        <CardDescription className="flex items-center gap-2 text-xs tracking-[0.2em] uppercase">
                                                            <UserRound className="size-3.5" />
                                                            User Account
                                                        </CardDescription>
                                                        <CardTitle className="text-lg">
                                                            {user.full_name}
                                                        </CardTitle>
                                                    </div>
                                                </div>
                                                <Badge
                                                    variant={
                                                        user.is_active
                                                            ? 'secondary'
                                                            : 'outline'
                                                    }
                                                >
                                                    {user.is_active
                                                        ? 'Active'
                                                        : 'Inactive'}
                                                </Badge>
                                            </div>
                                        </CardHeader>
                                        <CardContent className="space-y-3">
                                            <div className="flex items-center gap-2 rounded-lg bg-muted/50 px-3 py-2 text-sm">
                                                <Mail className="size-4 text-muted-foreground" />
                                                <span className="truncate font-medium">
                                                    {user.email}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-2 rounded-lg bg-muted/50 px-3 py-2 text-sm">
                                                <Phone className="size-4 text-muted-foreground" />
                                                <span className="font-medium">
                                                    {user.phone}
                                                </span>
                                            </div>
                                        </CardContent>
                                        <CardFooter className="justify-end border-t pt-4">
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                onClick={() =>
                                                    router.post(
                                                        toggleActive(user.id),
                                                    )
                                                }
                                            >
                                                <Power className="size-4" />
                                                {user.is_active
                                                    ? 'Deactivate'
                                                    : 'Activate'}
                                            </Button>
                                        </CardFooter>
                                    </Card>
                                ))}
                            </div>
                        )}
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
