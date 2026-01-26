import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/layouts/app-layout';
import { EmployeeIndexProps, Employee, EmployeeData } from '@/types/global';
import { type BreadcrumbItem } from '@/types';
import { AiFillPlusCircle } from "react-icons/ai";
import { Mail, Briefcase, Clock, Eye } from 'lucide-react';
import EmployeeBadge from '@/components/EmployeeBadge';

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

const EmployeeIndex: React.FC<EmployeeIndexProps> = ({ employees }) => {

    const [selectedEmployee, setSelectedEmployee] = useState<EmployeeData>(employees.data[0]);

    const getStatusBadgeClass = (status: Employee['status']): string => {
        switch (status) {
            case 'active':
                return 'bg-emerald-100 text-emerald-700 border-emerald-200';
            case 'inactive':
                return 'bg-amber-100 text-amber-700 border-amber-200';
            case 'terminated':
                return 'bg-rose-100 text-rose-700 border-rose-200';
            default:
                return 'bg-slate-100 text-slate-700 border-slate-200';
        }
    };

    return (
        <AuthenticatedLayout breadcrumbs={breadcrumbs}>
            <Head title="Gestión de Empleados" />

            <div className='grid grid-cols-12 gap-8 py-8 px-4 sm:px-6 lg:px-8 bg-[#f8fafc] min-h-screen'>

                <div className="col-span-12 lg:col-span-8 flex flex-col gap-6">
                    <div className="flex justify-between items-end">
                        <div>
                            <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                                Listado de Personal
                            </h3>
                            <p className="text-slate-500 text-sm mt-1">
                                Gestiona la información de tus {employees.total} empleados registrados.
                            </p>
                        </div>
                        <Link
                            href={route('personnel.employees.create')}
                            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2.5 px-5 rounded-xl shadow-lg shadow-indigo-200 transition-all active:scale-95 flex items-center gap-2 text-sm"
                        >
                            <AiFillPlusCircle size={"1.2rem"} /> Añadir Empleado
                        </Link>
                    </div>

                    <div className="bg-white border border-slate-200 shadow-sm rounded-2xl overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-slate-200">
                                <thead className="bg-slate-50/50">
                                    <tr className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                                        <th className="p-4 text-left">ID</th>
                                        <th className="p-4 text-left">Colaborador</th>
                                        <th className="p-4 text-left">Departamento</th>
                                        <th className="p-4 text-left">Horario</th>
                                        <th className="p-4 text-center">Estado</th>
                                        <th className="p-4 text-center">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-slate-100">
                                    {employees.data.map((emp) => (
                                        <tr
                                            key={emp.id}
                                            onClick={() => setSelectedEmployee(emp)}
                                            className={`group cursor-pointer transition-all duration-200 ${selectedEmployee?.id === emp.id
                                                ? 'bg-indigo-50/60 ring-1 ring-inset ring-indigo-200'
                                                : 'hover:bg-slate-50'
                                                }`}
                                        >
                                            <td className="p-4 whitespace-nowrap text-xs font-mono text-slate-400">
                                                #{emp.employee_id}
                                            </td>
                                            <td className="p-4 whitespace-nowrap">
                                                <div className="flex flex-col">
                                                    <span className="text-sm font-bold text-slate-900">{emp.first_name}</span>
                                                    <span className="text-xs text-slate-500 flex items-center gap-1">
                                                        <Mail size={12} /> {emp.personal_email}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="p-4 whitespace-nowrap">
                                                <div className="flex items-center gap-2 text-sm text-slate-600">
                                                    <Briefcase size={14} className="text-slate-400" />
                                                    {emp.department.name}
                                                </div>
                                            </td>
                                            <td className="p-4 whitespace-nowrap">
                                                <div className="flex items-center gap-2 text-sm text-slate-600">
                                                    <Clock size={14} className="text-slate-400" />
                                                    {emp?.schedule?.name || 'No asignado'}
                                                </div>
                                            </td>
                                            <td className="p-4 whitespace-nowrap text-center">
                                                <span className={`px-2.5 py-1 inline-flex text-[10px] leading-4 font-bold rounded-full border uppercase tracking-wider ${getStatusBadgeClass(emp.status)}`}>
                                                    {emp.status}
                                                </span>
                                            </td>
                                            <td className="p-4 whitespace-nowrap text-center">
                                                <Link
                                                    href={route('personnel.employees.edit', emp.id)}
                                                    className="inline-flex items-center justify-center w-8 h-8 rounded-full text-slate-400 hover:bg-white hover:text-indigo-600 hover:shadow-sm border border-transparent hover:border-slate-200 transition-all"
                                                >
                                                    <Eye size={18} />
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="p-4 border-t border-slate-100 flex justify-between items-center bg-slate-50/30">
                            <span className="text-slate-500 text-xs font-medium">
                                Mostrando <span className="text-slate-900 font-bold">{employees.from}-{employees.to}</span> de {employees.total} empleados
                            </span>
                        </div>
                    </div>
                </div>

                <div className="col-span-12 lg:col-span-4 relative">
                    <div className="sticky top-8 flex flex-col items-center">
                        <div className="mb-6 text-center">
                            <h4 className="text-sm font-bold text-slate-400 uppercase tracking-[0.2em]">Vista Previa Digital</h4>
                            <div className="h-1 w-8 bg-indigo-500 mx-auto mt-2 rounded-full"></div>
                        </div>

                        <div className="transform transition-all duration-500 hover:translate-y-[-5px]">
                            <EmployeeBadge employee={selectedEmployee} />
                        </div>

                    </div>
                </div>

            </div>
        </AuthenticatedLayout>
    );
};

export default EmployeeIndex;