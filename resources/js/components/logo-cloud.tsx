import {
    ClipboardList,
    FileCheck,
    Keyboard,
    LifeBuoy,
    LockKeyhole,
    ShieldCheck,
    Sparkles,
    UserCog,
    Wrench,
} from 'lucide-react';
import { InfiniteSlider } from '@/components/ui/infinite-slider';
import { Card, CardContent } from '@/components/ui/card';

const workflowItems = [
    {
        label: 'Request Hub',
        icon: LifeBuoy,
    },
    {
        label: 'Technician offers',
        icon: Wrench,
    },
    {
        label: 'Problem description',
        icon: Keyboard,
    },
    {
        label: 'Priority tracking',
        icon: Sparkles,
    },
    {
        label: 'Status history',
        icon: ClipboardList,
    },
    {
        label: 'Task assignment',
        icon: FileCheck,
    },
    {
        label: 'Maintenance lifecycle',
        icon: ShieldCheck,
    },
    {
        label: 'Secure access',
        icon: LockKeyhole,
    },
];

export function LogoCloud() {
    return (
        <div className="overflow-hidden mask-[linear-gradient(to_right,transparent,black_18%,black_82%,transparent)] py-4">
            <InfiniteSlider gap={12} reverse speed={80} speedOnHover={25}>
                {workflowItems.map((item) => (
                    <Card
                        className="pointer-events-none min-w-44 border-border/70 bg-card/95 shadow-sm select-none"
                        key={item.label}
                    >
                        <CardContent className="flex flex-col items-center gap-3 px-4 py-3">
                            <item.icon className="size-4 text-primary" />
                            <span className="text-sm font-medium text-muted-foreground">
                                {item.label}
                            </span>
                        </CardContent>
                    </Card>
                ))}
            </InfiniteSlider>
        </div>
    );
}
