import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Clock, Download, Search, User } from 'lucide-react';
import Pagination from '@/components/Pagination';
import { PaginatedData } from '@/types/global';

interface AttendanceRecord {
    id: number;
    employeeName: string; // Cambiado a employeeName
    date: string;
    checkIn: string;
    checkOut: string;
    duration: string;
}

interface EmployeeOption {
    id: number;
    name: string;
}

interface AttendanceDetailProps {
    records: PaginatedData<AttendanceRecord>;
    employees: EmployeeOption[];
    filters: {
        employee_id?: string;
        start_date?: string;
        end_date?: string;
    };
}

const AttendanceDetail: React.FC<AttendanceDetailProps> = ({ records, employees, filters }) => {

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Reportes', href: route('reports.index') },
        { title: 'Detalle de Asistencia', href: route('reports.attendance-detail') },
    ];

    const [filterData, setFilterData] = useState({
        employee_id: filters.employee_id || '',
        start_date: filters.start_date || '',
        end_date: filters.end_date || '',
    });

    const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
        setFilterData({
            ...filterData,
            [e.target.name]: e.target.value,
        });
    };

    const applyFilters = () => {
        // Ejecutar la petición GET con los filtros
        router.get(route('reports.attendance-detail'), filterData, {
            preserveState: true,
            replace: true,
        });
    };

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

                    {/* Área de Filtros (con state) */}
                    <div className="bg-white p-6 rounded-lg shadow-md mb-8 grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                        <div className="col-span-1">
                            <label className="block text-sm font-medium text-gray-700">Empleado:</label>
                            <select
                                name="employee_id"
                                value={filterData.employee_id}
                                onChange={handleFilterChange}
                                className="mt-1 block w-full border-gray-300 rounded-md text-sm"
                            >
                                <option value="">Todos</option>
                                {employees.map(emp => (
                                    <option key={emp.id} value={emp.id}>{emp.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="col-span-1">
                            <label className="block text-sm font-medium text-gray-700">Fecha Desde:</label>
                            <input
                                type="date"
                                name="start_date"
                                value={filterData.start_date}
                                onChange={handleFilterChange}
                                className="mt-1 block w-full border-gray-300 rounded-md text-sm"
                            />
                        </div>
                        <div className="col-span-1">
                            <label className="block text-sm font-medium text-gray-700">Fecha Hasta:</label>
                            <input
                                type="date"
                                name="end_date"
                                value={filterData.end_date}
                                onChange={handleFilterChange}
                                className="mt-1 block w-full border-gray-300 rounded-md text-sm"
                            />
                        </div>
                        <div className="col-span-1 flex items-end h-full pt-6">
                            <button
                                onClick={applyFilters}
                                className="w-full flex justify-center items-center px-4 py-2 bg-indigo-600 text-white rounded-md text-sm hover:bg-indigo-700"
                            >
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
                                        {records.data.map((record) => (
                                            <tr key={record.id} className="hover:bg-gray-50">
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 flex items-center">
                                                    <User className="w-4 h-4 mr-2 text-indigo-500" />{record.employeeName}
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

                            {/* Paginación */}
                            {/* Asume que tienes un componente Pagination para manejar records.links */}
                            <div className="mt-4">
                                <Pagination links={records.links} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default AttendanceDetail;