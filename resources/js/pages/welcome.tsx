import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { LogIn, QrCode, ShieldCheck } from 'lucide-react';

interface WelcomeProps {
    auth?: {
        user: any;
    };
    [key: string]: any;
}

const Welcome: React.FC<WelcomeProps> = ({ auth }) => {
    return (
        <div className="min-h-screen bg-[#f8fafc] flex flex-col items-center justify-center selection:bg-indigo-500 selection:text-white font-sans">
            <Head title="Bienvenido" />

            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-indigo-100/40 blur-[100px]"></div>
                <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] rounded-full bg-blue-100/40 blur-[100px]"></div>
            </div>

            <div className="relative w-full max-w-4xl px-6 py-12 lg:px-8 flex flex-col items-center">

                <div className="mb-10 p-5 bg-white rounded-3xl shadow-sm border border-gray-100 flex items-center justify-center">
                    <ShieldCheck className="w-14 h-14 text-indigo-600" />
                </div>

                <div className="text-center mb-16 space-y-6 max-w-2xl">
                    <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 tracking-tight">
                        Sistema de Gestión <span className="text-indigo-600">RRHH</span>
                    </h1>
                    <p className="text-xl text-gray-600 leading-relaxed">
                        Control de asistencia y gestión de personal.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-3xl">

                    <Link
                        href={route('login')}
                        className="group relative flex flex-col items-start p-8 bg-white border border-gray-200 rounded-[2rem] shadow-sm hover:shadow-2xl hover:border-indigo-300 transition-all duration-500 transform hover:-translate-y-2"
                    >
                        <div className="p-4 bg-indigo-50 text-indigo-600 rounded-2xl group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-500 mb-6">
                            <LogIn className="w-8 h-8" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-3">Acceder al Sistema</h3>
                        <p className="text-base text-gray-500 mb-8 leading-relaxed">
                            Ingresa con tus credenciales para administrar el personal, configurar horarios y generar reportes detallados.
                        </p>
                        <div className="mt-auto w-full flex items-center justify-between">
                            <span className="text-indigo-600 font-bold text-lg">Iniciar Sesión</span>
                            <span className="text-indigo-600 transform group-hover:translate-x-2 transition-transform duration-300">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                </svg>
                            </span>
                        </div>
                    </Link>

                    <Link
                        href={route('public.attendance.scanner')}
                        className="group relative flex flex-col items-start p-8 bg-white border border-gray-200 rounded-[2rem] shadow-sm hover:shadow-2xl hover:border-rose-300 transition-all duration-500 transform hover:-translate-y-2"
                    >
                        <div className="p-4 bg-rose-50 text-rose-600 rounded-2xl group-hover:bg-rose-600 group-hover:text-white transition-colors duration-500 mb-6">
                            <QrCode className="w-8 h-8" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-3">Acceder al Scan</h3>
                        <p className="text-base text-gray-500 mb-8 leading-relaxed">
                            Módulo de marcaje rápido mediante código QR
                        </p>
                        <div className="mt-auto w-full flex items-center justify-between">
                            <span className="text-rose-600 font-bold text-lg">Escanear QR</span>
                            <span className="text-rose-600 transform group-hover:translate-x-2 transition-transform duration-300">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                </svg>
                            </span>
                        </div>
                    </Link>
                </div>

                <div className="mt-20 flex flex-wrap justify-center gap-10 text-gray-500 font-medium">
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-indigo-500"></div>
                        <span>Control en Tiempo Real</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-rose-500"></div>
                        <span>Marcaje Instantáneo</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-green-500"></div>
                        <span>Reportes Automatizados</span>
                    </div>
                </div>

            </div>

            <div className="mt-auto py-10 text-gray-400 text-sm">
                © {new Date().getFullYear()} — <span className="font-semibold text-gray-500">Control de Asistencias</span>. Tu gestión de personal simplificada.
            </div>
        </div>
    );
};

export default Welcome;