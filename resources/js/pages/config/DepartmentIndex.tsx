import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/layouts/app-layout';
import { Trash2, Edit, Briefcase, Plus, Building2, MoreHorizontal } from 'lucide-react';
import { PaginatedData, PageProps, Department } from '@/types/global';
import { type BreadcrumbItem } from '@/types';
import Pagination from '@/components/Pagination';

interface DepartmentIndexProps extends PageProps {
    departments: PaginatedData<Department>;
}

const DepartmentIndex: React.FC<DepartmentIndexProps> = ({ departments }) => {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Configuración', href: '#' },
        { title: 'Departamentos', href: route('config.departments.index') }
    ];

    const handleDelete = (department: Department) => {
        if (confirm(`¿Estás seguro de que quieres eliminar la Dependencia "${department.name}"? Esto podría dejar empleados sin departamento.`)) {
            router.delete(route('config.departments.destroy', department.id));
        }
    };

    return (
        <AuthenticatedLayout breadcrumbs={breadcrumbs}>
            <Head title="Dependencias" />

            <div className="max-w-7xl py-8 px-4 sm:px-6 lg:px-8 space-y-6">

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                            <Building2 className="w-8 h-8 text-indigo-600" />
                            Gestión de Dependencias
                        </h1>
                        <p className="text-sm text-gray-500 mt-1">
                            Administra las áreas y dependencias de la organización.
                        </p>
                    </div>

                    <Link
                        href={route('config.departments.create')}
                        className="inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-bold shadow-lg shadow-indigo-100 transition-all active:scale-95"
                    >
                        <Plus className="w-5 h-5" />
                        Nueva Dependencia
                    </Link>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden transition-all hover:shadow-md">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50/50 border-b border-gray-100">
                                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider w-16">ID</th>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Nombre de la Dependencia</th>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Acciones</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {departments.data.length > 0 ? (
                                    departments.data.map((dept) => (
                                        <tr key={dept.id} className="hover:bg-indigo-50/30 transition-colors group">
                                            <td className="px-6 py-4">
                                                <span className="text-xs font-mono font-bold text-gray-400 bg-gray-100 px-2 py-1 rounded">
                                                    #{dept.id}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="p-2 bg-white border border-gray-100 rounded-lg shadow-sm text-indigo-600 group-hover:scale-110 transition-transform">
                                                        <Briefcase className="w-5 h-5" />
                                                    </div>
                                                    <div>
                                                        <span className="text-sm font-bold text-gray-900 block group-hover:text-indigo-700 transition-colors">
                                                            {dept.name}
                                                        </span>
                                                        <span className="text-[10px] text-gray-400 uppercase tracking-widest font-medium">
                                                            Unidad Organizativa
                                                        </span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0">
                                                    <Link
                                                        href={route('config.departments.edit', dept.id)}
                                                        className="p-2 text-indigo-600 hover:bg-indigo-100 rounded-lg transition-colors shadow-sm bg-white border border-gray-100"
                                                        title="Editar dependencia"
                                                    >
                                                        <Edit className="w-4 h-4" />
                                                    </Link>
                                                    <button
                                                        onClick={() => handleDelete(dept)}
                                                        className="p-2 text-rose-600 hover:bg-rose-100 rounded-lg transition-colors shadow-sm bg-white border border-gray-100"
                                                        title="Eliminar dependencia"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={3} className="px-6 py-12 text-center">
                                            <div className="flex flex-col items-center gap-2 text-gray-400">
                                                <Building2 className="w-12 h-12 opacity-20" />
                                                <p className="text-sm font-medium">No se encontraron dependencias registradas.</p>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {departments.data.length > 0 && (
                        <div className="px-6 py-4 border-t border-gray-100 bg-gray-50/30">
                            <Pagination links={departments.links} />
                        </div>
                    )}
                </div>

                <div className="flex items-center gap-2 p-4 bg-amber-50 rounded-xl border border-amber-100 text-amber-700 text-xs">
                    <MoreHorizontal className="w-4 h-4" />
                    <p>
                        <strong>Sugerencia:</strong> Al eliminar una dependencia, asegúrese de reasignar a los empleados vinculados para evitar inconsistencias en los reportes.
                    </p>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default DepartmentIndex;