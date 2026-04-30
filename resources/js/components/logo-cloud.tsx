import { InfiniteSlider } from '@/components/ui/infinite-slider';

const workflowLabels = [
    'Resident portal',
    'Technician offers',
    'Admin control',
    'Priority tracking',
    'Status history',
    'Task assignment',
    'Maintenance lifecycle',
    'Secure access',
];

export function LogoCloud() {
    return (
        <div className="overflow-hidden mask-[linear-gradient(to_right,transparent,black_18%,black_82%,transparent)] py-4">
            <InfiniteSlider gap={12} reverse speed={80} speedOnHover={25}>
                {workflowLabels.map((label) => (
                    <span
                        className="pointer-events-none rounded-full border bg-card px-4 py-2 text-sm font-medium text-muted-foreground shadow-xs select-none"
                        key={label}
                    >
                        {label}
                    </span>
                ))}
            </InfiniteSlider>
        </div>
    );
}
