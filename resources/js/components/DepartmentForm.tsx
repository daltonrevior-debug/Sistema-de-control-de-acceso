import React from 'react';
import { Link, useForm } from '@inertiajs/react';
import InputError from '@/components/input-error';
import { Department } from '@/types/global';

type FormData = Omit<Department, 'id' | 'created_at' | 'updated_at' | 'manager_id' | 'manager'> & { _method?: 'put' };

interface DepartmentFormProps {
    initialData: FormData;
    actionRoute: string;
    method: 'post' | 'put';
    isEdit: boolean;
}

const DepartmentForm: React.FC<DepartmentFormProps> = ({ initialData, actionRoute, method, isEdit }) => {
    
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
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nombre del Departamento</label>
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
                        
            <div className="flex items-center justify-end mt-8 border-t pt-4">
                <Link href={route('config.departments.index')} className="text-gray-600 hover:text-gray-900 mr-4">Cancelar</Link>
                <button
                    type="submit"
                    disabled={processing}
                    className={`px-4 py-2 text-white font-semibold rounded-lg shadow-md transition duration-150 ${processing ? 'bg-gray-400' : 'bg-indigo-600 hover:bg-indigo-700'}`}
                >
                    {processing ? 'Guardando...' : 'Guardar Departamento'}
                </button>
            </div>
        </form>
    );
};

export default DepartmentForm;