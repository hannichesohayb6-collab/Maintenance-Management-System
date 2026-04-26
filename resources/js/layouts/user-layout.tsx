import { AppContent } from '@/components/app-content';
import { AppShell } from '@/components/app-shell';
import { AppSidebarHeader } from '@/components/app-sidebar-header';
import { TechnicianSidebar } from '@/components/shared/technician-sidebar';
import { UserSidebar } from '@/components/shared/user-sidebar';
import type { AppLayoutProps } from '@/types';

type UserLayoutProps = AppLayoutProps & {
    sidebar?: 'user' | 'technician';
};

export default function UserLayout({
    children,
    breadcrumbs = [],
    sidebar = 'user',
}: UserLayoutProps) {
    return (
        <AppShell variant="sidebar">
            {sidebar === 'technician' ? <TechnicianSidebar /> : <UserSidebar />}
            <AppContent variant="sidebar" className="overflow-x-hidden">
                <AppSidebarHeader breadcrumbs={breadcrumbs} />
                {children}
            </AppContent>
        </AppShell>
    );
}
