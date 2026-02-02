import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/layouts/app-layout';
import DepartmentForm from '@/components/DepartmentForm';
import { type BreadcrumbItem } from '@/types';
import { ArrowLeft, PlusCircle } from 'lucide-react';

const DepartmentCreate: React.FC = () => {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Configuración', href: route('config.departments.index') },
        { title: 'Dependencias', href: route('config.departments.index') },
        { title: 'Nueva', href: '#' },
    ];

    const initialData = {
        name: '',
        description: '',
    };

    return (
        <AuthenticatedLayout breadcrumbs={breadcrumbs}>
            <Head title="Crear Dependencia" />

            <div className="max-w-3xl py-10 px-4 sm:px-6 lg:px-8">

                <Link
                    href={route('config.departments.index')}
                    className="inline-flex items-center text-sm text-gray-500 hover:text-indigo-600 transition-colors mb-6 group"
                >
                    <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                    Volver al listado
                </Link>

                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">

                    <div className="px-8 py-6 border-b border-gray-50 bg-gray-50/50">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-indigo-600 rounded-xl text-white shadow-lg shadow-indigo-100">
                                <PlusCircle className="w-6 h-6" />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-gray-900">Nueva Dependencia</h2>
                                <p className="text-sm text-gray-500">Registra una nueva unidad organizativa en el sistema.</p>
                            </div>
                        </div>
                    </div>

                    <div className="p-8">
                        <DepartmentForm
                            initialData={initialData}
                            actionRoute={route('config.departments.store')}
                            method="post"
                            isEdit={false}
                        />
                    </div>
                </div>
                
                <p className="text-center text-xs text-gray-400 mt-6">
                    Asegúrese de que el nombre de la dependencia sea único para evitar confusiones administrativas.
                </p>
            </div>
        </AuthenticatedLayout>
    );
};

export default DepartmentCreate;