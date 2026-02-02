import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/layouts/app-layout';
import ScheduleForm from './ScheduleForm';
import { type BreadcrumbItem } from '@/types';
import { ArrowLeft, Clock4 } from 'lucide-react';

const ScheduleCreate: React.FC = () => {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Horarios', href: route('config.schedules.index') },
        { title: 'Nuevo', href: '#' }
    ];

    const initialData = {
        name: '',
        start_time: '09:00',
        end_time: '17:00',
        tardy_tolerance_minutes: 15,
    };

    return (
        <AuthenticatedLayout breadcrumbs={breadcrumbs}>
            <Head title="Crear Horario" />
            <div className="max-w-3xl py-10 px-4">
                <Link href={route('config.schedules.index')} className="inline-flex items-center text-sm text-gray-500 hover:text-violet-600 mb-6 group transition-colors">
                    <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                    Volver a horarios
                </Link>

                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="px-8 py-6 border-b border-gray-50 bg-gray-50/50 flex items-center gap-4">
                        <div className="p-3 bg-violet-600 rounded-xl text-white shadow-lg shadow-violet-100">
                            <Clock4 className="w-6 h-6" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-gray-900">Definir Horario</h2>
                            <p className="text-sm text-gray-500">Establece los límites de la jornada laboral.</p>
                        </div>
                    </div>
                    <div className="p-8">
                        <ScheduleForm initialData={initialData} actionRoute={route('config.schedules.store')} method="post" isEdit={false} />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default ScheduleCreate;