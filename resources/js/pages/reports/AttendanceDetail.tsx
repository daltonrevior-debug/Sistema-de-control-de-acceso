import React, { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Download, Search, User } from 'lucide-react';
import Pagination from '@/components/Pagination';
import { PaginatedData } from '@/types/global';

interface AttendanceRecord {
    id: number;
    employeeName: string;
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

                    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm mb-8">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-end">

                            <div className="space-y-1">
                                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">
                                    Empleado
                                </label>
                                <div className="relative">
                                    <select
                                        name="employee_id"
                                        value={filterData.employee_id}
                                        onChange={handleFilterChange}
                                        className="block w-full pl-3 pr-10 py-2.5 text-sm border-gray-300 focus:ring-4 focus:ring-indigo-50 focus:border-indigo-500 rounded-lg transition duration-200 outline-none appearance-none bg-white"
                                    >
                                        <option value="">Todos los empleados</option>
                                        {employees.map(emp => (
                                            <option key={emp.id} value={emp.id}>{emp.name}</option>
                                        ))}
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
                                        <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-1">
                                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">
                                    Fecha Desde
                                </label>
                                <input
                                    type="date"
                                    name="start_date"
                                    value={filterData.start_date}
                                    onChange={handleFilterChange}
                                    className="block w-full px-3 py-2.5 text-sm border-gray-300 focus:ring-4 focus:ring-indigo-50 focus:border-indigo-500 rounded-lg transition duration-200 outline-none"
                                />
                            </div>

                            <div className="space-y-1">
                                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">
                                    Fecha Hasta
                                </label>
                                <input
                                    type="date"
                                    name="end_date"
                                    value={filterData.end_date}
                                    onChange={handleFilterChange}
                                    className="block w-full px-3 py-2.5 text-sm border-gray-300 focus:ring-4 focus:ring-indigo-50 focus:border-indigo-500 rounded-lg transition duration-200 outline-none"
                                />
                            </div>

                            <div>
                                <button
                                    onClick={applyFilters}
                                    className="w-full flex justify-center items-center gap-2 px-6 py-2.5 bg-indigo-600 text-white font-bold rounded-lg text-sm hover:bg-indigo-700 shadow-md hover:shadow-indigo-100 transform active:scale-95 transition duration-200"
                                >
                                    <Search className="w-4 h-4" />
                                    Buscar
                                </button>
                            </div>

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