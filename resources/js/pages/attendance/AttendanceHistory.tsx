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
                    <div className="bg-white sm:rounded-lg p-8">
                        <h3 className="text-xl font-bold mb-6 border-b pb-2">Registros de Marcaje</h3>

                        <form onSubmit={applyFilters} className="flex flex-wrap items-end gap-4 mb-8 p-4 border rounded-lg bg-gray-50">
                            <div>
                                <label htmlFor="start_date" className="block text-sm font-medium text-gray-700">Fecha Inicio</label>
                                <input
                                    id="start_date"
                                    name="start_date"
                                    type="date"
                                    value={localFilters.start_date}
                                    onChange={handleFilterChange}
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                                />
                            </div>
                            <div>
                                <label htmlFor="end_date" className="block text-sm font-medium text-gray-700">Fecha Fin</label>
                                <input
                                    id="end_date"
                                    name="end_date"
                                    type="date"
                                    value={localFilters.end_date}
                                    onChange={handleFilterChange}
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                                />
                            </div>
                            <button
                                type="submit"
                                className="px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition duration-150 h-10"
                            >
                                Aplicar Filtros
                            </button>
                        </form>

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