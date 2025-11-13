import React from 'react';
import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/layouts/app-layout';
import AbsenceTypeForm from '@/components/AbsenceTypeForm';
import { AbsenceType } from '@/types/global';
import { type BreadcrumbItem } from '@/types';

interface AbsenceTypeEditProps {
    type: AbsenceType;
}

const AbsenceTypeEdit: React.FC<AbsenceTypeEditProps> = ({ type }) => {

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Configuración', href: '#' },
        { title: 'Tipos de Ausencia', href: route('config.absence-types.index') },
        { title: `Editar: ${type.name}`, href: '#' },
    ];
    
    const initialData = {
        name: type.name,
        description: type.description,
        is_paid: type.is_paid,
    };
    
    return (
        <AuthenticatedLayout breadcrumbs={breadcrumbs}>
            <Head title={`Editar ${type.name}`} />

            <div className="py-12">
                <div className="w-full mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white sm:rounded-lg p-8">
                        <h3 className="text-xl font-bold mb-6 text-gray-800">Editar Tipo: {type.name}</h3>
                        <AbsenceTypeForm 
                            initialData={initialData}
                            actionRoute={route('config.absence-types.update', type.id)}
                            method="put"
                            isEdit={true}
                        />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default AbsenceTypeEdit;