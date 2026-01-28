import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { LayoutGrid, User, ListCheck, Dock, Cog, Users, UserPlus, Clock, Handshake, Calendar, BarChart3, Briefcase, UserPlus2, UserCheck } from 'lucide-react';
import AppLogo from './app-logo';

const mainNavItems: NavItem[] = [
    {
        title: 'Inicio',
        href: route('reports.index'),
        icon: LayoutGrid,
    },
    {
        title: 'Personal',
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
            }
        ]
    },
    {
        title: 'Asistencias',
        icon: ListCheck,
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
        children: [
            {
                title: 'Resumen de Ausencias',
                href: route('reports.absence-summary'),
                icon: Calendar,
            },
            {
                title: 'Balance de Días Libres',
                href: route('reports.leave-balance'),
                icon: Clock,
            },
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
