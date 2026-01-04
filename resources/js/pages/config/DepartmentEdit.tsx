import React from 'react';
import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/layouts/app-layout';
import DepartmentForm from '@/components/DepartmentForm';
import { Department } from '@/types/global';
import { type BreadcrumbItem } from '@/types';

interface DepartmentEditProps {
    department: Department;
}

const DepartmentEdit: React.FC<DepartmentEditProps> = ({ department }) => {

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Gestión', href: '#' },
        { title: 'Departamentos', href: route('config.departments.index') },
        { title: `Editar: ${department.name}`, href: '#' },
    ];
    
    const initialData = {
        name: department.name,
        description: department.description,
    };
    
    return (
        <AuthenticatedLayout breadcrumbs={breadcrumbs}>
            <Head title={`Editar ${department.name}`} />

            <div className="py-12">
                <div className="w-full mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white sm:rounded-lg p-8">
                        <h3 className="text-xl font-bold mb-6 text-gray-800">Editar Departamento: {department.name}</h3>
                        <DepartmentForm 
                            initialData={initialData}
                            actionRoute={route('config.departments.update', department.id)}
                            method="put"
                            isEdit={true}
                        />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default DepartmentEdit;