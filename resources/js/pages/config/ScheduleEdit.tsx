import React from 'react';
import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/layouts/app-layout';
import ScheduleForm from './ScheduleForm';
import { Schedule } from '@/types/global';
import { type BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Gestión',
        href: '/dashboard',
    },
    {
        title: 'Editar horario',
        href: '/dashboard',
    }
];

interface ScheduleEditProps {
    schedule: Schedule;
}

const ScheduleEdit: React.FC<ScheduleEditProps> = ({ schedule }) => {
    
    const initialData = {
        name: schedule.name,
        start_time: schedule.start_time.substring(0, 5),
        end_time: schedule.end_time.substring(0, 5),
        tardy_tolerance_minutes: schedule.tardy_tolerance_minutes,
    };
    
    return (
        <AuthenticatedLayout breadcrumbs={breadcrumbs} >
            <Head title={`Editar ${schedule.name}`} />

            <div className="py-12">
                <div className="w-full mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white sm:rounded-lg p-8">
                        <ScheduleForm 
                            initialData={initialData}
                            actionRoute={route('config.schedules.update', schedule.id)}
                            method="put"
                            isEdit={true}
                        />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default ScheduleEdit;