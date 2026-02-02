import React, { FormEventHandler } from 'react';
import { Head, useForm, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/layouts/app-layout';
import { SuspensionFormProps } from '@/types/global';
import { User, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import InputError from '@/components/input-error';

const EditSuspension: React.FC<SuspensionFormProps> = ({ employees, suspension }) => {

    const { data, setData, put, processing, errors } = useForm({
        employee_id: suspension?.employee_id || '',
        start_date: suspension?.start_date || '',
        end_date: suspension?.end_date || '',
        reason: suspension?.reason || ''
    });

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        if (suspension) {
            put(route('personnel.suspensions.update', suspension.id));
        }
    };

    return (
        <AuthenticatedLayout breadcrumbs={[
            { title: 'Suspensiones', href: route('personnel.suspensions.index') },
            { title: 'Editar', href: '' }
        ]}>
            <Head title="Editar Suspensión" />

            <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-3xl">

                <div className="mb-6 flex justify-between items-end">
                    <div>
                        <Link
                            href={route('personnel.suspensions.index')}
                            className="text-sm text-gray-500 hover:text-gray-900 flex items-center gap-1 mb-2 transition-colors"
                        >
                            <ArrowLeft className="w-4 h-4" /> Volver
                        </Link>
                        <h1 className="text-2xl font-bold text-gray-900">Editar Suspensión</h1>
                    </div>
                </div>

                <div className="bg-white rounded-2xl shadow-xl shadow-gray-200/40 border border-gray-100 overflow-hidden">
                    <form onSubmit={handleSubmit} className="p-8 space-y-6">

                        <div className="space-y-2">
                            <Label htmlFor="employee_id" className="flex items-center gap-2">
                                <User className="w-4 h-4 text-gray-400" /> Empleado (No editable)
                            </Label>

                            <select
                                disabled
                                value={data.employee_id}
                                className="w-full px-4 py-3 rounded-lg border border-gray-200 block shadow-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 cursor-not-allowed"
                            >
                                {employees.map((emp) => (
                                    <option key={emp.id} value={emp.id}>{emp.name}</option>
                                ))}
                            </select>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="start_date">Fecha Inicio</Label>
                                <Input
                                    type="date"
                                    value={data.start_date}
                                    onChange={(e) => setData('start_date', e.target.value)}
                                    className="h-11 rounded-xl focus:ring-indigo-500"
                                />
                                <InputError message={errors.start_date} />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="end_date">Fecha Fin</Label>
                                <Input
                                    type="date"
                                    value={data.end_date}
                                    onChange={(e) => setData('end_date', e.target.value)}
                                    className="h-11 rounded-xl focus:ring-indigo-500"
                                    min={data.start_date}
                                />
                                <InputError message={errors.end_date} />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="reason">Motivo</Label>
                            <textarea
                                value={data.reason}
                                onChange={(e) => setData('reason', e.target.value)}
                                className="w-full min-h-[120px] resize-none px-4 py-3 rounded-lg border border-gray-200 block shadow-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                            />
                            <InputError message={errors.reason} />
                        </div>

                        <div className="pt-4 flex items-center justify-end gap-3">
                            <Link
                                href={route('personnel.suspensions.index')}
                                className="px-5 py-2.5 rounded-xl text-sm font-semibold text-gray-600 hover:bg-gray-100"
                            >
                                Cancelar
                            </Link>
                            <Button
                                type="submit"
                                disabled={processing}
                                className="h-11 px-6 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold shadow-lg shadow-indigo-100"
                            >
                                {processing ? 'Guardando...' : 'Actualizar Cambios'}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default EditSuspension;