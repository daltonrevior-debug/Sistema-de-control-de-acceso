import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Download, Users, Briefcase, Search } from 'lucide-react';
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
        setFilterData({
            ...filterData,
            department_id: e.target.value,
        });
    };

    const applyFilters = () => {
        router.get(route('reports.personnel-list'), filterData, {
            preserveState: true,
            replace: true,
        });
    };

    return (
        <AuthenticatedLayout breadcrumbs={breadcrumbs}>
            <Head title="Listado de Personal" />

            <div className="py-12">
                <div className="w-full mx-auto sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-3xl font-extrabold text-gray-900">Listado Detallado de Personal</h2>
                        <button className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition">
                            <Download className="w-5 h-5 mr-2" /> Exportar
                        </button>
                    </div>

                    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm mb-8">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-end">

                            <div className="md:col-span-2 space-y-1">
                                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">
                                    Filtrar por Departamento
                                </label>
                                <div className="relative">
                                    <select
                                        name="department_id"
                                        value={filterData.department_id}
                                        onChange={handleFilterChange}
                                        className="block w-full pl-4 pr-10 py-2.5 text-sm border-gray-300 focus:ring-4 focus:ring-indigo-50 focus:border-indigo-500 rounded-lg transition duration-200 outline-none appearance-none bg-white"
                                    >
                                        <option value="">Todos los Departamentos</option>
                                        {departments.map(dept => (
                                            <option key={dept.id} value={dept.id}>{dept.name}</option>
                                        ))}
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-400">
                                        <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            <div className="md:col-span-2 flex items-center gap-3">
                                <button
                                    onClick={applyFilters}
                                    className="flex-grow flex justify-center items-center gap-2 px-6 py-2.5 bg-indigo-600 text-white font-bold rounded-lg text-sm hover:bg-indigo-700 shadow-md hover:shadow-indigo-100 transform active:scale-95 transition duration-200"
                                >
                                    <Search className="w-4 h-4" />
                                    Filtrar
                                </button>

                                <button
                                    onClick={() => {/* Función para resetear data */ }}
                                    title="Limpiar filtros"
                                    className="p-2.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition duration-200"
                                >
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                </button>
                            </div>

                        </div>
                    </div>

                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <p className="text-sm text-gray-500 mb-4 flex items-center">
                                <Users className="w-4 h-4 mr-1" /> Total de Empleados: **{employees.total}**
                            </p>

                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre Completo</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Departamento</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cargo</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha de Contratación</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {employees.data.map((employee) => (
                                            <tr key={employee.id} className="hover:bg-gray-50">
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{employee.id}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{employee.fullName}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{employee.department}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-indigo-600 flex items-center">
                                                    <Briefcase className="w-4 h-4 mr-2" />{employee.position}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{employee.email}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{employee.hiringDate}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            <div className="mt-4">
                                {employees.links && <Pagination links={employees.links} />}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default PersonnelList;