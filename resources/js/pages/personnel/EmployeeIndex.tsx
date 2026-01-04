import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/layouts/app-layout';
import { EmployeeIndexProps, Employee, PaginationData } from '@/types/global';
import { type BreadcrumbItem } from '@/types';
import { AiFillPlusCircle } from "react-icons/ai"

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Personal',
        href: '/dashboard',
    },
    {
        title: 'Lista de Empleados',
        href: '/dashboard',
    }
];

const EmployeeIndex: React.FC<EmployeeIndexProps> = ({ employees, filters }) => {

    const getStatusBadgeClass = (status: Employee['status']): string => {
        switch (status) {
            case 'active':
                return 'bg-green-100 text-green-800';
            case 'inactive':
                return 'bg-yellow-100 text-yellow-800';
            case 'terminated':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <AuthenticatedLayout breadcrumbs={breadcrumbs} >
            <Head title="Gestión de Empleados" />

            <div className="py-12">
                <div className="w-full sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-medium text-gray-900">
                            Listado de Empleados ({employees.total})
                        </h3>
                        <Link
                            href={route('personnel.employees.create')}
                            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow-md transition duration-150 flex items-center justify-center gap-2"
                        >
                            <AiFillPlusCircle size={"1.3rem"} color='white' /> Añadir Empleado
                        </Link>
                    </div>

                    <div className="bg-white w-full overflow-hidden sm:rounded-lg">
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead>
                                    <tr className="text-xs font-semibold uppercase tracking-wider text-gray-600 bg-gray-50">
                                        <th className="p-4 text-left">ID Empleado</th>
                                        <th className="p-4 text-left">Nombre</th>
                                        <th className="p-4 text-left">Email</th>
                                        <th className="p-4 text-left">Departamento</th>
                                        <th className="p-4 text-left">Horario</th>
                                        <th className="p-4 text-center">Estado</th>
                                        <th className="p-4 text-center">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {employees.data.map((employee) => (
                                        <tr key={employee.id} className="hover:bg-gray-50">
                                            <td className="p-4 whitespace-nowrap">{employee.employee_id}</td>
                                            <td className="p-4 whitespace-nowrap font-medium text-gray-900">{employee.first_name}</td>
                                            <td className="p-4 whitespace-nowrap text-gray-600">{employee.personal_email}</td>
                                            <td className="p-4 whitespace-nowrap">{employee.department.name}</td>
                                            <td className="p-4 whitespace-nowrap">{employee?.schedule?.name}</td>
                                            <td className="p-4 whitespace-nowrap text-center">
                                                <span
                                                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full capitalize ${getStatusBadgeClass(employee.status)}`}
                                                >
                                                    {employee.status}
                                                </span>
                                            </td>
                                            <td className="p-4 whitespace-nowrap text-center text-sm font-medium">
                                                <Link
                                                    href={route('personnel.employees.edit', employee.id)}
                                                    className="text-indigo-600 hover:text-indigo-900 mr-3"
                                                >
                                                    Ver/Editar
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="p-4 border-t flex justify-between items-center">
                            <span className="text-gray-500 text-sm">
                                Mostrando {employees.from} a {employees.to} de {employees.total} resultados
                            </span>
                            {/* Para Paginacion */}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default EmployeeIndex;