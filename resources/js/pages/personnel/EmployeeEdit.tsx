import React, { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/layouts/app-layout';
import { EmployeeEditProps } from '@/types/global';
import { type BreadcrumbItem } from '@/types';
import {
    AiOutlineUser, AiOutlineMail, AiOutlineIdcard,
    AiOutlineCalendar, AiOutlinePhone, AiOutlineHome,
    AiOutlineGlobal, AiOutlineCamera, AiOutlineSave
} from 'react-icons/ai';
import { HiOutlineOfficeBuilding } from 'react-icons/hi';
import { MdOutlineWorkOutline, MdOutlineTimeline } from 'react-icons/md';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Personal', href: '/dashboard' },
    { title: 'Editar Empleado', href: '/dashboard' }
];

const EmployeeEdit: React.FC<EmployeeEditProps> = ({ employee, departments, schedule }) => {
    const [preview, setPreview] = useState<string | null>(
        employee.photo ? `${employee.photo}` : null
    );

    const { data, setData, post, processing, errors } = useForm({
        _method: 'put',
        first_name: employee.first_name || '',
        last_name: employee.last_name || '',
        personal_email: employee.personal_email || '',
        employee_id: employee.employee_id || '',
        hire_date: employee.hire_date || '',
        department_id: employee.department_id?.toString() || '',
        schedule_id: employee.schedule_id?.toString() || '',
        position: employee.position || '',
        phone: employee.phone || '',
        status: employee.status || 'active',
        birth_date: employee.birth_date || '',
        birth_place: employee.birth_place || '',
        marital_status: employee.marital_status || 'soltero',
        current_address: employee.current_address || '',
        photo: null as File | null,
    });

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files ? e.target.files[0] : null;
        setData('photo', file);
        if (file) {
            setPreview(URL.createObjectURL(file));
        }
    };

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('personnel.employees.update', employee.id));
    };

    return (
        <AuthenticatedLayout breadcrumbs={breadcrumbs}>
            <Head title="Editar Empleado" />

            <div className="py-12 min-h-screen">
                <div className="max-w-5xl sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-gray-800 mb-8 flex items-center gap-3">
                        <AiOutlineUser className="text-indigo-600" /> Editar Información: {employee.first_name}
                    </h2>

                    <div className="bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-100">
                        <form onSubmit={submit} className="p-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">

                                <div className="md:col-span-2 flex items-center gap-6 pb-6 border-b border-gray-50">
                                    <div className="relative group w-24 h-24">
                                        <div className="w-full h-full rounded-xl bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden">
                                            {preview ? (
                                                <img src={preview} className="w-full h-full object-cover" alt="Perfil" />
                                            ) : (
                                                <AiOutlineCamera className="text-gray-400 text-2xl" />
                                            )}
                                        </div>
                                    </div>
                                    <div className="flex-1">
                                        <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                                            <AiOutlineCamera className="text-indigo-500" /> Foto del Carnet
                                        </label>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleFileChange}
                                            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                                        />
                                        <p className="text-[10px] text-gray-400 mt-1 italic">Sube una nueva foto solo si deseas cambiar la actual.</p>
                                    </div>
                                </div>

                                <div>
                                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                                        <AiOutlineUser className="text-indigo-500" /> Nombres
                                    </label>
                                    <input
                                        type="text"
                                        value={data.first_name}
                                        maxLength={40}
                                        onChange={(e) => setData('first_name', e.target.value)}
                                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-500 transition duration-200"
                                    />
                                    <p className="text-[10px] text-gray-400 text-right">
                                        {data.first_name.length} / 40
                                    </p>
                                    {errors.first_name && <p className="text-red-500 text-xs mt-1">{errors.first_name}</p>}
                                </div>

                                <div>
                                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                                        <AiOutlineUser className="text-indigo-500" /> Apellidos
                                    </label>
                                    <input
                                        type="text"
                                        value={data.last_name}
                                        maxLength={40}
                                        onChange={(e) => setData('last_name', e.target.value)}
                                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-500 transition duration-200"
                                    />
                                    <p className="text-[10px] text-gray-400 text-right">
                                        {data.last_name.length} / 40
                                    </p>
                                    {errors.last_name && <p className="text-red-500 text-xs mt-1">{errors.last_name}</p>}
                                </div>

                                <div>
                                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                                        <AiOutlineCalendar className="text-indigo-500" /> Fecha de Nacimiento
                                    </label>
                                    <input
                                        type="date"
                                        value={data.birth_date}
                                        onChange={(e) => setData('birth_date', e.target.value)}
                                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-500"
                                    />
                                    {errors.birth_date && <p className="text-red-500 text-xs mt-1">{errors.birth_date}</p>}
                                </div>

                                <div>
                                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                                        <AiOutlineUser className="text-indigo-500" /> Estado Civil
                                    </label>
                                    <select
                                        value={data.marital_status}
                                        onChange={(e) => setData('marital_status', e.target.value as any)}
                                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-500"
                                    >
                                        <option value="soltero">Soltero/a</option>
                                        <option value="casado">Casado/a</option>
                                        <option value="viudo">Viudo/a</option>
                                        <option value="divorciado">Divorciado/a</option>
                                    </select>
                                    {errors.marital_status && <p className="text-red-500 text-xs mt-1">{errors.marital_status}</p>}
                                </div>

                                <div className="md:col-span-2">
                                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                                        <AiOutlineGlobal className="text-indigo-500" /> Lugar de Nacimiento
                                    </label>
                                    <input
                                        type="text"
                                        value={data.birth_place}
                                        onChange={(e) => setData('birth_place', e.target.value)}
                                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-500"
                                        placeholder="Ciudad, Estado"
                                    />
                                </div>

                                <div>
                                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                                        <AiOutlineMail className="text-indigo-500" /> Correo Personal
                                    </label>
                                    <input
                                        type="email"
                                        value={data.personal_email}
                                        onChange={(e) => setData('personal_email', e.target.value)}
                                        className="w-full px-4 py-3 rounded-lg border border-gray-200"
                                    />
                                </div>

                                <div>
                                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                                        <AiOutlinePhone className="text-indigo-500" /> Teléfono
                                    </label>
                                    <input
                                        type="text"
                                        maxLength={12}
                                        value={data.phone}
                                        onChange={(e) => {
                                            const val = e.target.value.replace(/[^0-9+\- ]/g, '');
                                            setData('phone', val);
                                        }}
                                        className="w-full px-4 py-3 rounded-lg border border-gray-200"
                                        placeholder="0412-1234567"
                                    />
                                </div>

                                <div className="md:col-span-2">
                                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                                        <AiOutlineHome className="text-indigo-500" /> Dirección de Residencia
                                    </label>
                                    <textarea
                                        value={data.current_address}
                                        onChange={(e) => setData('current_address', e.target.value)}
                                        className="w-full px-4 py-3 rounded-lg border border-gray-200"
                                        rows={2}
                                        placeholder="Dirección completa..."
                                    />
                                </div>

                                <div>
                                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                                        <AiOutlineIdcard className="text-indigo-500" /> # Cedula
                                    </label>
                                    <input
                                        type="text"
                                        maxLength={8}
                                        value={data.employee_id}
                                        onChange={(e) => setData('employee_id', e.target.value)}
                                        className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-gray-50 font-mono"
                                    />
                                    {errors.employee_id && <p className="text-red-500 text-xs mt-1">{errors.employee_id}</p>}
                                </div>

                                <div>
                                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                                        <MdOutlineTimeline className="text-indigo-500" /> Estado Laboral
                                    </label>
                                    <select
                                        value={data.status}
                                        onChange={(e) => setData('status', e.target.value as any)}
                                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-500"
                                    >
                                        <option value="active">Activo</option>
                                        <option value="inactive">Inactivo</option>
                                        <option value="terminated">Terminado</option>
                                    </select>
                                    {errors.status && <p className="text-red-500 text-xs mt-1">{errors.status}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Fecha de Incorporacion</label>
                                    <input
                                        type="date"
                                        value={data.hire_date}
                                        onChange={(e) => setData('hire_date', e.target.value)}
                                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>

                                <div>
                                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                                        <HiOutlineOfficeBuilding className="text-indigo-500" /> Dependencia
                                    </label>
                                    <select
                                        value={data.department_id}
                                        onChange={(e) => setData('department_id', e.target.value)}
                                        className="w-full px-4 py-3 rounded-lg border border-gray-200"
                                    >
                                        {departments.map((dept) => (
                                            <option key={dept.id} value={dept.id}>{dept.name}</option>
                                        ))}
                                    </select>
                                    {errors.department_id && <p className="text-red-500 text-xs mt-1">{errors.department_id}</p>}
                                </div>

                                <div>
                                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                                        <MdOutlineWorkOutline className="text-indigo-500" /> Cargo / Posición
                                    </label>
                                    <input
                                        type="text"
                                        value={data.position}
                                        onChange={(e) => setData('position', e.target.value)}
                                        className="w-full px-4 py-3 rounded-lg border border-gray-200"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Horario Asignado</label>
                                    <select
                                        value={data.schedule_id}
                                        onChange={(e) => setData('schedule_id', e.target.value)}
                                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                                    >
                                        <option value="">Seleccione un horario</option>
                                        {schedule.map((sch) => (
                                            <option key={sch.id} value={sch.id}>{sch.name}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="flex items-center justify-end mt-10 pt-6 border-t border-gray-100 gap-4">
                                <Link
                                    href={route('personnel.employees.index')}
                                    className="px-6 py-3 text-sm font-medium text-gray-500 hover:text-gray-700 rounded-lg transition"
                                >
                                    Cancelar
                                </Link>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className={`px-8 py-3 text-white font-bold rounded-lg shadow-lg flex items-center gap-2 transition duration-200 ${processing ? 'bg-gray-400' : 'bg-indigo-600 hover:bg-indigo-700 active:scale-95'
                                        }`}
                                >
                                    <AiOutlineSave className="text-xl" />
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