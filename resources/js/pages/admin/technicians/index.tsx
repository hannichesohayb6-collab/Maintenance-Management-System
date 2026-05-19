import { Head, router } from '@inertiajs/react';
import { Mail, Phone, Power, UserRoundCog, Wrench } from 'lucide-react';
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
import { index, toggleActive } from '@/routes/admin/technicians';

type Technician = {
    id: number;
    full_name: string;
    email: string;
    phone: string;
    is_active: boolean;
    avatar?: string;
};

type PaginatedTechnicians = {
    data: Technician[];
};

export default function AdminTechniciansIndex({
    technicians,
}: {
    technicians: PaginatedTechnicians;
}) {
    const getInitials = useInitials();

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
                        <div className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
                            <Wrench className="size-4" />
                            <span>
                                {technicians.data.length} technician account
                                {technicians.data.length === 1 ? '' : 's'}
                            </span>
                        </div>
                        {technicians.data.length === 0 ? (
                            <Card className="border-dashed">
                                <CardContent className="flex flex-col items-center justify-center gap-3 py-12 text-center">
                                    <Wrench className="size-10 text-muted-foreground" />
                                    <div className="space-y-1">
                                        <p className="font-medium">
                                            No technicians found
                                        </p>
                                        <p className="text-sm text-muted-foreground">
                                            Technician accounts will appear here
                                            as cards.
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>
                        ) : (
                            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                                {technicians.data.map((technician) => (
                                    <Card key={technician.id} className="gap-4">
                                        <CardHeader className="gap-4 border-b bg-muted/20 pb-4">
                                            <div className="flex items-start justify-between gap-3">
                                                <div className="flex items-center gap-3">
                                                    <Avatar className="size-12 border border-border/60">
                                                        <AvatarImage
                                                            src={
                                                                technician.avatar
                                                            }
                                                            alt={
                                                                technician.full_name
                                                            }
                                                        />
                                                        <AvatarFallback className="bg-neutral-200 font-medium text-black dark:bg-neutral-700 dark:text-white">
                                                            {getInitials(
                                                                technician.full_name,
                                                            )}
                                                        </AvatarFallback>
                                                    </Avatar>
                                                    <div className="space-y-1">
                                                        <CardDescription className="flex items-center gap-2 text-xs tracking-[0.2em] uppercase">
                                                            <UserRoundCog className="size-3.5" />
                                                            Technician Account
                                                        </CardDescription>
                                                        <CardTitle className="text-lg">
                                                            {
                                                                technician.full_name
                                                            }
                                                        </CardTitle>
                                                    </div>
                                                </div>
                                                <Badge
                                                    variant={
                                                        technician.is_active
                                                            ? 'secondary'
                                                            : 'outline'
                                                    }
                                                >
                                                    {technician.is_active
                                                        ? 'Active'
                                                        : 'Inactive'}
                                                </Badge>
                                            </div>
                                        </CardHeader>
                                        <CardContent className="space-y-3">
                                            <div className="flex items-center gap-2 rounded-lg bg-muted/50 px-3 py-2 text-sm">
                                                <Mail className="size-4 text-muted-foreground" />
                                                <span className="truncate font-medium">
                                                    {technician.email}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-2 rounded-lg bg-muted/50 px-3 py-2 text-sm">
                                                <Phone className="size-4 text-muted-foreground" />
                                                <span className="font-medium">
                                                    {technician.phone}
                                                </span>
                                            </div>
                                        </CardContent>
                                        <CardFooter className="justify-end border-t pt-4">
                                            <Button
                                                size="sm"
                                                variant={
                                                    technician.is_active
                                                        ? 'outline'
                                                        : 'default'
                                                }
                                                onClick={() =>
                                                    router.post(
                                                        toggleActive(
                                                            technician.id,
                                                        ),
                                                    )
                                                }
                                            >
                                                <Power className="size-4" />
                                                {technician.is_active
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

AdminTechniciansIndex.layout = {
    breadcrumbs: [
        {
            title: 'Technicians',
            href: index(),
        },
    ],
};
