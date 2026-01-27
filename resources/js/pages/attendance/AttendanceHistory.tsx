import React, { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Asistencias',
        href: '/dashboard',
    },
    {
        title: 'Historial',
        href: '/dashboard',
    }
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

    // Estado local para los filtros (permite al usuario modificar las fechas antes de buscar)
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
            <Head title="Historial" />

            <div className="py-12">
                <div className="w-full mx-auto sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-extrabold text-gray-900 mb-8">Historial</h2>
                    <div className="bg-white sm:rounded-lg p-8">
                        <h3 className="text-xl font-bold mb-6 border-b pb-2">Registros de Marcaje</h3>

                        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm mb-8">
                            <form onSubmit={applyFilters} className="flex flex-wrap md:flex-nowrap items-end gap-6">

                                <div className="flex-grow md:flex-grow-0 space-y-1">
                                    <label htmlFor="start_date" className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">
                                        Fecha Inicio
                                    </label>
                                    <div className="relative">
                                        <input
                                            id="start_date"
                                            name="start_date"
                                            type="date"
                                            value={localFilters.start_date}
                                            onChange={handleFilterChange}
                                            className="block w-full px-4 py-2.5 text-sm border-gray-300 focus:ring-4 focus:ring-indigo-50 focus:border-indigo-500 rounded-lg transition duration-200 outline-none"
                                        />
                                    </div>
                                </div>

                                <div className="hidden md:block pb-3.5">
                                    <div className="h-px w-4 bg-gray-300"></div>
                                </div>

                                <div className="flex-grow md:flex-grow-0 space-y-1">
                                    <label htmlFor="end_date" className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">
                                        Fecha Fin
                                    </label>
                                    <div className="relative">
                                        <input
                                            id="end_date"
                                            name="end_date"
                                            type="date"
                                            value={localFilters.end_date}
                                            onChange={handleFilterChange}
                                            className="block w-full px-4 py-2.5 text-sm border-gray-300 focus:ring-4 focus:ring-indigo-50 focus:border-indigo-500 rounded-lg transition duration-200 outline-none"
                                        />
                                    </div>
                                </div>

                                <div className="w-full md:w-auto">
                                    <button
                                        type="submit"
                                        className="w-full md:w-auto flex justify-center items-center gap-2 px-8 py-2.5 bg-indigo-600 text-white font-bold rounded-lg text-sm hover:bg-indigo-700 shadow-md hover:shadow-indigo-100 transform active:scale-95 transition duration-200"
                                    >
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                                        </svg>
                                        Aplicar Filtros
                                    </button>
                                </div>
                            </form>
                        </div>

                        {historyData.length > 0 ? (
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Entrada</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Salida</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duración</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {historyData.map((entry) => (
                                            <tr key={entry.id}>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{entry.date}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{entry.check_in}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{entry.check_out}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-700">{entry.total_time}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span
                                                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${entry.status === 'tardy'
                                                            ? 'bg-red-100 text-red-800'
                                                            : 'bg-green-100 text-green-800'
                                                            }`}
                                                    >
                                                        {entry.status === 'tardy' ? 'Tarde' : 'Normal'}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <div className="p-4 text-center text-gray-500 border rounded-lg bg-gray-50">
                                No se encontraron registros de asistencia en el rango de fechas seleccionado.
                            </div>
                        )}

                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default AttendanceHistory;