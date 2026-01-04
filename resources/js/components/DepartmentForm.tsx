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
        <div className="bg-white shadow-sm border border-gray-200 rounded-xl p-8">
            <form onSubmit={submit} className="space-y-8">

                <div>
                    <div className="flex items-center gap-2 mb-6">
                        <div className="h-8 w-1 bg-indigo-600 rounded-full"></div>
                        <h3 className="text-xl font-semibold text-gray-800">Información del Departamento</h3>
                    </div>

                    <div className="space-y-6">

                        <div className="space-y-1">
                            <label htmlFor="name" className="text-sm font-semibold text-gray-700 ml-1">
                                Nombre del Departamento
                            </label>
                            <input
                                id="name"
                                type="text"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                placeholder="Ej. Recursos Humanos"
                                className={`block w-full px-4 py-3 rounded-lg border ${errors.name ? 'border-red-400' : 'border-gray-300'} focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 transition duration-200 outline-none`}
                            />
                            <InputError message={errors.name} className="mt-2 ml-1" />
                        </div>

                        <div className="space-y-1">
                            <label htmlFor="description" className="text-sm font-semibold text-gray-700 ml-1">
                                Descripción (Opcional)
                            </label>
                            <textarea
                                id="description"
                                value={data.description || ''}
                                onChange={(e) => setData('description', e.target.value)}
                                rows={4}
                                placeholder="Breve descripción de las funciones del área..."
                                className={`block w-full px-4 py-3 rounded-lg border ${errors.description ? 'border-red-400' : 'border-gray-300'} focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 transition duration-200 outline-none resize-none`}
                            />
                            <InputError message={errors.description} className="mt-2 ml-1" />
                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-end mt-10 pt-6 border-t border-gray-100 gap-4">
                    <Link
                        href={route('config.departments.index')}
                        className="px-6 py-3 text-sm font-medium text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition duration-200"
                    >
                        Cancelar
                    </Link>
                    <button
                        type="submit"
                        disabled={processing}
                        className={`px-8 py-3 text-white font-bold rounded-lg shadow-lg transform active:scale-95 transition duration-200 ${processing
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
                                Guardando...
                            </span>
                        ) : 'Guardar Departamento'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default DepartmentForm;