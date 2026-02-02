import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/layouts/app-layout';
import { Trash2, Edit, Clock, Plus, CalendarDays } from 'lucide-react';
import { PaginatedData, PageProps } from '@/types/global';
import { type BreadcrumbItem } from '@/types';
import Pagination from '@/components/Pagination';

interface Schedule {
    id: number;
    name: string;
    start_time: string;
    end_time: string;
    tardy_tolerance_minutes: number;
}

interface ScheduleIndexProps extends PageProps {
    schedules: PaginatedData<Schedule>;
}

const ScheduleIndex: React.FC<ScheduleIndexProps> = ({ schedules }) => {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Configuración', href: '#' },
        { title: 'Horarios', href: route('config.schedules.index') }
    ];

    const handleDelete = (schedule: Schedule) => {
        if (confirm(`¿Estás seguro de que quieres eliminar el horario "${schedule.name}"?`)) {
            router.delete(route('config.schedules.destroy', schedule.id));
        }
    };

    return (
        <AuthenticatedLayout breadcrumbs={breadcrumbs}>
            <Head title="Horarios" />
            <div className="max-w-7xl py-8 px-4 sm:px-6 lg:px-8 space-y-6">

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                            <Clock className="w-8 h-8 text-violet-600" />
                            Gestión de Horarios
                        </h1>
                        <p className="text-sm text-gray-500 mt-1">Configura las jornadas laborales y tolerancias de entrada.</p>
                    </div>
                    <Link
                        href={route('config.schedules.create')}
                        className="inline-flex items-center justify-center gap-2 bg-violet-600 hover:bg-violet-700 text-white px-5 py-2.5 rounded-xl font-bold shadow-lg shadow-violet-100 transition-all active:scale-95"
                    >
                        <Plus className="w-5 h-5" />
                        Nuevo Horario
                    </Link>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50/50 border-b border-gray-100">
                                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Nombre del Horario</th>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-center">Jornada (Entrada - Salida)</th>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-center">Tolerancia</th>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Acciones</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {schedules.data.map((schedule) => (
                                    <tr key={schedule.id} className="hover:bg-violet-50/30 transition-colors group">
                                        <td className="px-6 py-4 text-sm font-bold text-gray-900">
                                            <div className="flex items-center gap-3">
                                                <div className="p-2 bg-violet-50 text-violet-600 rounded-lg">
                                                    <CalendarDays className="w-4 h-4" />
                                                </div>
                                                {schedule.name}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <div className="inline-flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full text-sm font-medium text-gray-700">
                                                <span className="text-violet-600 font-bold">{schedule.start_time.substring(0, 5)}</span>
                                                <span className="text-gray-400">→</span>
                                                <span className="text-violet-600 font-bold">{schedule.end_time.substring(0, 5)}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <div className="flex flex-col items-center">
                                                <span className="text-sm font-bold text-gray-800">{schedule.tardy_tolerance_minutes} min</span>
                                                <span className="text-[10px] text-gray-400 uppercase font-medium tracking-tighter">Retraso</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <Link
                                                    href={route('config.schedules.edit', schedule.id)}
                                                    className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors border border-transparent hover:border-indigo-100"
                                                >
                                                    <Edit className="w-4 h-4" />
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(schedule)}
                                                    className="p-2 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors border border-transparent hover:border-rose-100"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="px-6 py-4 border-t border-gray-100 bg-gray-50/30">
                        <Pagination links={schedules.links} />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default ScheduleIndex;