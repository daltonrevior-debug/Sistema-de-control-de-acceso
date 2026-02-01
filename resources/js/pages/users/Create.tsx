import React from 'react'
import AuthenticatedLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm, Link } from '@inertiajs/react';
import { UserForm } from '@/types/global';
import {
    Save,
    ArrowLeft,
    User as UserIcon,
    Mail,
    Shield,
    Lock,
    AlertCircle
} from 'lucide-react';


function Create() {

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Perfiles', href: route('users.index') },
        { title: 'Crear Usuario', href: route('users.create') },
    ];

    const { data, setData, post, processing, errors, setError, clearErrors } = useForm<UserForm>({
        name: '',
        email: '',
        role: 'admin',
        permission: [],
        password: '',
        password_confirmation: '',
    })

    const availablePermissions = ['personal', 'asistencias', 'gestion', 'reportes'];

    const handlePermissionChange = (perm: string) => {
        const current = [...data.permission];
        const index = current.indexOf(perm);
        if (index > -1) {
            current.splice(index, 1);
        } else {
            current.push(perm);
        }
        setData('permission', current);
    };

    const submit = (e: React.FormEvent) => {
        e.preventDefault();

        clearErrors();

        let hasErrors = false;

        if (!data.name.trim()) {
            setError('name', 'El nombre es obligatorio.');
            hasErrors = true;
        }

        if (!data.email.trim()) {
            setError('email', 'El correo electrónico es obligatorio.');
            hasErrors = true;
        }

        if (!data.password && route().current('users.create')) {
            setError('password', 'La contraseña es obligatoria.');
            hasErrors = true;
        }

        if (data.password !== data.password_confirmation) {
            setError('password_confirmation', 'Las contraseñas no coinciden.');
            hasErrors = true;
        }

        if (data.password && data.password.length < 8) {
            setError('password', 'La contraseña debe tener al menos 8 caracteres.');
            hasErrors = true;
        }

        if (hasErrors) return;

        post(route('users.store'));
    };

    return (
        <AuthenticatedLayout breadcrumbs={breadcrumbs}>
            <div className="py-10 min-h-screen">
                <Head title={`Crear Usuario`} />

                <div className="max-w-4xl px-4 sm:px-6 lg:px-8">

                    <div className="mb-8 flex items-center justify-between">
                        <div>
                            <Link
                                href={route('users.index')}
                                className="group flex items-center text-sm font-medium text-gray-500 hover:text-indigo-600 transition-colors"
                            >
                                <ArrowLeft className="mr-2 w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                                Volver al listado
                            </Link>
                            <h1 className="mt-2 text-3xl font-bold text-gray-900 tracking-tight">
                                Crear una nueva Cuenta
                            </h1>
                        </div>
                    </div>

                    <form onSubmit={submit} className="space-y-6">
                        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">

                            <div className="lg:col-span-2 space-y-6">
                                <section className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                                    <div className="p-6 border-b border-gray-100 flex items-center gap-3 bg-gray-50/50">
                                        <div className="p-2 bg-indigo-100 rounded-lg text-indigo-600">
                                            <UserIcon className="w-5 h-5" />
                                        </div>
                                        <h3 className="font-semibold text-gray-900">Información Personal</h3>
                                    </div>
                                    <div className="p-6 space-y-5">
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-1">Nombre y apellido</label>
                                            <input
                                                type="text"
                                                value={data.name}
                                                onChange={e => setData('name', e.target.value)}
                                                className={`w-full px-4 py-3 border border-gray-200 block rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all ${errors.name ? 'border-red-500' : ''}`}
                                                placeholder="Ej. Juan Pérez"
                                            />
                                            {errors.name && <p className="mt-1 text-sm text-red-600 flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.name}</p>}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-1">Correo Electrónico</label>
                                            <div className="relative group">
                                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 group-focus-within:text-indigo-500 transition-colors">
                                                    <Mail className="w-4 h-4" />
                                                </div>
                                                <input
                                                    type="email"
                                                    value={data.email}
                                                    onChange={e => setData('email', e.target.value)}
                                                    className="w-full px-4 py-3 rounded-lg border border-gray-200 block pl-10 shadow-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                                                    placeholder="correo@ejemplo.com"
                                                />
                                            </div>
                                            {errors.email && <p className="mt-1 text-sm text-red-600 flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.email}</p>}
                                        </div>
                                    </div>
                                </section>

                                <section className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                                    <div className="p-6 border-b border-gray-100 flex items-center gap-3 bg-gray-50/50">
                                        <div className="p-2 bg-amber-100 rounded-lg text-amber-600">
                                            <Lock className="w-5 h-5" />
                                        </div>
                                        <h3 className="font-semibold text-gray-900">Seguridad</h3>
                                    </div>
                                    <div className="p-6">
                                        <p className="text-xs text-gray-500 mb-4 bg-amber-50 p-2 rounded border border-amber-100 flex items-center gap-2">
                                            <AlertCircle className="w-4 h-4 text-amber-500" />
                                            Agrega una contraseña y confirmala.
                                        </p>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <input
                                                type="password"
                                                placeholder="Nueva contraseña"
                                                onChange={e => setData('password', e.target.value)}
                                                className="w-full px-4 py-3 rounded-lg border border-gray-200 block shadow-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                                            />
                                            <input
                                                type="password"
                                                placeholder="Confirmar contraseña"
                                                onChange={e => setData('password_confirmation', e.target.value)}
                                                className="w-full px-4 py-3 rounded-lg border border-gray-200 block shadow-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                                            />
                                        </div>
                                        {errors.password && <p className="mt-2 text-sm text-red-600">{errors.password}</p>}
                                        {errors.password_confirmation && <p className="mt-2 text-sm text-red-600">{errors.password_confirmation}</p>}
                                    </div>
                                </section>
                            </div>

                            <div className="lg:col-span-1 space-y-6">
                                <aside className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden sticky top-6">
                                    <div className="p-6 border-b border-gray-100 flex items-center gap-3 bg-gray-50/50">
                                        <div className="p-2 bg-purple-100 rounded-lg text-purple-600">
                                            <Shield className="w-5 h-5" />
                                        </div>
                                        <h3 className="font-semibold text-gray-900">Acceso</h3>
                                    </div>
                                    <div className="p-6 space-y-6">
                                        <div>
                                            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Rol Asignado</label>
                                            <select
                                                value={data.role}
                                                onChange={e => setData('role', e.target.value)}
                                                className="w-full px-4 py-3 rounded-lg border border-gray-200 block shadow-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-sm"
                                            >
                                                <option value="admin">Admin</option>
                                                <option value="super_admin">Super Admin</option>
                                            </select>
                                        </div>

                                        <div>
                                            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Modulos Activos</label>
                                            <div className="space-y-2">
                                                {availablePermissions.map(perm => (
                                                    <label
                                                        key={perm}
                                                        className={`flex items-center p-3 rounded-lg border cursor-pointer transition-all ${data.permission.includes(perm)
                                                            ? 'bg-indigo-50 border-indigo-200 text-indigo-700'
                                                            : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300'
                                                            }`}
                                                    >
                                                        <div className="flex items-center h-5">
                                                            <input
                                                                type="checkbox"
                                                                checked={data.permission.includes(perm)}
                                                                onChange={() => handlePermissionChange(perm)}
                                                                className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                                                            />
                                                        </div>
                                                        <span className="ml-3 text-sm font-medium capitalize">{perm.replace('-', ' ')}</span>
                                                    </label>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="p-6 bg-gray-50 border-t border-gray-100">
                                        <button
                                            type="submit"
                                            disabled={processing}
                                            className="w-full inline-flex justify-center items-center gap-2 rounded-lg bg-indigo-600 px-4 py-3 text-sm font-bold text-white shadow-lg shadow-indigo-200 hover:bg-indigo-700 active:scale-95 disabled:opacity-50 transition-all"
                                        >
                                            <Save className="w-4 h-4" />
                                            {processing ? 'Guardando...' : 'Guardar Cambios'}
                                        </button>
                                    </div>
                                </aside>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}

export default Create