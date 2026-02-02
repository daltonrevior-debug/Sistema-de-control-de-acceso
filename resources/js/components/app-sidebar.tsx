import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { LayoutGrid, User, ListCheck, Dock, Cog, Users, UserPlus, Clock, Handshake, Calendar, BarChart3, Briefcase, UserPlus2, Ban } from 'lucide-react';
import AppLogo from './app-logo';
import { usePage } from '@inertiajs/react';

const mainNavItems: NavItem[] = [
    {
        title: 'Inicio',
        href: route('reports.index'),
        icon: LayoutGrid,
    },
    {
        title: 'Personal',
        permission: 'personal',
        icon: User,
        children: [
            {
                title: 'Gestión de Milicianos',
                href: route('personnel.employees.index'),
                icon: Users,
            },
            {
                title: 'Añadir Miliciano',
                href: route('personnel.employees.create'),
                icon: UserPlus,
            },
            {
                title: 'Suspensiones',
                href: route('personnel.suspensions.index'),
                icon: Ban,
            }
        ]
    },
    {
        title: 'Asistencias',
        icon: ListCheck,
        permission: 'asistencias',
        children: [
            {
                title: 'Historial',
                href: route('attendance.history'),
                icon: ListCheck,
            },
            {
                title: 'Solicitar Ausencia',
                href: route('attendance.request.create'),
                icon: Handshake,
            },
            {
                title: 'Historial de Ausencias',
                href: route('attendance.absence-history'),
                icon: Calendar,
            }
        ]
    },
    {
        title: 'Gestión',
        icon: Cog,
        permission: 'gestion',
        children: [
            {
                title: 'Dependencias',
                href: route('config.departments.index'),
                icon: Briefcase,
            },

            {
                title: 'Horarios',
                href: route('config.schedules.index'),
                icon: Clock,
            },
            {
                title: 'Tipos de Ausencias',
                href: route('config.absence-types.index'),
                icon: ListCheck,
            },
            {
                title: 'Solicitudes (Admin)',
                href: route('config.absence-requests.index'),
                icon: Calendar,
            }
        ]
    },
    {
        title: 'Reportes',
        icon: Dock,
        permission: 'reportes',
        children: [
            // {
            //     title: 'Resumen de Ausencias',
            //     href: route('reports.absence-summary'),
            //     icon: Calendar,
            // },
            // {
            //     title: 'Balance de Días Libres',
            //     href: route('reports.leave-balance'),
            //     icon: Clock,
            // },
            {
                title: 'Asistencia Detallada',
                href: route('reports.attendance-detail'),
                icon: BarChart3,
            },
            {
                title: 'Listado de Personal',
                href: route('reports.personnel-list'),
                icon: Users,
            }
        ]
    },
    {
        title: 'Perfiles',
        icon: UserPlus2,
        role: "super_admin",
        children: [
            {
                title: 'Lista de Usuarios',
                href: route('users.index'),
                icon: ListCheck,
            },
            {
                title: 'Crear Usuario',
                href: route('users.create'),
                icon: User,
            }
        ]
    }
];

export function AppSidebar() {

    const { auth } = usePage().props as any;
    const user = auth.user;

    const canSee = (item: NavItem) => {
        if (!item.role && !item.permission) return true;

        if (item.role) {
            const roles = Array.isArray(item.role) ? item.role : [item.role];
            if (!roles.includes(user.role)) return false;
        }

        if (item.permission) {
            const userPermissions = user.permission || [];
            if (!userPermissions.includes(item.permission)) return false;
        }

        return true;
    };

    const filteredNavItems = mainNavItems.filter(item => {
        const visible = canSee(item);

        if (visible && item.children) {
            item.children = item.children.filter(child => canSee(child));
        }

        return visible;
    });

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
                <NavMain items={filteredNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
