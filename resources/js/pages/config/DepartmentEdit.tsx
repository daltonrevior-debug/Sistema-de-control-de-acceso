import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/layouts/app-layout';
import DepartmentForm from '@/components/DepartmentForm';
import { Department } from '@/types/global';
import { type BreadcrumbItem } from '@/types';
import { ArrowLeft, Edit3 } from 'lucide-react';

interface DepartmentEditProps {
    department: Department;
}

const DepartmentEdit: React.FC<DepartmentEditProps> = ({ department }) => {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Configuración', href: route('config.departments.index') },
        { title: 'Dependencias', href: route('config.departments.index') },
        { title: 'Editar', href: '#' },
    ];

    const initialData = {
        name: department.name,
        description: department.description,
    };

    return (
        <AuthenticatedLayout breadcrumbs={breadcrumbs}>
            <Head title={`Editar ${department.name}`} />

            <div className="max-w-3xl py-10 px-4 sm:px-6 lg:px-8">

                <Link
                    href={route('config.departments.index')}
                    className="inline-flex items-center text-sm text-gray-500 hover:text-indigo-600 transition-colors mb-6 group"
                >
                    <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                    Cancelar y regresar
                </Link>

                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">

                    <div className="px-8 py-6 border-b border-gray-50 bg-gray-50/50">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-amber-500 rounded-xl text-white shadow-lg shadow-amber-100">
                                <Edit3 className="w-6 h-6" />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-gray-900">Editar Dependencia</h2>
                                <p className="text-sm text-gray-500 font-medium">
                                    Modificando: <span className="text-indigo-600">{department.name}</span>
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="p-8">
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