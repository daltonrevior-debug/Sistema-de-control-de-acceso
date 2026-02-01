import { Head, useForm, Link } from '@inertiajs/react';
import { LoaderCircle, Eye, EyeOff, Mail, Lock, AlertCircle, ArrowLeft } from 'lucide-react';
import { FormEventHandler, useState } from 'react';

import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import ScreenLayout from '../HOC';

type LoginForm = {
    email: string;
    password: string;
    remember: boolean;
};

interface LoginProps {
    status?: string;
    canResetPassword: boolean;
}

const Login = ({ status, canResetPassword }: LoginProps) => {
    const [showPassword, setShowPassword] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm<LoginForm>({
        email: '',
        password: '',
        remember: false,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
            preserveScroll: true,
        });
    };

    return (
        <>
            <Head title="Iniciar sesión" />

            <div className="mx-auto w-full max-w-md overflow-hidden rounded-2xl border border-gray-100 bg-white p-8 shadow-xl shadow-gray-200/50">
                <div className="mb-8 text-center">
                    <h2 className="text-2xl font-bold text-gray-900">Bienvenido</h2>
                    <p className="text-sm text-gray-500">Ingresa tus credenciales para acceder</p>
                </div>

                {(errors.email || errors.password) && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-xl flex items-center gap-3 text-red-800 text-sm animate-in fade-in slide-in-from-top-2">
                        <AlertCircle className="w-5 h-5 text-red-500" />
                        <p>{errors.email || errors.password}</p>
                    </div>
                )}

                <form onSubmit={submit} className="space-y-5">
                    <div className="space-y-2">
                        <Label htmlFor="email" className="text-sm font-semibold text-gray-700">Correo electrónico</Label>
                        <div className="relative group">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-indigo-500 transition-colors" />
                            <Input
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                className="pl-10 h-11 rounded-xl border-gray-200 focus:ring-indigo-500 focus:border-indigo-500"
                                autoComplete="username"
                                onChange={(e) => setData('email', e.target.value)}
                                placeholder="correo@ejemplo.com"
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <Label htmlFor="password" text-sm font-semibold text-gray-700>Contraseña</Label>
                        </div>
                        <div className="relative group">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-indigo-500 transition-colors" />
                            <Input
                                id="password"
                                type={showPassword ? 'text' : 'password'}
                                name="password"
                                value={data.password}
                                className="pl-10 pr-10 h-11 rounded-xl border-gray-200 focus:ring-indigo-500 focus:border-indigo-500"
                                autoComplete="current-password"
                                onChange={(e) => setData('password', e.target.value)}
                                placeholder="••••••••"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                            >
                                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </button>
                        </div>
                    </div>

                    <div className="flex items-center space-x-2 py-2">
                        <Checkbox
                            id="remember"
                            checked={data.remember}
                            onCheckedChange={(checked) => setData('remember', checked as boolean)}
                        />
                        <Label htmlFor="remember" className="text-sm font-medium text-gray-600 cursor-pointer">
                            Mantener sesión iniciada
                        </Label>
                    </div>

                    <Button
                        type="submit"
                        className="w-full h-12 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold text-base shadow-lg shadow-indigo-100 transition-all active:scale-[0.98]"
                        disabled={processing}
                    >
                        {processing ? (
                            <LoaderCircle className="mr-2 h-5 w-5 animate-spin" />
                        ) : (
                            'Entrar al Sistema'
                        )}
                    </Button>
                </form>

                <div className="mt-3 flex items-center justify-between">
                    <div>
                        <Link
                            href={route('home')}
                            className="group flex items-center text-sm font-medium text-gray-500 hover:text-indigo-600 transition-colors"
                        >
                            <ArrowLeft className="mr-2 w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                            Volver al Inicio
                        </Link>
                    </div>
                </div>
            </div>

            {status && (
                <div className="mt-6 text-center text-sm font-medium text-emerald-600 bg-emerald-50 p-4 rounded-xl border border-emerald-100 max-w-md mx-auto">
                    {status}
                </div>
            )}
        </>
    );
}

export default ScreenLayout(Login);