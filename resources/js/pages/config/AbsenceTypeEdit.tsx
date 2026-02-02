import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/layouts/app-layout';
import AbsenceTypeForm from '@/components/AbsenceTypeForm';
import { AbsenceType } from '@/types/global';
import { type BreadcrumbItem } from '@/types';
import { ArrowLeft, Settings2 } from 'lucide-react';

interface AbsenceTypeEditProps {
    type: AbsenceType;
}

const AbsenceTypeEdit: React.FC<AbsenceTypeEditProps> = ({ type }) => {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Configuración', href: route('config.absence-types.index') },
        { title: 'Tipos de Ausencia', href: route('config.absence-types.index') },
        { title: 'Editar', href: '#' },
    ];

    const initialData = {
        name: type.name,
        description: type.description,
        is_paid: type.is_paid,
    };

    return (
        <AuthenticatedLayout breadcrumbs={breadcrumbs}>
            <Head title={`Editar ${type.name}`} />

            <div className="max-w-3xl py-10 px-4 sm:px-6 lg:px-8">

                <Link
                    href={route('config.absence-types.index')}
                    className="inline-flex items-center text-sm text-gray-500 hover:text-indigo-600 transition-colors mb-6 group"
                >
                    <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                    Cancelar y regresar
                </Link>

                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">

                    <div className="px-8 py-6 border-b border-gray-50 bg-gray-50/50">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-amber-500 rounded-xl text-white shadow-lg shadow-amber-100">
                                <Settings2 className="w-6 h-6" />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-gray-900">Editar Configuración</h2>
                                <p className="text-sm text-gray-500 font-medium">
                                    Modificando categoría: <span className="text-amber-600 font-bold">{type.name}</span>
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="p-8">
                        <AbsenceTypeForm
                            initialData={initialData}
                            actionRoute={route('config.absence-types.update', type.id)}
                            method="put"
                            isEdit={true}
                        />
                    </div>
                </div>

                <p className="text-center text-[11px] text-gray-400 mt-6 italic">
                    Última actualización: {new Date().toLocaleDateString()}
                </p>
            </div>
        </AuthenticatedLayout>
    );
};

export default AbsenceTypeEdit;