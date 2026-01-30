import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/layouts/app-layout';
import {  Calendar, Clock, BarChart3, Users, AlertTriangle } from 'lucide-react';
import { type BreadcrumbItem } from '@/types';
interface ReportsIndexProps {
    employeeCount: number;
    absenceTypeCount: number;
    pendingRequestsCount: number;
}

const ReportsIndex: React.FC<ReportsIndexProps> = ({ employeeCount, absenceTypeCount, pendingRequestsCount }) => {
    
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Reportes', href: route('reports.index') },
    ];

    const reportLinks = [
        // {
        //     title: 'Resumen de Ausencias',
        //     description: 'Visualiza la tasa de ausentismo, resumen por tipo de ausencia y tendencias mensuales.',
        //     icon: Calendar,
        //     href: route('reports.absence-summary')
        // },
        // {
        //     title: 'Balance de Días Libres',
        //     description: 'Revisa cuántos días de vacaciones o permisos pagados le restan a cada miliciano.',
        //     icon: Clock,
        //     href: route('reports.leave-balance')
        // },
        {
            title: 'Reporte de Asistencia',
            description: 'Detalle de marcajes de entrada y salida por período de tiempo y miliciano.',
            icon: BarChart3,
            href: route('reports.attendance-detail')
        },
        {
            title: 'Listado de Personal',
            description: 'Genera un listado completo de milicianos con información clave (departamento, cargo).',
            icon: Users,
            href: route('reports.personnel-list')
        },
    ];

    return (
        <AuthenticatedLayout breadcrumbs={breadcrumbs}>
            <Head title="Reportes" />

            <div className="py-12">
                <div className="w-full mx-auto sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-extrabold text-gray-900 mb-8">Centro de Reportes</h2>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
                        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-indigo-500">
                            <p className="text-sm font-medium text-gray-500">Milicianos Activos</p>
                            <p className="mt-1 text-3xl font-semibold text-gray-900">{employeeCount}</p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-sky-500">
                            <p className="text-sm font-medium text-gray-500">Tipos de Ausencia Definidos</p>
                            <p className="mt-1 text-3xl font-semibold text-gray-900">{absenceTypeCount}</p>
                        </div>
                        <Link 
                            href={route('config.absence-requests.index')}
                            className="bg-white p-6 rounded-lg shadow-md border-l-4 border-red-500 hover:shadow-lg transition flex flex-col justify-between"
                        >
                            <p className="text-sm font-medium text-gray-500 flex items-center">
                                <AlertTriangle className="w-4 h-4 mr-1 text-red-500" /> Solicitudes Pendientes
                            </p>
                            <p className="mt-1 text-3xl font-semibold text-red-600">
                                {pendingRequestsCount}
                            </p>
                            <span className="text-xs text-red-500 mt-2">Revisar ahora</span>
                        </Link>
                    </div>

                    <h3 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">Reportes Disponibles</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {reportLinks.map((link) => (
                            <Link key={link.title} href={link.href} className="block bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300 transform hover:-translate-y-0.5 border border-gray-100">
                                <link.icon className="w-8 h-8 text-indigo-500 mb-3" />
                                <h4 className="text-lg font-semibold text-gray-900 mb-1">{link.title}</h4>
                                <p className="text-sm text-gray-600">{link.description}</p>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default ReportsIndex;