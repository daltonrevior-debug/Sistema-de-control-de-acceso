import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/layouts/app-layout';
import AbsenceTypeForm from '@/components/AbsenceTypeForm';
import { type BreadcrumbItem } from '@/types';
import { CalendarPlus, ArrowLeft, ClipboardList } from 'lucide-react';

const AbsenceTypeCreate: React.FC = () => {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Configuración', href: route('config.absence-types.index') },
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

            <div className="max-w-3xl py-10 px-4 sm:px-6 lg:px-8">

                <Link
                    href={route('config.absence-types.index')}
                    className="inline-flex items-center text-sm text-gray-500 hover:text-indigo-600 transition-colors mb-6 group"
                >
                    <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                    Volver al listado
                </Link>

                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">

                    <div className="px-8 py-6 border-b border-gray-50 bg-gray-50/50">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-indigo-600 rounded-xl text-white shadow-lg shadow-indigo-100">
                                <CalendarPlus className="w-6 h-6" />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-gray-900">Nuevo Tipo de Ausencia</h2>
                                <p className="text-sm text-gray-500">Define una nueva categoría para permisos y justificaciones.</p>
                            </div>
                        </div>
                    </div>

                    <div className="p-8">
                        <AbsenceTypeForm
                            initialData={initialData}
                            actionRoute={route('config.absence-types.store')}
                            method="post"
                            isEdit={false}
                        />
                    </div>
                </div>

                <div className="mt-8 p-4 bg-indigo-50/50 rounded-xl border border-indigo-100 flex gap-3 items-start">
                    <ClipboardList className="w-5 h-5 text-indigo-500 mt-0.5" />
                    <p className="text-xs text-indigo-700 leading-relaxed">
                        <strong>Nota:</strong> Al crear un tipo de ausencia, especifique claramente si es remunerada. Esto afectará los cálculos automáticos en los reportes de nómina y asistencia.
                    </p>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default AbsenceTypeCreate;