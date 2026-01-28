import React from 'react'
import AuthenticatedLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import {
    UserPlus,
    Mail,
    ShieldCheck,
    UserCog,
    Edit3,
    Key
} from 'lucide-react';
import { IndexProps } from '@/types/global';

function index({ users }: IndexProps) {

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Perfiles', href: route('users.index') },
        { title: 'Listas de Usuarios', href: route('users.index') },
    ];

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
                                                <Link
                                                    href={route('users.edit', user.id)}
                                                    className="inline-flex items-center gap-1 text-indigo-600 hover:text-indigo-900 bg-indigo-50 px-3 py-1 rounded-md transition-colors"
                                                >
                                                    <Edit3 className="w-4 h-4" />
                                                    Editar
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}

export default index