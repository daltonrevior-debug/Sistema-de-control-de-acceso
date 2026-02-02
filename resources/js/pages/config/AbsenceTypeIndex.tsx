import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/layouts/app-layout';
import { Trash2, Edit, CheckCircle2, XCircle, Settings2, Plus, Info } from 'lucide-react';
import { PaginatedData, PageProps, AbsenceType } from '@/types/global';
import { type BreadcrumbItem } from '@/types';
import Pagination from '@/components/Pagination';

interface AbsenceTypeIndexProps extends PageProps {
    types: PaginatedData<AbsenceType>;
}

const AbsenceTypeIndex: React.FC<AbsenceTypeIndexProps> = ({ types }) => {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Configuración', href: '#' },
        { title: 'Tipos de Ausencia', href: route('config.absence-types.index') }
    ];

    const handleDelete = (type: AbsenceType) => {
        if (confirm(`¿Estás seguro de que quieres eliminar el Tipo de Ausencia "${type.name}"?`)) {
            router.delete(route('config.absence-types.destroy', type.id));
        }
    };

    return (
        <AuthenticatedLayout breadcrumbs={breadcrumbs}>
            <Head title="Tipos de Ausencia" />

            <div className="max-w-7xl py-8 px-4 sm:px-6 lg:px-8 space-y-6">

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                            <Settings2 className="w-8 h-8 text-indigo-600" />
                            Tipos de Ausencia
                        </h1>
                        <p className="text-gray-500 text-sm mt-1">Configura las categorías de permisos y ausencias del sistema.</p>
                    </div>
                    <Link
                        href={route('config.absence-types.create')}
                        className="inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-bold shadow-lg shadow-indigo-100 transition-all active:scale-95"
                    >
                        <Plus className="w-5 h-5" />
                        Nuevo Tipo
                    </Link>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead>
                                <tr className="bg-gray-50/50">
                                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Nombre y Descripción</th>
                                    <th className="px-6 py-4 text-center text-xs font-bold text-gray-500 uppercase tracking-wider">Remunerado</th>
                                    <th className="px-6 py-4 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">Acciones</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-100">
                                {types.data.length > 0 ? (
                                    types.data.map((type) => (
                                        <tr key={type.id} className="hover:bg-indigo-50/30 transition-colors group">
                                            <td className="px-6 py-4">
                                                <div className="flex items-start gap-3">
                                                    <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600 mt-1">
                                                        <Info className="w-4 h-4" />
                                                    </div>
                                                    <div>
                                                        <div className="text-sm font-bold text-gray-900">{type.name}</div>
                                                        <div className="text-xs text-gray-500 max-w-md line-clamp-1">{type.description || 'Sin descripción'}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${type.is_paid
                                                        ? 'bg-emerald-50 text-emerald-700 border-emerald-100'
                                                        : 'bg-gray-50 text-gray-600 border-gray-100'
                                                    }`}>
                                                    {type.is_paid ? <CheckCircle2 className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
                                                    {type.is_paid ? 'Sí' : 'No'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right">
                                                <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <Link
                                                        href={route('config.absence-types.edit', type.id)}
                                                        className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                                                    >
                                                        <Edit className="w-4 h-4" />
                                                    </Link>
                                                    <button
                                                        onClick={() => handleDelete(type)}
                                                        className="p-2 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={3} className="px-6 py-12 text-center text-gray-500 text-sm">No hay tipos definidos.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                    <div className="p-4 border-t border-gray-100 bg-gray-50/50">
                        <Pagination links={types.links} />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default AbsenceTypeIndex;