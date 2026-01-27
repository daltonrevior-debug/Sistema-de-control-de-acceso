import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/layouts/app-layout';
import { Trash2, Edit, XCircle, CheckCircle } from 'lucide-react';
import { PaginatedData, PageProps, AbsenceType } from '@/types/global';
import { type BreadcrumbItem } from '@/types';
import { AiFillPlusCircle } from "react-icons/ai"

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

            <div className="py-12">
                <div className="w-full mx-auto sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-extrabold text-gray-900 mb-8">Listas de Ausencias</h2>

                    <div className="bg-white overflow-hidden sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">

                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-xl font-bold text-gray-800">Tipos de Ausencia</h3>
                                <Link
                                    href={route('config.absence-types.create')}
                                    className="justify-center gap-2 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition"
                                >
                                    <AiFillPlusCircle size={"1.3rem"} color='white' /> Crear Tipo
                                </Link>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pagada</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Descripción</th>
                                            <th className="relative px-6 py-3"><span className="sr-only">Acciones</span></th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {types.data.length === 0 ? (
                                            <tr>
                                                <td colSpan={4} className="px-6 py-4 text-center text-gray-500">
                                                    No se encontraron tipos de ausencia.
                                                </td>
                                            </tr>
                                        ) : (
                                            types.data.map((type) => (
                                                <tr key={type.id} className="hover:bg-gray-50 transition">
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{type.name}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${type.is_paid ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                                            {type.is_paid ? <CheckCircle className="w-4 h-4 inline mr-1" /> : <XCircle className="w-4 h-4 inline mr-1" />}
                                                            {type.is_paid ? 'Sí' : 'No'}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate" title={type.description || ''}>{type.description || 'N/A'}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                        <Link
                                                            href={route('config.absence-types.edit', type.id)}
                                                            className="text-indigo-600 hover:text-indigo-900 mr-4 transition"
                                                            title="Editar"
                                                        >
                                                            <Edit className="w-5 h-5 inline" />
                                                        </Link>
                                                        <button
                                                            onClick={() => handleDelete(type)}
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

export default AbsenceTypeIndex;