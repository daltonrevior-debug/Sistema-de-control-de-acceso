import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/layouts/app-layout';
import { SuspensionIndexProps } from '@/types/global';
import Pagination from '@/components/Pagination';
import {
    Ban,
    Calendar,
    Plus,
    FileText,
    Trash2,
    Pencil,
    Clock,
    UserX
} from 'lucide-react';

const SuspensionIndex: React.FC<SuspensionIndexProps> = ({ suspensions }) => {

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('es-ES', {
            day: 'numeric', month: 'short', year: 'numeric'
        });
    };

    const getDuration = (start: string, end: string) => {
        const diff = new Date(end).getTime() - new Date(start).getTime();
        const days = Math.ceil(diff / (1000 * 3600 * 24)) + 1;
        return `${days} ${days === 1 ? 'día' : 'días'}`;
    };

    const handleDelete = (id: number) => {
        if (confirm('¿Estás seguro de eliminar esta suspensión? Esta acción no se puede deshacer.')) {
            router.delete(route('personnel.suspensions.destroy', id));
        }
    };

    return (
        <AuthenticatedLayout breadcrumbs={[
            { title: 'Personal', href: route('personnel.employees.index') },
            { title: 'Suspensiones', href: route('personnel.suspensions.index') }
        ]}>
            <Head title="Gestión de Suspensiones" />

            <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl space-y-6">

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                            <Ban className="w-8 h-8 text-red-600" />
                            Suspensiones y Sanciones
                        </h1>
                        <p className="text-gray-500 text-sm mt-1">
                            Historial y gestión de medidas disciplinarias del personal.
                        </p>
                    </div>
                    <Link
                        href={route('personnel.suspensions.create')}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2.5 px-5 rounded-xl shadow-lg shadow-indigo-200 transition-all active:scale-95 flex items-center gap-2 text-sm"
                    >
                        <Plus className="w-5 h-5" />
                        Nueva Suspensión
                    </Link>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead>
                                <tr className="bg-gray-50/50">
                                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Miliciano</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Periodo</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Duración</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Motivo</th>
                                    <th className="px-6 py-4 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">Acciones</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-100">
                                {suspensions.data.length > 0 ? (
                                    suspensions.data.map((suspension) => (
                                        <tr key={suspension.id} className="hover:bg-red-50/30 transition-colors group">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center text-red-700 font-bold mr-3 border border-red-200">
                                                        {suspension.employee?.first_name.charAt(0)}
                                                        {suspension.employee?.last_name.charAt(0)}
                                                    </div>
                                                    <div>
                                                        <div className="text-sm font-bold text-gray-900">
                                                            {suspension.employee?.first_name} {suspension.employee?.last_name}
                                                        </div>
                                                        <div className="text-xs text-gray-500 font-mono">
                                                            ID: {suspension.employee?.employee_id}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex flex-col text-sm">
                                                    <span className="flex items-center gap-1.5 text-gray-700 font-medium">
                                                        <Calendar className="w-3.5 h-3.5 text-gray-400" />
                                                        {formatDate(suspension.start_date)}
                                                    </span>
                                                    <span className="text-xs text-gray-400 ml-5">hasta</span>
                                                    <span className="flex items-center gap-1.5 text-gray-700 font-medium">
                                                        <Calendar className="w-3.5 h-3.5 text-gray-400" />
                                                        {formatDate(suspension.end_date)}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-orange-50 text-orange-700 text-xs font-bold border border-orange-100">
                                                    <Clock className="w-3 h-3" />
                                                    {getDuration(suspension.start_date, suspension.end_date)}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-start gap-2 max-w-xs">
                                                    <FileText className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                                                    <p className="text-sm text-gray-600 truncate" title={suspension.reason}>
                                                        {suspension.reason}
                                                    </p>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <Link
                                                        href={route('personnel.suspensions.edit', suspension.id)}
                                                        className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                                                        title="Editar"
                                                    >
                                                        <Pencil className="w-4 h-4" />
                                                    </Link>
                                                    <button
                                                        onClick={() => handleDelete(suspension.id)}
                                                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                        title="Eliminar"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={5} className="px-6 py-16 text-center">
                                            <div className="flex flex-col items-center justify-center">
                                                <div className="bg-gray-50 p-4 rounded-full mb-4">
                                                    <UserX className="w-10 h-10 text-gray-300" />
                                                </div>
                                                <h3 className="text-gray-900 font-bold text-lg">Sin suspensiones registradas</h3>
                                                <p className="text-gray-500 text-sm mt-1 max-w-sm mx-auto">
                                                    Actualmente no hay miliciano suspendido. Usa el botón "Nueva Suspensión" para agregar un registro.
                                                </p>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    <div className="p-4 border-t border-gray-100 bg-gray-50/50">
                        <Pagination links={suspensions.links} />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default SuspensionIndex;