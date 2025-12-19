import React from 'react';
import { Link, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/layouts/app-layout';
import { Trash2, Edit } from 'lucide-react';
import { PaginatedData, PageProps } from '@/types/global';
import { type BreadcrumbItem } from '@/types';
import { AiFillPlusCircle } from "react-icons/ai"

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Configuracion',
        href: '/dashboard',
    },
    {
        title: 'Gestion',
        href: '/dashboard',
    }
];

interface Schedule {
    id: number;
    name: string;
    start_time: string;
    end_time: string;
    tardy_tolerance_minutes: number;
}

interface ScheduleIndexProps extends PageProps {
    schedules: PaginatedData<Schedule>;
}

const ScheduleIndex: React.FC<ScheduleIndexProps> = ({ schedules }) => {

    const handleDelete = (schedule: Schedule) => {
        if (confirm(`¿Estás seguro de que quieres eliminar el horario "${schedule.name}"?`)) {
            router.delete(route('config.schedules.destroy', schedule.id));
        }
    };

    return (
        <AuthenticatedLayout breadcrumbs={breadcrumbs}>
            <div className="py-12">
                <div className="w-full mx-auto sm:px-6 lg:px-8">

                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-medium text-gray-900">
                            Gestión de Horarios
                        </h3>
                        <Link
                            href={route('config.schedules.create')}
                            className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow-md transition duration-150"
                        >
                            <AiFillPlusCircle size={"1.3rem"} color='white' /> Crear Horario
                        </Link>
                    </div>

                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            {/* Aqui se implementaria una logica para paginacion */}
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Entrada</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Salida</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tolerancia (min)</th>
                                        <th className="relative px-6 py-3"><span className="sr-only">Acciones</span></th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {schedules.data.map((schedule) => (
                                        <tr key={schedule.id}>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{schedule.name}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{schedule.start_time}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{schedule.end_time}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{schedule.tardy_tolerance_minutes}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <Link
                                                    href={route('config.schedules.edit', schedule.id)}
                                                    className="text-indigo-600 hover:text-indigo-900 mr-4"
                                                    title="Editar"
                                                >
                                                    <Edit className="w-5 h-5 inline" />
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(schedule)}
                                                    className="text-red-600 hover:text-red-900"
                                                    title="Eliminar"
                                                >
                                                    <Trash2 className="w-5 h-5 inline" />
                                                </button>
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
    );
};

export default ScheduleIndex;