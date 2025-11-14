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

                    <div className="bg-white p-6 rounded-lg shadow-md mb-8 grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                        <div className="col-span-1">
                            <label className="block text-sm font-medium text-gray-700">Filtrar por Departamento:</label>
                            <select
                                name="department_id"
                                value={filterData.department_id}
                                onChange={handleFilterChange}
                                className="mt-1 block w-full border-gray-300 rounded-md text-sm"
                            >
                                <option value="">Todos los Departamentos</option>
                                {departments.map(dept => (
                                    <option key={dept.id} value={dept.id}>{dept.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="col-span-1 flex items-end h-full pt-6">
                            <button
                                onClick={applyFilters}
                                className="w-full flex justify-center items-center px-4 py-2 bg-indigo-600 text-white rounded-md text-sm hover:bg-indigo-700"
                            >
                                <Search className="w-4 h-4 mr-1" /> Filtrar
                            </button>
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