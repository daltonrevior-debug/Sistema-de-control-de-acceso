import React from 'react'
import { Head } from '@inertiajs/react';
import Toast from '@/components/Toast';

const ScreenLayout = <P extends object>(Component: React.ComponentType<P>) => {
    return function WrappedComponent(props: P) {
        return (
            <div className="relative min-h-screen bg-[#f8fafc] flex flex-col items-center justify-center selection:bg-indigo-500 selection:text-white font-sans">

                <div className="absolute inset-0 bg-contain opacity-50 bg-[url('/Fondo.png')]">
                </div>

                <Head title="Bienvenido" />

                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-indigo-100/40 blur-[100px]"></div>
                    <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] rounded-full bg-blue-100/40 blur-[100px]"></div>
                </div>

                <div className="relative w-full max-w-4xl px-6 py-12 lg:px-8 flex flex-col items-center">

                    <div className="relative mb-10 p-5 w-full border-gray-100 flex items-center justify-around">

                        <div className="absolute left-4/5 w-40 h-40 inset-0 bg-contain bg-center bg-[url('/EscudoREDI.png')]">
                        </div>

                        <div className="absolute right-2/5 w-40 h-40 inset-0 bg-contain bg-center bg-[url('/EscudoMilicia.png')]">
                        </div>

                    </div>

                    <div className="text-center mb-16 space-y-6 max-w-2xl">
                        <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 tracking-tight">
                            <span className="text-indigo-600">CAPRECEN</span>
                        </h1>
                        <p className="text-xl text-gray-600 leading-relaxed">
                            Sistema de Control de Acceso del Personal de la REDI Central.
                        </p>
                    </div>

                    <div className="w-full max-w-4xl px-6 py-12 lg:px-8 flex flex-col items-center">
                        <Component {...props} />
                    </div>

                </div>

                <Toast />

                <div className="mt-auto py-10 text-gray-400 text-sm">
                    © {new Date().getFullYear()} — <span className="font-semibold text-gray-500">Control de Asistencias</span>. Tu gestión de personal simplificada.
                </div>
            </div>
        )
    }
}

export default ScreenLayout