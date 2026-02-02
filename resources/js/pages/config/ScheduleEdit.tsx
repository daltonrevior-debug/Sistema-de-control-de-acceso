import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/layouts/app-layout';
import ScheduleForm from './ScheduleForm';
import { Schedule } from '@/types/global';
import { type BreadcrumbItem } from '@/types';
import { ArrowLeft, Timer } from 'lucide-react';

interface ScheduleEditProps {
    schedule: Schedule;
}

const ScheduleEdit: React.FC<ScheduleEditProps> = ({ schedule }) => {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Horarios', href: route('config.schedules.index') },
        { title: 'Editar', href: '#' }
    ];

    const initialData = {
        name: schedule.name,
        start_time: schedule.start_time.substring(0, 5),
        end_time: schedule.end_time.substring(0, 5),
        tardy_tolerance_minutes: schedule.tardy_tolerance_minutes,
    };

    return (
        <AuthenticatedLayout breadcrumbs={breadcrumbs}>
            <Head title={`Editar ${schedule.name}`} />
            <div className="max-w-3xl py-10 px-4">
                <Link href={route('config.schedules.index')} className="inline-flex items-center text-sm text-gray-500 hover:text-violet-600 mb-6 group transition-colors">
                    <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                    Cancelar edición
                </Link>

                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="px-8 py-6 border-b border-gray-50 bg-gray-50/50 flex items-center gap-4">
                        <div className="p-3 bg-amber-500 rounded-xl text-white shadow-lg shadow-amber-100">
                            <Timer className="w-6 h-6" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-gray-900">Ajustar Parámetros</h2>
                            <p className="text-sm text-gray-500 font-medium">Actualizando horario: <span className="text-violet-600 underline">{schedule.name}</span></p>
                        </div>
                    </div>
                    <div className="p-8">
                        <ScheduleForm initialData={initialData} actionRoute={route('config.schedules.update', schedule.id)} method="put" isEdit={true} />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default ScheduleEdit;