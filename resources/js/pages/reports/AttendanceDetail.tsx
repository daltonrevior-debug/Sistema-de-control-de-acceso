import React, { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import {
    Download,
    Search,
    User,
    Calendar,
    Clock,
    Filter,
    FileText,
    UserCheck,
    ArrowRightLeft,
    Timer,
    ChevronRight
} from 'lucide-react';
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

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get(route('reports.attendance-detail'), filterData, {
            preserveState: true,
            replace: true,
        });
    };

    // const handleExport = () => {
    //     window.location.href = route('reports.attendance-export', filterData);
    // };

    return (
        <AuthenticatedLayout breadcrumbs={breadcrumbs}>
            <Head title="Detalle de Asistencia" />

            <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl space-y-6">

                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                            <FileText className="w-8 h-8 text-indigo-600" />
                            Registro Detallado
                        </h1>
                        <p className="text-gray-500 text-sm mt-1">
                            Consulta los tiempos de asistencia del personal.
                        </p>
                    </div>
                    {/* <button
                        onClick={handleExport}
                        className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-xl font-semibold shadow-lg shadow-emerald-100 transition-all active:scale-95"
                    >
                        <Download className="w-4 h-4" />
                        Exportar Excel
                    </button> */}
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="p-4 bg-gray-50/50 border-b border-gray-100 flex items-center gap-2 font-semibold text-gray-700">
                        <Filter className="w-4 h-4 text-indigo-500" />
                        Filtros de Búsqueda
                    </div>
                    <form onSubmit={handleSearch} className="p-6 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 items-end">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                                <UserCheck className="w-4 h-4" /> Miliciano
                            </label>
                            <select
                                className="w-full rounded-xl border-gray-200 focus:ring-indigo-500 focus:border-indigo-500 text-sm transition-all"
                                value={filterData.employee_id}
                                onChange={(e) => setFilterData({ ...filterData, employee_id: e.target.value })}
                            >
                                <option value="">Todos los Milicianos</option>
                                {employees.map((emp) => (
                                    <option key={emp.id} value={emp.id}>{emp.name}</option>
                                ))}
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                                <Calendar className="w-4 h-4" /> Fecha Inicio
                            </label>
                            <input
                                type="date"
                                className="w-full rounded-xl border-gray-200 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                                value={filterData.start_date}
                                onChange={(e) => setFilterData({ ...filterData, start_date: e.target.value })}
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                                <Calendar className="w-4 h-4" /> Fecha Fin
                            </label>
                            <input
                                type="date"
                                className="w-full rounded-xl border-gray-200 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                                value={filterData.end_date}
                                onChange={(e) => setFilterData({ ...filterData, end_date: e.target.value })}
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white p-2.5 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-indigo-100 transition-all active:scale-95"
                        >
                            <Search className="w-4 h-4" />
                            Filtrar
                        </button>
                    </form>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead>
                                <tr className="bg-gray-50/50">
                                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                                        <div className="flex items-center gap-2"><User className="w-3 h-3" /> Miliciano</div>
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                                        <div className="flex items-center gap-2"><Calendar className="w-3 h-3" /> Fecha</div>
                                    </th>
                                    <th className="px-6 py-4 text-center text-xs font-bold text-gray-500 uppercase tracking-wider">
                                        <div className="flex items-center justify-center gap-2"><Clock className="w-3 h-3" /> Entrada</div>
                                    </th>
                                    <th className="px-6 py-4 text-center text-xs font-bold text-gray-500 uppercase tracking-wider">
                                        <div className="flex items-center justify-center gap-2"><ArrowRightLeft className="w-3 h-3" /> Salida</div>
                                    </th>
                                    <th className="px-6 py-4 text-center text-xs font-bold text-gray-500 uppercase tracking-wider">
                                        <div className="flex items-center justify-center gap-2"><Timer className="w-3 h-3" /> Duración</div>
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-100">
                                {records.data.length > 0 ? (
                                    records.data.map((record) => (
                                        <tr key={record.id} className="hover:bg-indigo-50/30 transition-colors group">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="h-9 w-9 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold mr-3 group-hover:scale-110 transition-transform">
                                                        {record.employeeName.charAt(0)}
                                                    </div>
                                                    <span className="text-sm font-semibold text-gray-900">{record.employeeName}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                                {record.date}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-center">
                                                <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-100">
                                                    {record.checkIn}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-center">
                                                <span className="px-3 py-1 rounded-full bg-orange-50 text-orange-700 text-xs font-bold border border-orange-100">
                                                    {record.checkOut}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-center">
                                                <div className="flex items-center justify-center gap-1.5 text-sm font-bold text-indigo-900">
                                                    <Timer className="w-3.5 h-3.5 text-indigo-400" />
                                                    {record.duration}
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={5} className="px-6 py-12 text-center">
                                            <div className="flex flex-col items-center gap-2">
                                                <div className="p-4 bg-gray-50 rounded-full">
                                                    <Search className="w-8 h-8 text-gray-300" />
                                                </div>
                                                <p className="text-gray-400 font-medium">No se encontraron registros de asistencia.</p>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    <div className="p-6 bg-gray-50/50 border-t border-gray-100">
                        <Pagination links={records.links} />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default AttendanceDetail;