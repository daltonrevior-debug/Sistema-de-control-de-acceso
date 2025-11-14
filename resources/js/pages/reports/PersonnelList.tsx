import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Download, Users, Briefcase } from 'lucide-react';

interface EmployeeDetail {
    id: number;
    fullName: string;
    department: string;
    position: string;
    hiringDate: string;
}

const mockEmployees: EmployeeDetail[] = [
    { id: 101, fullName: 'Ana García', department: 'Ventas', position: 'Gerente de Ventas', hiringDate: '2020-01-15' },
    { id: 102, fullName: 'Benito López', department: 'IT', position: 'Desarrollador Senior', hiringDate: '2018-05-20' },
    { id: 103, fullName: 'Carlos Ruiz', department: 'Recursos Humanos', position: 'Generalista de RRHH', hiringDate: '2022-09-01' },
    { id: 104, fullName: 'Diana Morales', department: 'Marketing', position: 'Especialista en Marketing', hiringDate: '2023-03-10' },
];

const PersonnelList: React.FC = () => {
    
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Reportes', href: route('reports.index') },
        { title: 'Listado de Personal', href: route('reports.personnel-list') },
    ];
    
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

                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <p className="text-sm text-gray-500 mb-4 flex items-center">
                                <Users className="w-4 h-4 mr-1" /> Total de Empleados: **{mockEmployees.length}**
                            </p>
                            
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre Completo</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Departamento</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cargo</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha de Contratación</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {mockEmployees.map((employee) => (
                                            <tr key={employee.id} className="hover:bg-gray-50">
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{employee.id}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{employee.fullName}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{employee.department}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-indigo-600 flex items-center">
                                                    <Briefcase className="w-4 h-4 mr-2" />{employee.position}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{employee.hiringDate}</td>
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

export default PersonnelList;