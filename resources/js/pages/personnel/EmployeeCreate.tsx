import React, { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/layouts/app-layout';
import { EmployeeCreateProps } from '@/types/global';
import { type BreadcrumbItem } from '@/types';
import {
    AiOutlineUser, AiOutlineMail, AiOutlineIdcard,
    AiOutlineCalendar, AiOutlinePhone, AiOutlineHome,
    AiOutlineGlobal, AiFillPlusCircle
} from 'react-icons/ai';
import { HiOutlineOfficeBuilding } from 'react-icons/hi';
import { MdOutlineWorkOutline, MdOutlineTimeline } from 'react-icons/md';

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

const Jerarquias = [
    "Coronel", "Teniente Coronel", "Mayor", "Capitan", "Primer Teniente",
    "Teniente", "Sargento Mayor de Tercera", "Sargento Primero", "Sargento Segundo",
    "Cabo Primero", "Cabo Segundo", "Distinguido", "Soldado"
]

const EmployeeCreate: React.FC<EmployeeCreateProps> = ({ departments, schedule }) => {
    const [preview, setPreview] = useState<string | null>(null);

    const { data, setData, post, processing, errors } = useForm({
        first_name: '',
        last_name: '',
        personal_email: '',
        employee_id: '',
        hire_date: '',
        department_id: '',
        schedule_id: '',
        position: '',
        phone: '',
        status: "active",
        birth_date: '',
        birth_place: '',
        marital_status: 'soltero',
        current_address: '',
        photo: null as File | null,
    });

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files ? e.target.files[0] : null;
        setData('photo', file);
        if (file) {
            setPreview(URL.createObjectURL(file));
        } else {
            setPreview(null);
        }
    };

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('personnel.employees.store'));
    };

    return (
        <AuthenticatedLayout breadcrumbs={breadcrumbs} >
            <Head title="Añadir Miliciano" />

            <div className="py-12 min-h-screen">
                <div className="max-w-5xl sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-gray-800 mb-8">Registrar Nuevo Miliciano</h2>

                    <div className="bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-100">
                        <form onSubmit={submit} className="p-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">

                                <div className="md:col-span-2 flex items-center gap-6 pb-4 border-b border-gray-50">
                                    <div className="w-24 h-24 rounded-xl bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden">
                                        {preview ? (
                                            <img src={preview} className="w-full h-full object-cover" />
                                        ) : (
                                            <span className="text-gray-400 text-xs text-center p-2">Sin foto</span>
                                        )}
                                    </div>
                                    <div className="flex-1">
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">Foto del Carnet</label>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleFileChange}
                                            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                                        />
                                        {errors.photo && <p className="text-red-500 text-xs mt-1">{errors.photo}</p>}
                                    </div>
                                </div>

                                <div>
                                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                                        <AiOutlineUser className="text-indigo-500" /> Nombres
                                    </label>
                                    <input
                                        type="text"
                                        maxLength={40}
                                        value={data.first_name}
                                        onChange={(e) => setData('first_name', e.target.value)}
                                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                                        placeholder="Ej. Juan Andrés"
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
                                        maxLength={40}
                                        value={data.last_name}
                                        onChange={(e) => setData('last_name', e.target.value)}
                                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                                        placeholder="Ej. Pérez"
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
                                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="correo@ejemplo.com"
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
                                        className="w-full px-4 py-3 rounded-lg border" placeholder="0412-1234567"
                                    />
                                </div>

                                <div className="md:col-span-2">
                                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                                        <AiOutlineHome className="text-indigo-500" /> Dirección de Residencia
                                    </label>
                                    <textarea
                                        value={data.current_address}
                                        onChange={(e) => setData('current_address', e.target.value)}
                                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50"
                                    />
                                    {errors.employee_id && <p className="text-red-500 text-xs mt-1">{errors.employee_id}</p>}
                                </div>

                                <div>
                                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                                        <MdOutlineTimeline className="text-indigo-500" /> Estado Laboral
                                    </label>
                                    <select
                                        value={data.status}
                                        onChange={(e) => setData('status', e.target.value)}
                                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                                    >
                                        <option value="">Seleccione una estatus</option>
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
                                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                                    >
                                        <option value="">Seleccione una dependecia</option>
                                        {departments.map((dept) => (
                                            <option key={dept.id} value={dept.id}>{dept.name}</option>
                                        ))}
                                    </select>
                                    {errors.department_id && <p className="text-red-500 text-xs mt-1">{errors.department_id}</p>}
                                </div>

                                <div>
                                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                                        <MdOutlineWorkOutline className="text-indigo-500" /> Jerarquía
                                    </label>
                                    <select
                                        value={data.position}
                                        onChange={(e) => setData('position', e.target.value as any)}
                                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    >
                                        <option>Seleccione una Jerarquía</option>
                                        {Jerarquias.map((jer, i) => (
                                            <option key={i} value={jer}>
                                                {jer}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.position && <p className="text-red-500 text-xs mt-1">{errors.position}</p>}
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
                                    className="px-6 py-3 text-sm font-medium text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition duration-200"
                                >
                                    Cancelar
                                </Link>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className={` cursor-pointer text-white font-bold py-2.5 px-5 rounded-xl shadow-lg shadow-indigo-200 transition-all active:scale-95 flex items-center gap-2 text-sm ${processing
                                        ? 'bg-gray-400 cursor-not-allowed'
                                        : 'bg-indigo-600 hover:bg-indigo-700 hover:shadow-green-100'
                                        }`}
                                >
                                    <AiFillPlusCircle size={"1.2rem"} />   {processing ? 'Guardando...' : 'Registrar'}
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