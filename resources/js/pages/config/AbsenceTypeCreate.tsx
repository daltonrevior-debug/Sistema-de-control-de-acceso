import React from 'react';
import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/layouts/app-layout';
import AbsenceTypeForm from '@/components/AbsenceTypeForm';
import { type BreadcrumbItem } from '@/types';

const AbsenceTypeCreate: React.FC = () => {
    
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Configuración', href: '#' },
        { title: 'Tipos de Ausencia', href: route('config.absence-types.index') },
        { title: 'Crear', href: '#' },
    ];

    const initialData = {
        name: '',
        description: '',
        is_paid: true,
    };
    
    return (
        <AuthenticatedLayout breadcrumbs={breadcrumbs}>
            <Head title="Crear Tipo de Ausencia" />

            <div className="py-12">
                <div className="w-full mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white sm:rounded-lg p-8">
                        <AbsenceTypeForm 
                            initialData={initialData}
                            actionRoute={route('config.absence-types.store')}
                            method="post"
                            isEdit={false}
                        />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default AbsenceTypeCreate;