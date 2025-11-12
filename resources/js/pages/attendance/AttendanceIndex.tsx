import React from 'react';
import { Head, router, usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';

interface AttendanceData {
    id: number;
    check_in_at: string; // ISO 8601 string date
    check_out_at: string | null;
}

interface AttendanceIndexProps {
    todayAttendance: AttendanceData | null; 
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Personal',
        href: '/dashboard',
    },
        {
        title: 'Asistencias',
        href: '/dashboard',
    }
];

const AttendanceIndex: React.FC<AttendanceIndexProps> = ({ todayAttendance }) => {
    
    // Acceder a los mensajes flash para mostrar notificaciones
    const { flash } = usePage().props as unknown as { flash: { success: string, error: string } };

    // Indica si el empleado ya marcó entrada hoy y aún no ha salido
    const isClockedIn = !!todayAttendance && todayAttendance.check_out_at === null;

    // Función para formatear la hora
    const formatTime = (isoString: string) => {
        return new Date(isoString).toLocaleTimeString('es-ES', { 
            hour: '2-digit', 
            minute: '2-digit', 
            hour12: true 
        });
    };

    const handleCheckIn = () => {
        router.post(route('attendance.check.in'));
    };

    const handleCheckOut = () => {
        router.post(route('attendance.check.out'));
    };

    return (
        <AuthenticatedLayout breadcrumbs={breadcrumbs}>
            <Head title="Asistencia" />

            <div className="py-12">
                <div className="max-w-xl mx-auto sm:px-6 lg:px-8">

                    {flash.success && (
                        <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-4" role="alert">
                            <p>{flash.success}</p>
                        </div>
                    )}
                    {flash.error && (
                        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4" role="alert">
                            <p>{flash.error}</p>
                        </div>
                    )}
                    
                    <div className="bg-white shadow-xl sm:rounded-lg p-8 text-center">
                        <h3 className="text-2xl font-bold mb-8">Marcaje del Día</h3>

                        <div className="mb-8 p-6 rounded-xl border-2 shadow-inner">
                            {todayAttendance ? (
                                <>
                                    <p className="text-sm font-medium text-gray-500">Última Entrada Registrada:</p>
                                    <p className="text-4xl font-extrabold text-green-700 mb-4">
                                        {formatTime(todayAttendance.check_in_at)}
                                    </p>
                                    
                                    {isClockedIn ? (
                                        <p className="text-xl font-bold text-red-600">
                                            TRABAJANDO
                                        </p>
                                    ) : (
                                        <p className="text-xl font-bold text-blue-600">
                                            JORNADA FINALIZADA
                                        </p>
                                    )}
                                </>
                            ) : (
                                <p className="text-xl font-bold text-yellow-600">
                                    PENDIENTE DE MARCAR ENTRADA
                                </p>
                            )}
                        </div>

                        <div className="flex justify-center space-x-4">

                            <button
                                onClick={handleCheckIn}
                                disabled={isClockedIn}
                                className={`px-6 py-3 font-semibold rounded-lg shadow-md transition duration-150 w-full ${
                                    isClockedIn ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700 text-white'
                                }`}
                            >
                                Marcar Entrada
                            </button>

                            <button
                                onClick={handleCheckOut}
                                disabled={!isClockedIn}
                                className={`px-6 py-3 font-semibold rounded-lg shadow-md transition duration-150 w-full ${
                                    !isClockedIn ? 'bg-gray-400 cursor-not-allowed' : 'bg-red-600 hover:bg-red-700 text-white'
                                }`}
                            >
                                Marcar Salida
                            </button>
                        </div>
                        
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default AttendanceIndex;