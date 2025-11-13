import React from 'react';
import { Head, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/layouts/app-layout';
import InputError from '@/components/input-error';
import { AbsenceType } from '@/types/global';
import { type BreadcrumbItem } from '@/types';

interface AbsenceRequestCreateProps {
    absenceTypes: AbsenceType[];
}

const AbsenceRequestCreate: React.FC<AbsenceRequestCreateProps> = ({ absenceTypes }) => {
    
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Asistencias', href: route('attendance.index') },
        { title: 'Solicitar Ausencia', href: route('attendance.request.create') },
    ];
    
    const { data, setData, post, processing, errors } = useForm({
        absence_type_id: '',
        start_date: '',
        end_date: '',
        reason: '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('attendance.request.store'));
    };

    return (
        <AuthenticatedLayout breadcrumbs={breadcrumbs}>
            <Head title="Solicitar Ausencia" />

            <div className="py-12">
                <div className="w-full mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white sm:rounded-lg p-8">
                        <h3 className="text-2xl font-bold mb-6 text-gray-800">Solicitar Permiso o Vacaciones</h3>
                        <form onSubmit={submit} className="space-y-6">

                            <div>
                                <label htmlFor="absence_type_id" className="block text-sm font-medium text-gray-700">Tipo de Ausencia</label>
                                <select
                                    id="absence_type_id"
                                    value={data.absence_type_id}
                                    onChange={(e) => setData('absence_type_id', e.target.value)}
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                                >
                                    <option value="">Selecciona un tipo</option>
                                    {absenceTypes.map((type) => (
                                        <option key={type.id} value={type.id}>
                                            {type.name} ({type.is_paid ? 'Pagada' : 'No Pagada'})
                                        </option>
                                    ))}
                                </select>
                                <InputError message={errors.absence_type_id} className="mt-2" />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="start_date" className="block text-sm font-medium text-gray-700">Fecha de Inicio</label>
                                    <input
                                        id="start_date"
                                        type="date"
                                        value={data.start_date}
                                        onChange={(e) => setData('start_date', e.target.value)}
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                                    />
                                    <InputError message={errors.start_date} className="mt-2" />
                                </div>
                                <div>
                                    <label htmlFor="end_date" className="block text-sm font-medium text-gray-700">Fecha de Fin</label>
                                    <input
                                        id="end_date"
                                        type="date"
                                        value={data.end_date}
                                        onChange={(e) => setData('end_date', e.target.value)}
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                                    />
                                    <InputError message={errors.end_date} className="mt-2" />
                                </div>
                            </div>
                            
                            <div>
                                <label htmlFor="reason" className="block text-sm font-medium text-gray-700">Razón / Comentarios</label>
                                <textarea
                                    id="reason"
                                    value={data.reason}
                                    onChange={(e) => setData('reason', e.target.value)}
                                    rows={4}
                                    placeholder="Detalle la razón de su solicitud (ej: Vacaciones familiares, cita médica, etc.)"
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                                />
                                <InputError message={errors.reason} className="mt-2" />
                            </div>

                            <div className="flex justify-end pt-4 border-t">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className={`px-4 py-2 text-white font-semibold rounded-lg shadow-md transition duration-150 ${processing ? 'bg-gray-400' : 'bg-indigo-600 hover:bg-indigo-700'}`}
                                >
                                    {processing ? 'Enviando...' : 'Enviar Solicitud'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default AbsenceRequestCreate;