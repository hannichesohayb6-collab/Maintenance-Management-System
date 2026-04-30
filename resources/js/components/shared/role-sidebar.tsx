import { Link } from '@inertiajs/react';
import {
    ClipboardList,
    LayoutGrid,
    ListChecks,
    PlusCircle,
    ShieldCheck,
    UserCog,
    Users,
    Wrench,
} from 'lucide-react';

import AppLogo from '@/components/app-logo';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { dashboard } from '@/routes';
import { index as adminRequestsIndex } from '@/routes/admin/requests';
import { index as techniciansIndex } from '@/routes/admin/technicians';
import { index as usersIndex } from '@/routes/admin/users';
import { myTasks } from '@/routes/technician';
import { index as technicianRequestsIndex } from '@/routes/technician/requests';
import { create, index as userRequestsIndex } from '@/routes/user/requests';
import type { NavItem } from '@/types';

type RoleSidebarType = 'admin' | 'technician' | 'client';

const navItemsByRole: Record<RoleSidebarType, NavItem[]> = {
    admin: [
        {
            title: 'Dashboard',
            href: dashboard(),
            icon: ShieldCheck,
        },
        {
            title: 'Users',
            href: usersIndex(),
            icon: Users,
        },
        {
            title: 'Technicians',
            href: techniciansIndex(),
            icon: UserCog,
        },
        {
            title: 'Requests',
            href: adminRequestsIndex(),
            icon: ClipboardList,
        },
    ],
    technician: [
        {
            title: 'Dashboard',
            href: dashboard(),
            icon: ClipboardList,
        },
        {
            title: 'Available Requests',
            href: technicianRequestsIndex(),
            icon: ListChecks,
        },
        {
            title: 'My Tasks',
            href: myTasks(),
            icon: Wrench,
        },
    ],
    client: [
        {
            title: 'Dashboard',
            href: dashboard(),
            icon: LayoutGrid,
        },
        {
            title: 'My Requests',
            href: userRequestsIndex(),
            icon: ClipboardList,
        },
        {
            title: 'Create Request',
            href: create(),
            icon: PlusCircle,
        },
    ],
};

export function RoleSidebar({ role }: { role: RoleSidebarType }) {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={dashboard()} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={navItemsByRole[role]} />
            </SidebarContent>

            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}

export function AdminSidebar() {
    return <RoleSidebar role="admin" />;
}

export function TechnicianSidebar() {
    return <RoleSidebar role="technician" />;
}

export function UserSidebar() {
    return <RoleSidebar role="client" />;
}
