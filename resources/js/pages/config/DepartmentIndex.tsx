import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/layouts/app-layout';
import { Trash2, Edit, Briefcase } from 'lucide-react';
import { PaginatedData, PageProps, Department } from '@/types/global';
import { type BreadcrumbItem } from '@/types';

interface DepartmentIndexProps extends PageProps {
    departments: PaginatedData<Department>; 
}

const DepartmentIndex: React.FC<DepartmentIndexProps> = ({ departments }) => {

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Configuración', href: '#' },
        { title: 'Departamentos', href: route('config.departments.index') }
    ];

    const handleDelete = (department: Department) => {
        if (confirm(`¿Estás seguro de que quieres eliminar el Departamento "${department.name}"? Esto podría dejar empleados sin departamento.`)) {
            router.delete(route('config.departments.destroy', department.id));
        }
    };

    return (
        <AuthenticatedLayout breadcrumbs={breadcrumbs}>
            <Head title="Departamentos" />

            <div className="py-12">
                <div className="w-full mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-xl font-bold text-gray-800 flex items-center"><Briefcase className="w-5 h-5 mr-2" /> Gestión de Departamentos</h3>
                                <Link 
                                    href={route('config.departments.create')} 
                                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 transition"
                                >
                                    Crear Departamento
                                </Link>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Descripción</th>
                                            <th className="relative px-6 py-3"><span className="sr-only">Acciones</span></th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {departments.data.length === 0 ? (
                                            <tr>
                                                <td colSpan={3} className="px-6 py-4 text-center text-gray-500">
                                                    No se encontraron departamentos.
                                                </td>
                                            </tr>
                                        ) : (
                                            departments.data.map((dept) => (
                                                <tr key={dept.id} className="hover:bg-gray-50 transition">
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{dept.name}</td>
                                                    <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate" title={dept.description || ''}>{dept.description || 'N/A'}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                        <Link
                                                            href={route('config.departments.edit', dept.id)}
                                                            className="text-indigo-600 hover:text-indigo-900 mr-4 transition"
                                                            title="Editar"
                                                        >
                                                            <Edit className="w-5 h-5 inline" />
                                                        </Link>
                                                        <button
                                                            onClick={() => handleDelete(dept)}
                                                            className="text-red-600 hover:text-red-900 transition"
                                                            title="Eliminar"
                                                        >
                                                            <Trash2 className="w-5 h-5 inline" />
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))
                                        )}
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

export default DepartmentIndex;