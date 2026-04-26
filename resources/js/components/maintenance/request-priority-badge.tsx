import { Badge } from '@/components/ui/badge';

type RequestPriorityBadgeProps = {
    priority: string;
};

const priorityClasses: Record<string, string> = {
    low: 'bg-slate-100 text-slate-900 hover:bg-slate-100',
    medium: 'bg-blue-100 text-blue-900 hover:bg-blue-100',
    high: 'bg-orange-100 text-orange-900 hover:bg-orange-100',
    urgent: 'bg-red-100 text-red-900 hover:bg-red-100',
};

export function RequestPriorityBadge({ priority }: RequestPriorityBadgeProps) {
    return (
        <Badge variant="outline" className={priorityClasses[priority] ?? ''}>
            {priority}
        </Badge>
    );
}
