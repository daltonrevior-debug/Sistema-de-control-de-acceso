import React, { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import {
    Download,
    Users,
    Briefcase,
    Search,
    Filter,
    Mail,
    Calendar,
    Building2,
    UserCircle2,
    ArrowRightCircle,
    BadgeInfo
} from 'lucide-react';
import Pagination from '@/components/Pagination';
import { PaginatedData } from '@/types/global';

interface EmployeeDetail {
    id: number;
    fullName: string;
    department: string;
    position: string;
    hiringDate: string;
    email: string;
}

interface DepartmentOption {
    id: number;
    name: string;
}

interface PersonnelListProps {
    employees: PaginatedData<EmployeeDetail>;
    departments: DepartmentOption[];
    filters: {
        department_id?: string;
    };
}

const PersonnelList: React.FC<PersonnelListProps> = ({ employees, departments, filters }) => {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Reportes', href: route('reports.index') },
        { title: 'Listado de Personal', href: route('reports.personnel-list') },
    ];

    const [filterData, setFilterData] = useState({
        department_id: filters.department_id || '',
    });

    const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newData = { ...filterData, department_id: e.target.value };
        setFilterData(newData);
        router.get(route('reports.personnel-list'), newData, {
            preserveState: true,
            replace: true,
        });
    };

    // const handleExport = () => {
    //     window.location.href = route('reports.personnel-export', filterData);
    // };

    return (
        <AuthenticatedLayout breadcrumbs={breadcrumbs}>
            <Head title="Listado de Personal" />

            <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl space-y-6">

                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                            <Users className="w-8 h-8 text-indigo-600" />
                            Directorio de Personal
                        </h1>
                        <p className="text-gray-500 text-sm mt-1">
                            Visualiza la información detallada de todos los milicianos.
                        </p>
                    </div>
                    {/* <button
                        onClick={handleExport}
                        className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-xl font-semibold shadow-lg shadow-emerald-100 transition-all active:scale-95"
                    >
                        <Download className="w-4 h-4" />
                        Descargar Reporte
                    </button> */}
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="p-6 flex flex-col md:flex-row items-end gap-4">
                        <div className="w-full md:w-1/3 space-y-2">
                            <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                                <Filter className="w-4 h-4 text-indigo-500" />
                                Filtrar por Dependencia
                            </label>
                            <div className="relative">
                                <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <select
                                    className="w-full pl-10 rounded-xl border-gray-200 focus:ring-indigo-500 focus:border-indigo-500 text-sm transition-all"
                                    value={filterData.department_id}
                                    onChange={handleFilterChange}
                                >
                                    <option value="">Todos las dependencias</option>
                                    {departments.map((dept) => (
                                        <option key={dept.id} value={dept.id}>{dept.name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="hidden md:block flex-1 italic text-gray-400 text-sm pb-3">
                            Mostrando {employees.data.length} registros en esta página
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead>
                                <tr className="bg-gray-50/50">
                                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Miliciano</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Dependencia</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Cargo / Posición</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Contacto e Incorporacion</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-100">
                                {employees.data.length > 0 ? (
                                    employees.data.map((employee) => (
                                        <tr key={employee.id} className="hover:bg-indigo-50/30 transition-colors group">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold shadow-md shadow-indigo-100 group-hover:rotate-3 transition-transform">
                                                        {employee.fullName.charAt(0)}
                                                    </div>
                                                    <div className="ml-4">
                                                        <div className="text-sm font-bold text-gray-900">{employee.fullName}</div>
                                                        <div className="text-[11px] text-gray-400 font-mono uppercase tracking-wider">ID: {employee.id}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center text-sm text-gray-600">
                                                    <Building2 className="w-4 h-4 mr-2 text-gray-400" />
                                                    {employee.department}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-indigo-50 text-indigo-700 text-xs font-bold border border-indigo-100 uppercase">
                                                    <Briefcase className="w-3 h-3" />
                                                    {employee.position}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="space-y-1">
                                                    <div className="flex items-center text-xs text-gray-500 italic">
                                                        <Mail className="w-3 h-3 mr-2" />
                                                        {employee.email}
                                                    </div>
                                                    <div className="flex items-center text-xs text-gray-600 font-medium">
                                                        <Calendar className="w-3 h-3 mr-2 text-indigo-400" />
                                                        Desde: {employee.hiringDate}
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={4} className="px-6 py-16 text-center">
                                            <div className="flex flex-col items-center justify-center">
                                                <div className="bg-gray-50 p-4 rounded-full mb-4">
                                                    <UserCircle2 className="w-12 h-12 text-gray-300" />
                                                </div>
                                                <h3 className="text-gray-900 font-bold">No se encontró personal</h3>
                                                <p className="text-gray-500 text-sm">Prueba ajustando los filtros de búsqueda.</p>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    <div className="p-6 bg-gray-50/50 border-t border-gray-100">
                        {employees.links && <Pagination links={employees.links} />}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};
export default PersonnelList;