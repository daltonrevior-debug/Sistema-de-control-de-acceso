import React from 'react';
import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/layouts/app-layout';
import DepartmentForm from '@/components/DepartmentForm';
import { type BreadcrumbItem } from '@/types';

const DepartmentCreate: React.FC = () => {

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Gestión', href: '#' },
        { title: 'Departamentos', href: route('config.departments.index') },
        { title: 'Crear', href: '#' },
    ];

    const initialData = {
        name: '',
        description: '',
    };

    return (
        <AuthenticatedLayout breadcrumbs={breadcrumbs}>
            <Head title="Crear Departamento" />

            <div className="py-12">
                <div className="w-full mx-auto sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-extrabold text-gray-900 mb-8">Crear Dependencia</h2>

                    <div className="bg-white sm:rounded-lg p-8">
                        <h3 className="text-xl font-bold mb-6 text-gray-800">Crear Nueva Dependencia</h3>
                        <DepartmentForm
                            initialData={initialData}
                            actionRoute={route('config.departments.store')}
                            method="post"
                            isEdit={false}
                        />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default DepartmentCreate;