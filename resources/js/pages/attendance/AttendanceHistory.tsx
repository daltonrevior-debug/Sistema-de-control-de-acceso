import React, { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Calendar, Filter, Clock, ArrowRight, UserCheck, Timer, Search } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Asistencias', href: route('attendance.history') },
    { title: 'Historial', href: '#' }
];

interface HistoryEntry {
    id: number;
    date: string;
    check_in: string;
    check_out: string;
    status: 'normal' | 'tardy' | 'corrected';
    total_time: string;
}

interface AttendanceHistoryProps {
    historyData: HistoryEntry[];
    filters: {
        start_date: string;
        end_date: string;
    };
}

const AttendanceHistory: React.FC<AttendanceHistoryProps> = ({ historyData, filters }) => {
    const [localFilters, setLocalFilters] = useState(filters);

    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLocalFilters({
            ...localFilters,
            [e.target.name]: e.target.value,
        });
    };

    const applyFilters = (e: React.FormEvent) => {
        e.preventDefault();
        router.get(route('attendance.history'), localFilters, {
            preserveState: true,
            replace: true,
        });
    };

    return (
        <AuthenticatedLayout breadcrumbs={breadcrumbs}>
            <Head title="Historial de Asistencia" />

            <div className="max-w-7xl py-8 px-4 sm:px-6 lg:px-8 space-y-6">

                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                            <UserCheck className="w-8 h-8 text-indigo-600" />
                            Historial de Asistencia
                        </h1>
                        <p className="text-sm text-gray-500 mt-1">Consulta los registros de entrada, salida y puntualidad.</p>
                    </div>

                    <form onSubmit={applyFilters} className="bg-white p-2 rounded-2xl shadow-sm border border-gray-100 flex flex-wrap items-center gap-2">
                        <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-xl border border-gray-100">
                            <Calendar className="w-4 h-4 text-gray-400" />
                            <input
                                type="date"
                                name="start_date"
                                value={localFilters.start_date}
                                onChange={handleFilterChange}
                                className="bg-transparent border-none text-xs font-bold text-gray-700 focus:ring-0 p-0"
                            />
                            <ArrowRight className="w-3 h-3 text-gray-300" />
                            <input
                                type="date"
                                name="end_date"
                                value={localFilters.end_date}
                                onChange={handleFilterChange}
                                className="bg-transparent border-none text-xs font-bold text-gray-700 focus:ring-0 p-0"
                            />
                        </div>
                        <button
                            type="submit"
                            className="bg-indigo-600 hover:bg-indigo-700 text-white p-2 rounded-xl transition-all active:scale-95 shadow-md shadow-indigo-100"
                        >
                            <Search className="w-4 h-4" />
                        </button>
                    </form>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    {historyData.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-gray-50/50 border-b border-gray-100">
                                        <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Fecha</th>
                                        <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-center">Entrada</th>
                                        <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-center">Salida</th>
                                        <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-center">Horas Totales</th>
                                        <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-center">Estatus</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {historyData.map((entry) => (
                                        <tr key={entry.id} className="hover:bg-indigo-50/20 transition-colors group">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex flex-col">
                                                    <span className="text-sm font-bold text-gray-900">
                                                        {new Date(entry.date).toLocaleDateString('es-ES', { weekday: 'long' })}
                                                    </span>
                                                    <span className="text-xs text-gray-500">{entry.date}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-50 text-emerald-700 font-mono text-xs font-bold border border-emerald-100">
                                                    <Clock className="w-3 h-3" />
                                                    {entry.check_in}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-gray-50 text-gray-600 font-mono text-xs font-bold border border-gray-200">
                                                    <Clock className="w-3 h-3 opacity-50" />
                                                    {entry.check_out || '--:--'}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <div className="flex flex-col items-center">
                                                    <span className="text-sm font-bold text-gray-800">{entry.total_time || '0h 0m'}</span>
                                                    <Timer className="w-3 h-3 text-gray-300" />
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <span className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${entry.status === 'tardy'
                                                        ? 'bg-rose-50 text-rose-700 border-rose-100'
                                                        : 'bg-emerald-50 text-emerald-700 border-emerald-100'
                                                    }`}>
                                                    <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${entry.status === 'tardy' ? 'bg-rose-500' : 'bg-emerald-500'}`} />
                                                    {entry.status === 'tardy' ? 'Tarde' : 'Normal'}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
                            <div className="p-4 bg-gray-50 rounded-full mb-4">
                                <Filter className="w-10 h-10 text-gray-300" />
                            </div>
                            <h3 className="text-lg font-bold text-gray-900">Sin registros</h3>
                            <p className="text-sm text-gray-500 max-w-xs mt-1">
                                No se encontraron registros de asistencia en el rango de fechas seleccionado.
                            </p>
                        </div>
                    )}
                </div>

            </div>
        </AuthenticatedLayout>
    );
};

export default AttendanceHistory;