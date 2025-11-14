import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Clock, Download, Search, User } from 'lucide-react';

interface AttendanceRecord {
    id: number;
    employee: string;
    date: string;
    checkIn: string;
    checkOut: string;
    duration: string;
}

const mockRecords: AttendanceRecord[] = [
    { id: 1, employee: 'Ana García', date: '2023-11-10', checkIn: '08:58', checkOut: '17:02', duration: '8h 4m' },
    { id: 2, employee: 'Benito López', date: '2023-11-10', checkIn: '09:05', checkOut: '17:35', duration: '8h 30m' },
    { id: 3, employee: 'Ana García', date: '2023-11-09', checkIn: '09:00', checkOut: '17:00', duration: '8h 0m' },
    { id: 4, employee: 'Carlos Ruiz', date: '2023-11-09', checkIn: '08:45', checkOut: '16:45', duration: '8h 0m' },
];

const AttendanceDetail: React.FC = () => {
    
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Reportes', href: route('reports.index') },
        { title: 'Detalle de Asistencia', href: route('reports.attendance-detail') },
    ];
    
    return (
        <AuthenticatedLayout breadcrumbs={breadcrumbs}>
            <Head title="Detalle de Asistencia" />

            <div className="py-12">
                <div className="w-full mx-auto sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-3xl font-extrabold text-gray-900">Detalle de Asistencia</h2>
                        <button className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition">
                            <Download className="w-5 h-5 mr-2" /> Exportar
                        </button>
                    </div>

                    {/* Área de Filtros */}
                    <div className="bg-white p-6 rounded-lg shadow-md mb-8 grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                        <div className="col-span-1">
                            <label className="block text-sm font-medium text-gray-700">Empleado:</label>
                            <select className="mt-1 block w-full border-gray-300 rounded-md text-sm">
                                <option>Todos</option>
                                <option>Ana García</option>
                            </select>
                        </div>
                        <div className="col-span-1">
                            <label className="block text-sm font-medium text-gray-700">Fecha Desde:</label>
                            <input type="date" className="mt-1 block w-full border-gray-300 rounded-md text-sm" />
                        </div>
                        <div className="col-span-1">
                            <label className="block text-sm font-medium text-gray-700">Fecha Hasta:</label>
                            <input type="date" className="mt-1 block w-full border-gray-300 rounded-md text-sm" />
                        </div>
                        <div className="col-span-1 flex items-end h-full pt-6">
                            <button className="w-full flex justify-center items-center px-4 py-2 bg-indigo-600 text-white rounded-md text-sm hover:bg-indigo-700">
                                <Search className="w-4 h-4 mr-1" /> Buscar
                            </button>
                        </div>
                    </div>

                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Empleado</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha</th>
                                            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Entrada</th>
                                            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Salida</th>
                                            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Duración</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {mockRecords.map((record) => (
                                            <tr key={record.id} className="hover:bg-gray-50">
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 flex items-center">
                                                    <User className="w-4 h-4 mr-2 text-indigo-500" />{record.employee}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{record.date}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-green-600 font-semibold">{record.checkIn}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-red-600 font-semibold">{record.checkOut}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-bold">{record.duration}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default AttendanceDetail;