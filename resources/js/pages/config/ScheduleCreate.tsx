import React from 'react';
import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/layouts/app-layout';
import ScheduleForm from './ScheduleForm';
import { type BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Gestión',
        href: '/dashboard',
    },
    {
        title: 'Crear un Nuevo Horario',
        href: '/dashboard',
    }
];

const ScheduleCreate: React.FC = () => {

    const initialData = {
        name: '',
        start_time: '09:00',
        end_time: '17:00',
        tardy_tolerance_minutes: 15,
    };

    return (
        <AuthenticatedLayout breadcrumbs={breadcrumbs}>
            <Head title="Crear Horario" />

            <div className="py-12">
                <div className="w-full mx-auto sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-extrabold text-gray-900 mb-8">Crear Horario</h2>

                    <div className="bg-white sm:rounded-lg p-8">
                        <ScheduleForm
                            initialData={initialData}
                            actionRoute={route('config.schedules.store')}
                            method="post"
                            isEdit={false}
                        />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default ScheduleCreate;