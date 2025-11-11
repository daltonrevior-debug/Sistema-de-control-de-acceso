import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/layouts/app-layout';
import { EmployeeCreateProps } from '@/types/global';
import { type BreadcrumbItem } from '@/types';

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

const EmployeeCreate: React.FC<EmployeeCreateProps> = ({ departments }) => {
    // ------------------------------------
    // 1. Manejo del estado del formulario con Inertia useForm
    // ------------------------------------
    const { data, setData, post, processing, errors } = useForm({
        first_name: '',
        last_name: '',
        personal_email: '',

        // Campos para la tabla 'employees'
        employee_id: '',
        hire_date: '',
        department_id: '',
        position: '',
        phone: '',
    });

    // ------------------------------------
    // 2. Función de envío (Submission)
    // ------------------------------------
    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('personnel.employees.store'));
    };

    return (
        <AuthenticatedLayout breadcrumbs={breadcrumbs} >
            <Head title="Crear Empleado" />

            <div className="py-12">
                <div className="w-full mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white sm:rounded-lg p-8">

                        <form onSubmit={submit} className="space-y-6">
                            <h3 className="text-lg font-medium text-gray-900 border-b pb-2 mb-4">Información de Usuario (Credenciales)</h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="first_name" className="block text-sm font-medium text-gray-700">Nombre</label>
                                    <input
                                        id="first_name"
                                        type="text"
                                        value={data.first_name}
                                        onChange={(e) => setData('first_name', e.target.value)}
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                                    />
                                    {errors.first_name && <div className="text-red-500 text-xs mt-1">{errors.first_name}</div>}
                                </div>
                                <div>
                                    <label htmlFor="last_name" className="block text-sm font-medium text-gray-700">Apellido</label>
                                    <input
                                        id="last_name"
                                        type="text"
                                        value={data.last_name}
                                        onChange={(e) => setData('last_name', e.target.value)}
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                                    />
                                    {errors.last_name && <div className="text-red-500 text-xs mt-1">{errors.last_name}</div>}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="personal_email" className="block text-sm font-medium text-gray-700">Correo Electronico</label>
                                    <input
                                        id="personal_email"
                                        type="email"
                                        value={data.personal_email}
                                        onChange={(e) => setData('personal_email', e.target.value)}
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                                    />
                                    {errors.personal_email && <div className="text-red-500 text-xs mt-1">{errors.personal_email}</div>}
                                </div>
                            </div>

                            <h3 className="text-lg font-medium text-gray-900 border-b pb-2 mb-4 pt-6">Información Laboral</h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="employee_id" className="block text-sm font-medium text-gray-700">ID de Empleado</label>
                                    <input
                                        id="employee_id"
                                        type="text"
                                        value={data.employee_id}
                                        onChange={(e) => setData('employee_id', e.target.value)}
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                                    />
                                    {errors.employee_id && <div className="text-red-500 text-xs mt-1">{errors.employee_id}</div>}
                                </div>
                                <div>
                                    <label htmlFor="hire_date" className="block text-sm font-medium text-gray-700">Fecha de Contratación</label>
                                    <input
                                        id="hire_date"
                                        type="date"
                                        value={data.hire_date}
                                        onChange={(e) => setData('hire_date', e.target.value)}
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                                    />
                                    {errors.hire_date && <div className="text-red-500 text-xs mt-1">{errors.hire_date}</div>}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div>
                                    <label htmlFor="department_id" className="block text-sm font-medium text-gray-700">Departamento</label>
                                    <select
                                        id="department_id"
                                        value={data.department_id}
                                        onChange={(e) => setData('department_id', e.target.value)}
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                                    >
                                        <option value="">Seleccione un Departamento</option>
                                        {departments.map((dept) => (
                                            <option key={dept.id} value={dept.id}>{dept.name}</option>
                                        ))}
                                    </select>
                                    {errors.department_id && <div className="text-red-500 text-xs mt-1">{errors.department_id}</div>}
                                </div>
                                <div>
                                    <label htmlFor="position" className="block text-sm font-medium text-gray-700">Cargo</label>
                                    <input
                                        id="position"
                                        type="text"
                                        value={data.position}
                                        onChange={(e) => setData('position', e.target.value)}
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                                    />
                                    {errors.position && <div className="text-red-500 text-xs mt-1">{errors.position}</div>}
                                </div>
                                <div>
                                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Teléfono (Opcional)</label>
                                    <input
                                        id="phone"
                                        type="text"
                                        value={data.phone}
                                        onChange={(e) => setData('phone', e.target.value)}
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                                    />
                                    {errors.phone && <div className="text-red-500 text-xs mt-1">{errors.phone}</div>}
                                </div>
                            </div>

                            <div className="flex items-center justify-end mt-8 border-t pt-4">
                                <Link
                                    href={route('personnel.employees.index')}
                                    className="text-gray-600 hover:text-gray-900 mr-4"
                                >
                                    Cancelar
                                </Link>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className={`px-4 py-2 text-white font-semibold rounded-lg shadow-md transition duration-150 ${processing ? 'bg-gray-400' : 'bg-green-600 hover:bg-green-700'}`}
                                >
                                    {processing ? 'Guardando...' : 'Crear Empleado'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default EmployeeCreate;