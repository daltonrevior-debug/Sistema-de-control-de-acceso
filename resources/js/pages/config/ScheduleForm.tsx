
import React from 'react';
import { Link, useForm } from '@inertiajs/react';
import InputError from '@/components/input-error';

type FormData = {
    name: string;
    start_time: string;
    end_time: string;
    tardy_tolerance_minutes: string | number;
    _method?: 'put'; 
};

interface ScheduleFormProps {
    initialData: FormData;
    actionRoute: string;
    method: 'post' | 'put';
    isEdit: boolean;
}

const ScheduleForm: React.FC<ScheduleFormProps> = ({ initialData, actionRoute, method, isEdit }) => {
    
    const initialFormState: FormData = isEdit ? { ...initialData, _method: 'put' } : initialData;
    
    const { data, setData, post, put, processing, errors } = useForm<FormData>(initialFormState);

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        
        if (method === 'post') {
            post(actionRoute);
        } else {
            put(actionRoute);
        }
    };

    return (
        <form onSubmit={submit} className="space-y-6">
            
            <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nombre del Horario</label>
                <input
                    id="name"
                    type="text"
                    value={data.name}
                    onChange={(e) => setData('name', e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                />
                <InputError message={errors.name} className="mt-2" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                <div>
                    <label htmlFor="start_time" className="block text-sm font-medium text-gray-700">Hora de Entrada (HH:mm)</label>
                    <input
                        id="start_time"
                        type="time"
                        value={data.start_time}
                        onChange={(e) => setData('start_time', e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                    />
                    <InputError message={errors.start_time} className="mt-2" />
                </div>
                
                <div>
                    <label htmlFor="end_time" className="block text-sm font-medium text-gray-700">Hora de Salida (HH:mm)</label>
                    <input
                        id="end_time"
                        type="time"
                        value={data.end_time}
                        onChange={(e) => setData('end_time', e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                    />
                    <InputError message={errors.end_time} className="mt-2" />
                </div>
                
                <div>
                    <label htmlFor="tardy_tolerance_minutes" className="block text-sm font-medium text-gray-700">Tolerancia de Tarde (minutos)</label>
                    <input
                        id="tardy_tolerance_minutes"
                        type="number"
                        value={data.tardy_tolerance_minutes}
                        onChange={(e) => setData('tardy_tolerance_minutes', e.target.value)}
                        min="0"
                        max="60"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                    />
                    <InputError message={errors.tardy_tolerance_minutes} className="mt-2" />
                </div>
            </div>

            <div className="flex items-center justify-end mt-8 border-t pt-4">
                <Link
                    href={route('config.schedules.index')}
                    className="text-gray-600 hover:text-gray-900 mr-4"
                >
                    Cancelar
                </Link>
                <button
                    type="submit"
                    disabled={processing}
                    className={`px-4 py-2 text-white font-semibold rounded-lg shadow-md transition duration-150 ${processing ? 'bg-gray-400' : 'bg-indigo-600 hover:bg-indigo-700'}`}
                >
                    {processing ? 'Guardando...' : 'Guardar Horario'}
                </button>
            </div>
        </form>
    );
};

export default ScheduleForm;