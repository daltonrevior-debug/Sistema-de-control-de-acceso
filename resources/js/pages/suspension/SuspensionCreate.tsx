import React, { FormEventHandler } from 'react';
import { Head, useForm, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/layouts/app-layout';
import { SuspensionFormProps } from '@/types/global';
import {
    User,
    Calendar,
    FileWarning,
    Save,
    ArrowLeft,
    AlertCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import InputError from '@/components/input-error';

const CreateSuspension: React.FC<SuspensionFormProps> = ({ employees }) => {

    const { data, setData, post, processing, errors } = useForm({
        employee_id: '',
        start_date: '',
        end_date: '',
        reason: ''
    });

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('personnel.suspensions.store'));
    };

    return (
        <AuthenticatedLayout breadcrumbs={[
            { title: 'Suspensiones', href: route('personnel.suspensions.index') },
            { title: 'Nueva', href: route('personnel.suspensions.create') }
        ]}>
            <Head title="Registrar Suspensión" />

            <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-3xl">

                <div className="mb-6">
                    <Link
                        href={route('personnel.suspensions.index')}
                        className="text-sm text-gray-500 hover:text-gray-900 flex items-center gap-1 mb-2 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" /> Volver al listado
                    </Link>
                    <h1 className="text-2xl font-bold text-gray-900">Registrar Medida Disciplinaria</h1>
                    <p className="text-gray-500 text-sm">Completa la información para procesar la suspensión del miliciano.</p>
                </div>

                <div className="bg-white rounded-2xl shadow-xl shadow-gray-200/40 border border-gray-100 overflow-hidden">

                    <div className="bg-red-50/50 border-b border-red-100 p-4 flex items-start gap-3">
                        <AlertCircle className="w-5 h-5 text-red-600 mt-0.5" />
                        <div className="text-sm text-red-800">
                            <span className="font-bold">Nota Importante:</span> La suspensión inhabilitará el acceso del miliciano al sistema de asistencia durante el periodo seleccionado.
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="p-8 space-y-6">

                        <div className="space-y-2">
                            <Label htmlFor="employee_id" className="flex items-center gap-2">
                                <User className="w-4 h-4 text-gray-400" /> Seleccionar Miliciano
                            </Label>
                            <div className="relative">
                                <select
                                    id="employee_id"
                                    value={data.employee_id}
                                    onChange={(e) => setData('employee_id', e.target.value)}
                                    className="w-full px-4 py-3 rounded-lg border border-gray-200 block shadow-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                                >
                                    <option value="">-- Seleccione del listado --</option>
                                    {employees.map((emp) => (
                                        <option key={emp.id} value={emp.id}>
                                            {emp.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <InputError message={errors.employee_id} />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="start_date" className="flex items-center gap-2">
                                    <Calendar className="w-4 h-4 text-gray-400" /> Fecha Inicio
                                </Label>
                                <Input
                                    id="start_date"
                                    type="date"
                                    value={data.start_date}
                                    onChange={(e) => setData('start_date', e.target.value)}
                                    className="w-full px-4 py-3 rounded-lg border border-gray-200 block shadow-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                                />
                                <InputError message={errors.start_date} />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="end_date" className="flex items-center gap-2">
                                    <Calendar className="w-4 h-4 text-gray-400" /> Fecha Fin
                                </Label>
                                <Input
                                    id="end_date"
                                    type="date"
                                    value={data.end_date}
                                    onChange={(e) => setData('end_date', e.target.value)}
                                    className="w-full px-4 py-3 rounded-lg border border-gray-200 block shadow-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                                    min={data.start_date}
                                />
                                <InputError message={errors.end_date} />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="reason" className="flex items-center gap-2">
                                <FileWarning className="w-4 h-4 text-gray-400" /> Motivo detallado
                            </Label>
                            <textarea
                                id="reason"
                                value={data.reason}
                                onChange={(e) => setData('reason', e.target.value)}
                                className="w-full min-h-[120px] resize-none px-4 py-3 rounded-lg border border-gray-200 block shadow-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                                placeholder="Describa la razón de la sanción o suspensión..."
                            />
                            <InputError message={errors.reason} />
                        </div>

                        <div className="pt-4 flex items-center justify-end gap-3">
                            <Link
                                href={route('personnel.suspensions.index')}
                                className="px-5 py-2.5 rounded-xl text-sm font-semibold text-gray-600 hover:bg-gray-100 transition-colors"
                            >
                                Cancelar
                            </Link>
                            <Button
                                type="submit"
                                disabled={processing}
                                className="h-11 px-6 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold shadow-lg shadow-red-100 transition-all active:scale-95"
                            >
                                {processing ? 'Procesando...' : (
                                    <span className="flex items-center gap-2">
                                        <Save className="w-4 h-4" /> Registrar Suspensión
                                    </span>
                                )}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default CreateSuspension;