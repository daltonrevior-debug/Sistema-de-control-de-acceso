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

            <div className="py-12 min-h-screen">
                <div className="max-w-4xl sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-extrabold text-gray-900 mb-8">Solicitar Ausencia</h2>
                    <div className="bg-white shadow-sm border border-gray-200 rounded-xl p-8">

                        <div className="flex items-center gap-3 mb-8 pb-4 border-b border-gray-100">
                            <div className="p-2 bg-indigo-600 rounded-lg">
                                <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold text-gray-800">Solicitar Permiso o Vacaciones</h3>
                        </div>

                        <form onSubmit={submit} className="space-y-8">

                            <div className="space-y-1">
                                <label htmlFor="absence_type_id" className="text-sm font-semibold text-gray-700 ml-1">
                                    Tipo de Ausencia
                                </label>
                                <select
                                    id="absence_type_id"
                                    value={data.absence_type_id}
                                    onChange={(e) => setData('absence_type_id', e.target.value)}
                                    className={`block w-full px-4 py-3 rounded-lg border ${errors.absence_type_id ? 'border-red-400' : 'border-gray-300'} focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 transition duration-200 outline-none bg-white`}
                                >
                                    <option value="">Selecciona un tipo</option>
                                    {absenceTypes.map((type) => (
                                        <option key={type.id} value={type.id}>
                                            {type.name} ({type.is_paid ? 'Pagada' : 'No Pagada'})
                                        </option>
                                    ))}
                                </select>
                                <InputError message={errors.absence_type_id} className="mt-2 ml-1" />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-1">
                                    <label htmlFor="start_date" className="text-sm font-semibold text-gray-700 ml-1">
                                        Fecha de Inicio
                                    </label>
                                    <input
                                        id="start_date"
                                        type="date"
                                        value={data.start_date}
                                        onChange={(e) => setData('start_date', e.target.value)}
                                        className={`block w-full px-4 py-3 rounded-lg border ${errors.start_date ? 'border-red-400' : 'border-gray-300'} focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 transition duration-200 outline-none`}
                                    />
                                    <InputError message={errors.start_date} className="mt-2 ml-1" />
                                </div>

                                <div className="space-y-1">
                                    <label htmlFor="end_date" className="text-sm font-semibold text-gray-700 ml-1">
                                        Fecha de Fin
                                    </label>
                                    <input
                                        id="end_date"
                                        type="date"
                                        value={data.end_date}
                                        onChange={(e) => setData('end_date', e.target.value)}
                                        className={`block w-full px-4 py-3 rounded-lg border ${errors.end_date ? 'border-red-400' : 'border-gray-300'} focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 transition duration-200 outline-none`}
                                    />
                                    <InputError message={errors.end_date} className="mt-2 ml-1" />
                                </div>
                            </div>

                            <div className="space-y-1">
                                <label htmlFor="reason" className="text-sm font-semibold text-gray-700 ml-1">
                                    Razón / Comentarios
                                </label>
                                <textarea
                                    id="reason"
                                    value={data.reason}
                                    onChange={(e) => setData('reason', e.target.value)}
                                    rows={4}
                                    placeholder="Detalle la razón de su solicitud (ej: Vacaciones familiares, cita médica, etc.)"
                                    className={`block w-full px-4 py-3 rounded-lg border ${errors.reason ? 'border-red-400' : 'border-gray-300'} focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 transition duration-200 outline-none resize-none`}
                                />
                                <InputError message={errors.reason} className="mt-2 ml-1" />
                            </div>

                            <div className="flex items-center justify-end mt-10 pt-6 border-t border-gray-100 gap-4">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className={`px-10 py-3 text-white font-bold rounded-lg shadow-lg transform active:scale-95 transition duration-200 ${processing
                                        ? 'bg-gray-400 cursor-not-allowed'
                                        : 'bg-indigo-600 hover:bg-indigo-700 hover:shadow-indigo-100'
                                        }`}
                                >
                                    {processing ? (
                                        <span className="flex items-center gap-2">
                                            <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Enviando...
                                        </span>
                                    ) : 'Enviar Solicitud'}
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