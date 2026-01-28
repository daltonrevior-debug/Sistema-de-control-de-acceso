import React, { useState } from 'react'
import AuthenticatedLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import {
    UserPlus,
    Mail,
    ShieldCheck,
    UserCog,
    Edit3,
    Key,
    Trash2,
    AlertTriangle
} from 'lucide-react';
import { IndexProps } from '@/types/global';

function index({ users }: IndexProps) {
    const [userToDelete, setUserToDelete] = useState<number | null>(null);
    const { delete: destroy, processing } = useForm();

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Perfiles', href: route('users.index') },
        { title: 'Listas de Usuarios', href: route('users.index') },
    ];

    const handleDelete = (id: number) => {
        destroy(route('users.destroy', id), {
            onSuccess: () => setUserToDelete(null),
        });
    };

    return (
        <AuthenticatedLayout breadcrumbs={breadcrumbs}>
            <div className="py-12 min-h-screen">
                <Head title="Gestión de Usuarios" />

                <div className="max-w-7xl sm:px-6 lg:px-8">
                    <div className="sm:flex sm:items-center bg-white p-6 rounded-t-lg border-b border-gray-200">
                        <div className="sm:flex-auto">
                            <h1 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                                <UserCog className="w-6 h-6 text-indigo-600" />
                                Directorio de Usuarios
                            </h1>
                            <p className="mt-2 text-sm text-gray-600">
                                Administra los accesos, roles y permisos de los miembros de tu equipo.
                            </p>
                        </div>
                        <div className="mt-4 sm:ml-16 sm:mt-0">
                            <Link
                                href={route('users.create')}
                                className="inline-flex items-center gap-2 rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 transition-all"
                            >
                                <UserPlus className="w-4 h-4" />
                                Nuevo Usuario
                            </Link>
                        </div>
                    </div>

                    <div className="bg-white shadow-sm overflow-hidden sm:rounded-b-lg">
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Usuario</th>
                                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Rol</th>
                                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Permisos</th>
                                        <th className="px-6 py-4 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {users.map((user) => (
                                        <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="h-10 w-10 flex-shrink-0 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-sm">
                                                        {user.name.charAt(0).toUpperCase()}
                                                    </div>
                                                    <div className="ml-4">
                                                        <div className="text-sm font-medium text-gray-900">{user.name}</div>
                                                        <div className="text-sm text-gray-500 flex items-center gap-1">
                                                            <Mail className="w-3 h-3" />
                                                            {user.email}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
                                                    <ShieldCheck className="w-3 h-3" />
                                                    {user.role}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex flex-wrap gap-1">
                                                    {user.permission && user.permission.length > 0 ? (
                                                        user.permission.map((perm, idx) => (
                                                            <span key={idx} className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-gray-100 text-[10px] font-bold text-gray-600 uppercase">
                                                                <Key className="w-2.5 h-2.5" />
                                                                {perm}
                                                            </span>
                                                        ))
                                                    ) : (
                                                        <span className="text-gray-400 text-xs italic text-center">Sin permisos</span>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <div className="flex justify-end gap-2">
                                                    <Link
                                                        href={route('users.edit', user.id)}
                                                        className="inline-flex items-center gap-1 text-indigo-600 hover:text-indigo-900 bg-indigo-50 px-3 py-1 rounded-md transition-colors"
                                                    >
                                                        <Edit3 className="w-4 h-4" />
                                                        Editar
                                                    </Link>
                                                    <button
                                                        onClick={() => setUserToDelete(user.id)}
                                                        className="cursor-pointer inline-flex items-center gap-1 text-red-600 hover:text-red-900 bg-red-50 px-3 py-1 rounded-md transition-colors"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                        Eliminar
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            {userToDelete && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 animate-in zoom-in-95 duration-200">
                        <div className="flex items-center gap-4 text-red-600 mb-4">
                            <div className="p-3 bg-red-100 rounded-full">
                                <AlertTriangle className="w-6 h-6" />
                            </div>
                            <h3 className="text-lg font-bold">¿Eliminar usuario?</h3>
                        </div>
                        <p className="text-gray-600 mb-6">
                            Esta acción es permanente y no se puede deshacer. El usuario perderá el acceso al sistema inmediatamente.
                        </p>
                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => setUserToDelete(null)}
                                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                                disabled={processing}
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={() => handleDelete(userToDelete)}
                                className="cursor-pointer px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
                                disabled={processing}
                            >
                                {processing ? 'Eliminando...' : 'Confirmar Eliminación'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    )
}

export default index