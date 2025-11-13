import React from 'react';
import { Link, useForm } from '@inertiajs/react';
import InputError from '@/components/input-error'; 
import { AbsenceType } from '@/types/global';

type FormData = Omit<AbsenceType, 'id' | 'created_at' | 'updated_at'> & { _method?: 'put' };

interface AbsenceTypeFormProps {
    initialData: FormData;
    actionRoute: string;
    method: 'post' | 'put';
    isEdit: boolean;
}

const AbsenceTypeForm: React.FC<AbsenceTypeFormProps> = ({ initialData, actionRoute, method, isEdit }) => {
    
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
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nombre del Tipo de Ausencia</label>
                <input
                    id="name"
                    type="text"
                    value={data.name}
                    onChange={(e) => setData('name', e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                />
                <InputError message={errors.name} className="mt-2" />
            </div>

            <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">Descripción (Opcional)</label>
                <textarea
                    id="description"
                    value={data.description || ''}
                    onChange={(e) => setData('description', e.target.value)}
                    rows={3}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                />
                <InputError message={errors.description} className="mt-2" />
            </div>
            
            <div className="flex items-center">
                <input
                    id="is_paid"
                    type="checkbox"
                    checked={data.is_paid}
                    onChange={(e) => setData('is_paid', e.target.checked)}
                    className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                />
                <label htmlFor="is_paid" className="ml-2 block text-sm font-medium text-gray-700">
                    ¿Es una ausencia pagada?
                </label>
            </div>
            <InputError message={errors.is_paid} className="mt-2" />
            
            <div className="flex items-center justify-end mt-8 border-t pt-4">
                <Link href={route('config.absence-types.index')} className="text-gray-600 hover:text-gray-900 mr-4">Cancelar</Link>
                <button
                    type="submit"
                    disabled={processing}
                    className={`px-4 py-2 text-white font-semibold rounded-lg shadow-md transition duration-150 ${processing ? 'bg-gray-400' : 'bg-indigo-600 hover:bg-indigo-700'}`}
                >
                    {processing ? 'Guardando...' : 'Guardar Tipo'}
                </button>
            </div>
        </form>
    );
};

export default AbsenceTypeForm;