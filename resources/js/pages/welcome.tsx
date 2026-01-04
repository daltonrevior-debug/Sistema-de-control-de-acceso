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
<<<<<<< ours
        <>
            <Head title="Bienvenido">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <div className="flex min-h-screen flex-col items-center bg-[#FDFDFC] p-6 text-[#1b1b18] lg:justify-center lg:p-8 dark:bg-[#0a0a0a]">
                <header className="mb-6 w-full max-w-[335px] text-sm not-has-[nav]:hidden lg:max-w-4xl">
                    <nav className="flex items-center justify-end gap-4">
                        {auth.user ? (
                            <Link
                                href={route('dashboard')}
                                className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                            >
                                Inicio
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href={route('login')}
                                    className="inline-block rounded-sm border border-transparent px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#19140035] dark:text-[#EDEDEC] dark:hover:border-[#3E3E3A]"
                                >
                                    Iniciar sesión
                                </Link>
                                <Link
                                    href={route('register')}
                                    className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                                >
                                    Registrarse
                                </Link>
                            </>
                        )}
                    </nav>
                </header>
                <div className="flex w-full items-center justify-center opacity-100 transition-opacity duration-750 lg:grow starting:opacity-0">
                    <main className="flex w-full max-w-[335px] flex-col-reverse lg:max-w-4xl lg:flex-row">
                        <div className="flex-1 rounded-br-lg rounded-bl-lg bg-white p-6 pb-12 text-[13px] leading-[20px] shadow-[inset_0px_0px_0px_1px_rgba(26,26,0,0.16)] lg:rounded-tl-lg lg:rounded-br-none lg:p-20 dark:bg-[#161615] dark:text-[#EDEDEC] dark:shadow-[inset_0px_0px_0px_1px_#fffaed2d]">
                            <h1 className="mb-1 font-medium">Let's get started</h1>
                            <p className="mb-2 text-[#706f6c] dark:text-[#A1A09A]">
                                Laravel es calida brother
                                <br />
                                We suggest starting with the following.
                            </p>
                            <ul className="mb-4 flex flex-col lg:mb-6">
                                <li className="relative flex items-center gap-4 py-2 before:absolute before:top-1/2 before:bottom-0 before:left-[0.4rem] before:border-l before:border-[#e3e3e0] dark:before:border-[#3E3E3A]">
                                    <span className="relative bg-white py-1 dark:bg-[#161615]">
                                        <span className="flex h-3.5 w-3.5 items-center justify-center rounded-full border border-[#e3e3e0] bg-[#FDFDFC] shadow-[0px_0px_1px_0px_rgba(0,0,0,0.03),0px_1px_2px_0px_rgba(0,0,0,0.06)] dark:border-[#3E3E3A] dark:bg-[#161615]">
                                            <span className="h-1.5 w-1.5 rounded-full bg-[#dbdbd7] dark:bg-[#3E3E3A]" />
                                        </span>
                                    </span>
                                    <span>
                                        Read the
                                        <a
                                            href="https://laravel.com/docs"
                                            target="_blank"
                                            className="ml-1 inline-flex items-center space-x-1 font-medium text-[#f53003] underline underline-offset-4 dark:text-[#FF4433]"
                                        >
                                            <span>Documentation</span>
                                            <svg
                                                width={10}
                                                height={11}
                                                viewBox="0 0 10 11"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-2.5 w-2.5"
                                            >
                                                <path
                                                    d="M7.70833 6.95834V2.79167H3.54167M2.5 8L7.5 3.00001"
                                                    stroke="currentColor"
                                                    strokeLinecap="square"
                                                />
                                            </svg>
                                        </a>
                                    </span>
                                </li>
                                <li className="relative flex items-center gap-4 py-2 before:absolute before:top-0 before:bottom-1/2 before:left-[0.4rem] before:border-l before:border-[#e3e3e0] dark:before:border-[#3E3E3A]">
                                    <span className="relative bg-white py-1 dark:bg-[#161615]">
                                        <span className="flex h-3.5 w-3.5 items-center justify-center rounded-full border border-[#e3e3e0] bg-[#FDFDFC] shadow-[0px_0px_1px_0px_rgba(0,0,0,0.03),0px_1px_2px_0px_rgba(0,0,0,0.06)] dark:border-[#3E3E3A] dark:bg-[#161615]">
                                            <span className="h-1.5 w-1.5 rounded-full bg-[#dbdbd7] dark:bg-[#3E3E3A]" />
                                        </span>
                                    </span>
                                    <span>
                                        Watch video tutorials at
                                        <a
                                            href="https://laracasts.com"
                                            target="_blank"
                                            className="ml-1 inline-flex items-center space-x-1 font-medium text-[#f53003] underline underline-offset-4 dark:text-[#FF4433]"
                                        >
                                            <span>Laracasts</span>
                                            <svg
                                                width={10}
                                                height={11}
                                                viewBox="0 0 10 11"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-2.5 w-2.5"
                                            >
                                                <path
                                                    d="M7.70833 6.95834V2.79167H3.54167M2.5 8L7.5 3.00001"
                                                    stroke="currentColor"
                                                    strokeLinecap="square"
                                                />
                                            </svg>
                                        </a>
                                    </span>
                                </li>
                            </ul>
                            <ul className="flex gap-3 text-sm leading-normal">
                                <li>
                                    <a
                                        href="https://cloud.laravel.com"
                                        target="_blank"
                                        className="inline-block rounded-sm border border-black bg-[#1b1b18] px-5 py-1.5 text-sm leading-normal text-white hover:border-black hover:bg-black dark:border-[#eeeeec] dark:bg-[#eeeeec] dark:text-[#1C1C1A] dark:hover:border-white dark:hover:bg-white"
                                    >
                                        Deploy now
                                    </a>
                                </li>
                            </ul>
=======
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
>>>>>>> theirs
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