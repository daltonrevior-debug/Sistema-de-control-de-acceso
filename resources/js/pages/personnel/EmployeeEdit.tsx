import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/layouts/app-layout';
import { EmployeeEditProps, EmployeeData } from '@/types/global';
import { type BreadcrumbItem } from '@/types';
import EmployeeBadge from '@/components/EmployeeBadge';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Personal',
        href: '/dashboard',
    },
    {
        title: 'Editar Empleado',
        href: '/dashboard',
    }
];

const EmployeeEdit: React.FC<EmployeeEditProps> = ({ employee, departments, schedule }) => {

    const { data, setData, put, processing, errors } = useForm({
        _method: 'put',
        first_name: employee.first_name,
        last_name: employee.last_name,
        personal_email: employee.personal_email || '',
        employee_id: employee.employee_id,
        hire_date: employee.hire_date,
        department_id: employee?.department_id?.toString(),
        schedule_id: employee?.schedule_id?.toString(),
        position: employee.position || '',
        phone: employee.phone || '',
        status: employee.status,
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        put(route('personnel.employees.update', employee.id));
    };

    return (
        <AuthenticatedLayout breadcrumbs={breadcrumbs}>
            <Head title={`Editar ${employee.first_name}`} />

            <div className="py-12 min-h-screen">
                <div className="max-w-5xl sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-extrabold text-gray-900 mb-8">{`Editar : ${employee.first_name}`}</h2>

                    <div className="bg-white shadow-sm border border-gray-200 rounded-xl p-8">
                        <form onSubmit={submit} className="space-y-8">

                            <div>
                                <div className="flex items-center gap-2 mb-6">
                                    <div className="h-8 w-1 bg-indigo-600 rounded-full"></div>
                                    <h3 className="text-xl font-semibold text-gray-800">Información de Personal</h3>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                                    <div className="space-y-1">
                                        <label htmlFor="first_name" className="text-sm font-semibold text-gray-700 ml-1">Nombre</label>
                                        <input
                                            id="first_name"
                                            type="text"
                                            value={data.first_name}
                                            onChange={(e) => setData('first_name', e.target.value)}
                                            className={`block w-full px-4 py-3 rounded-lg border ${errors.first_name ? 'border-red-400' : 'border-gray-300'} focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 transition duration-200 outline-none`}
                                        />
                                        {errors.first_name && <p className="text-red-500 text-xs mt-1 italic">{errors.first_name}</p>}
                                    </div>

                                    <div className="space-y-1">
                                        <label htmlFor="last_name" className="text-sm font-semibold text-gray-700 ml-1">Apellido</label>
                                        <input
                                            id="last_name"
                                            type="text"
                                            value={data.last_name}
                                            onChange={(e) => setData('last_name', e.target.value)}
                                            className={`block w-full px-4 py-3 rounded-lg border ${errors.last_name ? 'border-red-400' : 'border-gray-300'} focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 transition duration-200 outline-none`}
                                        />
                                        {errors.last_name && <p className="text-red-500 text-xs mt-1 italic">{errors.last_name}</p>}
                                    </div>

                                    <div className="space-y-1">
                                        <label htmlFor="personal_email" className="text-sm font-semibold text-gray-700 ml-1">Email Personal</label>
                                        <input
                                            id="personal_email"
                                            type="email"
                                            value={data.personal_email}
                                            onChange={(e) => setData('personal_email', e.target.value)}
                                            className={`block w-full px-4 py-3 rounded-lg border ${errors.personal_email ? 'border-red-400' : 'border-gray-300'} focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 transition duration-200 outline-none`}
                                        />
                                        {errors.personal_email && <p className="text-red-500 text-xs mt-1 italic">{errors.personal_email}</p>}
                                    </div>

                                    <div className="space-y-1">
                                        <label htmlFor="phone" className="text-sm font-semibold text-gray-700 ml-1">Teléfono</label>
                                        <input
                                            id="phone"
                                            type="text"
                                            value={data.phone}
                                            onChange={(e) => setData('phone', e.target.value)}
                                            className={`block w-full px-4 py-3 rounded-lg border ${errors.phone ? 'border-red-400' : 'border-gray-300'} focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 transition duration-200 outline-none`}
                                        />
                                        {errors.phone && <p className="text-red-500 text-xs mt-1 italic">{errors.phone}</p>}
                                    </div>
                                </div>
                            </div>

                            <div className="pt-6 border-t border-gray-100">
                                <div className="flex items-center gap-2 mb-6">
                                    <div className="h-8 w-1 bg-emerald-500 rounded-full"></div>
                                    <h3 className="text-xl font-semibold text-gray-800">Información Laboral</h3>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div className="space-y-1">
                                        <label htmlFor="employee_id" className="text-sm font-semibold text-gray-700 ml-1">ID de Empleado</label>
                                        <input
                                            id="employee_id"
                                            type="text"
                                            value={data.employee_id}
                                            onChange={(e) => setData('employee_id', e.target.value)}
                                            className="block w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-4 focus:ring-emerald-50 focus:border-emerald-500 transition duration-200 outline-none"
                                        />
                                        {errors.employee_id && <p className="text-red-500 text-xs mt-1">{errors.employee_id}</p>}
                                    </div>

                                    <div className="space-y-1">
                                        <label htmlFor="hire_date" className="text-sm font-semibold text-gray-700 ml-1">Fecha de Contratación</label>
                                        <input
                                            id="hire_date"
                                            type="date"
                                            value={data.hire_date}
                                            onChange={(e) => setData('hire_date', e.target.value)}
                                            className="block w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-4 focus:ring-emerald-50 focus:border-emerald-500 transition duration-200 outline-none"
                                        />
                                        {errors.hire_date && <p className="text-red-500 text-xs mt-1">{errors.hire_date}</p>}
                                    </div>

                                    <div className="space-y-1">
                                        <label htmlFor="status" className="text-sm font-semibold text-gray-700 ml-1">Estado</label>
                                        <select
                                            id="status"
                                            value={data.status}
                                            onChange={(e) => setData('status', e.target.value as EmployeeData["status"])}
                                            className="block w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-4 focus:ring-emerald-50 focus:border-emerald-500 transition duration-200 outline-none bg-white"
                                        >
                                            <option value="active">Activo</option>
                                            <option value="inactive">Inactivo</option>
                                            <option value="terminated">Terminado</option>
                                        </select>
                                        {errors.status && <p className="text-red-500 text-xs mt-1">{errors.status}</p>}
                                    </div>
                                </div>

                                {/* Fila inferior: Depto, Horario y Cargo */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                                    <div className="space-y-1">
                                        <label htmlFor="department_id" className="text-sm font-semibold text-gray-700 ml-1">Departamento</label>
                                        <select
                                            id="department_id"
                                            value={data.department_id}
                                            onChange={(e) => setData('department_id', e.target.value)}
                                            className="block w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-4 focus:ring-emerald-50 focus:border-emerald-500 transition duration-200 outline-none bg-white"
                                        >
                                            <option value="">Seleccione un Departamento</option>
                                            {departments.map((dept) => (
                                                <option key={dept.id} value={dept.id}>{dept.name}</option>
                                            ))}
                                        </select>
                                        {errors.department_id && <p className="text-red-500 text-xs mt-1">{errors.department_id}</p>}
                                    </div>

                                    <div className="space-y-1">
                                        <label htmlFor="schedule_id" className="text-sm font-semibold text-gray-700 ml-1">Horario</label>
                                        <select
                                            id="schedule_id"
                                            value={data.schedule_id}
                                            onChange={(e) => setData('schedule_id', e.target.value)}
                                            className="block w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-4 focus:ring-emerald-50 focus:border-emerald-500 transition duration-200 outline-none bg-white"
                                        >
                                            <option value="">Seleccione un Horario</option>
                                            {schedule.map((hour) => (
                                                <option key={hour.id} value={hour.id}>{hour.name}</option>
                                            ))}
                                        </select>
                                        {errors.schedule_id && <p className="text-red-500 text-xs mt-1">{errors.schedule_id}</p>}
                                    </div>

                                    <div className="space-y-1">
                                        <label htmlFor="position" className="text-sm font-semibold text-gray-700 ml-1">Cargo</label>
                                        <input
                                            id="position"
                                            type="text"
                                            value={data.position}
                                            onChange={(e) => setData('position', e.target.value)}
                                            className="block w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-4 focus:ring-emerald-50 focus:border-emerald-500 transition duration-200 outline-none"
                                        />
                                        {errors.position && <p className="text-red-500 text-xs mt-1">{errors.position}</p>}
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center justify-end mt-10 pt-6 border-t border-gray-100 gap-4">
                                <Link
                                    href={route('personnel.employees.index')}
                                    className="px-6 py-3 text-sm font-medium text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition duration-200"
                                >
                                    Cancelar
                                </Link>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className={`px-8 py-3 text-white font-bold rounded-lg shadow-lg transform active:scale-95 transition duration-200 ${processing
                                        ? 'bg-gray-400 cursor-not-allowed'
                                        : 'bg-indigo-600 hover:bg-indigo-700 hover:shadow-indigo-100'
                                        }`}
                                >
                                    {processing ? 'Actualizando...' : 'Guardar Cambios'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        </AuthenticatedLayout>
    );
};

export default EmployeeEdit;