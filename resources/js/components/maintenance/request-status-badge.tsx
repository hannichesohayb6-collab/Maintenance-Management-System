import { Badge } from '@/components/ui/badge';

type RequestStatusBadgeProps = {
    status: string;
};

const statusClasses: Record<string, string> = {
    pending: 'bg-amber-100 text-amber-900 hover:bg-amber-100',
    technician_assigned: 'bg-sky-100 text-sky-900 hover:bg-sky-100',
    in_progress: 'bg-orange-100 text-orange-900 hover:bg-orange-100',
    completed: 'bg-green-100 text-green-900 hover:bg-green-100',
    cancelled: 'bg-slate-200 text-slate-900 hover:bg-slate-200',
};

export function RequestStatusBadge({ status }: RequestStatusBadgeProps) {
    return (
        <Badge className={statusClasses[status] ?? 'bg-slate-100 text-slate-900 hover:bg-slate-100'}>
            {status.replaceAll('_', ' ')}
        </Badge>
    );
}
