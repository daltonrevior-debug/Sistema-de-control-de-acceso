import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { LayoutGrid, User, ListCheck, Dock, Cog, Users, UserPlus, Clock } from 'lucide-react';
import AppLogo from './app-logo';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
        icon: LayoutGrid,
    },
    {
        title: 'Personal',
        icon: User,
        children: [
            {
                title: 'Gestión de Empleados',
                href: route('personnel.employees.index'),
                icon: Users,
            },
            {
                title: 'Añadir Empleado',
                href: route('personnel.employees.create'),
                icon: UserPlus,
            }
        ]
    },
    {
        title: 'Asistencias',
        icon: ListCheck,
        children: [
            {
                title: 'Marcaje Diario',
                href: route('attendance.index'),
                icon: Clock,
            },
            {
                title: 'Historial',
                href: route('attendance.history'),
                icon: ListCheck,
            },
        ]
    },
    {
        title: 'Reportes',
        href: '/dashboard',
        icon: Dock,
    },
    {
        title: 'Configuracion',
        icon: Cog,
        children: [
            {
                title: 'Horarios',
                href: route('config.schedules.index'),
                icon: Clock,
            },
        ]
    }
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/dashboard" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
