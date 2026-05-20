import { Link } from '@inertiajs/react';
import {
    CalendarDays,
    CircleUserRound,
    ClipboardList,
    Eye,
    ShieldAlert,
    UserRoundCog,
    Star,
} from 'lucide-react';
import type { ReactNode } from 'react';
import { RequestPriorityBadge } from '@/components/maintenance/request-priority-badge';
import { RequestStatusBadge } from '@/components/maintenance/request-status-badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
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

type BaseRequestCard = {
    id: number;
    title: string;
    priority: string;
    status: string;
    created_at?: string;
    user?: {
        full_name: string;
        avatar?: string;
    } | null;
    assigned_technician?: {
        id: number;
        full_name: string;
        rating?: number;
        avatar?: string;
    } | null;
};

function RequestMetaItem({
    icon: Icon,
    label,
    value,
}: {
    icon: typeof CalendarDays;
    label: string;
    value: string;
}) {
    return (
        <div className="flex items-center gap-2 rounded-lg bg-muted/50 px-3 py-2 text-sm">
            <Icon className="size-4 text-muted-foreground" />
            <div className="min-w-0">
                <p className="text-xs tracking-wide text-muted-foreground uppercase">
                    {label}
                </p>
                <p className="truncate font-medium text-foreground">{value}</p>
            </div>
        </div>
    );
}

function RequestPersonItem({
    icon: Icon,
    label,
    person,
    fallbackText,
    rating,
}: {
    icon: typeof CalendarDays;
    label: string;
    person?: {
        full_name: string;
        avatar?: string;
    } | null;
    fallbackText: string;
    rating?: number;
}) {
    const getInitials = useInitials();
    const name = person?.full_name ?? fallbackText;

    return (
        <div className="flex items-center gap-3 rounded-lg bg-muted/50 px-3 py-2 text-sm">
            <Avatar className="size-10 border border-border/60">
                <AvatarImage src={person?.avatar} alt={name} />
                <AvatarFallback className="bg-neutral-200 font-medium text-black dark:bg-neutral-700 dark:text-white">
                    {getInitials(name)}
                </AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1">
                <p className="flex items-center gap-2 text-xs tracking-wide text-muted-foreground uppercase">
                    <Icon className="size-3.5" />
                    {label}
                </p>
                <div className="flex items-center gap-2">
                    <p className="truncate font-medium text-foreground">{name}</p>
                    {rating !== undefined && rating > 0 && (
                        <div className="flex items-center gap-1 text-yellow-500">
                            <Star className="size-3 fill-yellow-500" />
                            <span className="text-xs font-medium">{rating.toFixed(1)}</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export function RequestCardGrid<TRequest extends BaseRequestCard>({
    requests,
    emptyMessage,
    detailsHref,
    showUser = false,
    showTechnician = false,
    actions,
}: {
    requests: TRequest[];
    emptyMessage: string;
    detailsHref?: (id: number) => string;
    showUser?: boolean;
    showTechnician?: boolean;
    actions?: (request: TRequest) => ReactNode;
}) {
    if (requests.length === 0) {
        return (
            <Card className="border-dashed">
                <CardContent className="flex flex-col items-center justify-center gap-3 py-12 text-center">
                    <ShieldAlert className="size-10 text-muted-foreground" />
                    <div className="space-y-1">
                        <p className="font-medium">Nothing to show yet</p>
                        <p className="text-sm text-muted-foreground">
                            {emptyMessage}
                        </p>
                    </div>
                </CardContent>
            </Card>
        );
    }

    return (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {requests.map((request) => (
                <Card
                    key={request.id}
                    className="gap-4 overflow-hidden border-border/70"
                >
                    <CardHeader className="gap-4 border-b bg-muted/20 pb-4">
                        <div className="flex items-start justify-between gap-3">
                            <div className="space-y-1">
                                <CardTitle className="line-clamp-2 text-lg">
                                    {request.title}
                                </CardTitle>
                            </div>
                            <RequestStatusBadge status={request.status} />
                        </div>
                        <div className="flex flex-wrap gap-2">
                            <RequestPriorityBadge priority={request.priority} />
                        </div>
                    </CardHeader>

                    <CardContent className="space-y-3">
                        <RequestMetaItem
                            icon={CalendarDays}
                            label="Created"
                            value={
                                request.created_at
                                    ? new Date(
                                        request.created_at,
                                    ).toLocaleDateString()
                                    : '-'
                            }
                        />

                        {showUser && (
                            <RequestPersonItem
                                icon={CircleUserRound}
                                label="Requested By"
                                person={request.user}
                                fallbackText="N/A"
                            />
                        )}

                        {showTechnician && (
                            <RequestPersonItem
                                icon={UserRoundCog}
                                label="Technician"
                                person={request.assigned_technician}
                                rating={request.assigned_technician?.rating}
                                fallbackText="Not assigned"
                            />
                        )}
                    </CardContent>

                    {(detailsHref || actions) && (
                        <CardFooter className="mt-auto justify-end gap-2 border-t pt-4">
                            {detailsHref && (
                                <Button asChild size="sm" variant="outline">
                                    <Link href={detailsHref(request.id)}>
                                        <Eye className="size-4" />
                                        View Details
                                    </Link>
                                </Button>
                            )}
                            {actions?.(request)}
                        </CardFooter>
                    )}
                </Card>
            ))}
        </div>
    );
}
