import React from 'react';
import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/layouts/app-layout';
import { PaginatedData, PageProps, AbsenceRequest } from '@/types/global';
import { type BreadcrumbItem } from '@/types';
import { Calendar, History, Info, ShieldCheck } from 'lucide-react';
import { formatDate } from '@/lib/utils';
import Pagination from '@/components/Pagination';

interface AbsenceRequestHistoryProps extends PageProps {
    requests: PaginatedData<AbsenceRequest>;
}

const AbsenceRequestHistory: React.FC<AbsenceRequestHistoryProps> = ({ requests }) => {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Asistencias', href: route('attendance.history') },
        { title: 'Historial de Ausencias', href: route('attendance.absence-history') },
    ];

    const getStatusStyles = (status: AbsenceRequest['status']) => {
        switch (status) {
            case 'approved': return 'bg-emerald-50 text-emerald-700 border-emerald-100 ring-emerald-500/10';
            case 'rejected': return 'bg-rose-50 text-rose-700 border-rose-100 ring-rose-500/10';
            default: return 'bg-amber-50 text-amber-700 border-amber-100 ring-amber-500/10';
        }
    };

    return (
        <AuthenticatedLayout breadcrumbs={breadcrumbs}>
            <Head title="Historial de Ausencias" />

            <div className="max-w-7xl py-8 px-4 sm:px-6 lg:px-8 space-y-6">

                <div>
                    <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                        <History className="w-8 h-8 text-indigo-600" />
                        Historial de Ausencias
                    </h1>
                    <p className="text-gray-500 text-sm mt-1">Registro completo de todas las solicitudes procesadas y sus resoluciones.</p>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200 text-left">
                            <thead>
                                <tr className="bg-gray-50/50">
                                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Miliciano</th>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Tipo / Periodo</th>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Estado</th>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Autorizado por</th>
                                    <th className="px-6 py-4 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">Detalles</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-100">
                                {requests.data.length > 0 ? (
                                    requests.data.map((request) => (
                                        <tr key={request.id} className="hover:bg-gray-50/50 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="h-9 w-9 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 font-bold text-xs border border-gray-200">
                                                        {request.employee?.first_name.charAt(0)}{request.employee?.last_name.charAt(0)}
                                                    </div>
                                                    <div>
                                                        <div className="text-sm font-bold text-gray-900">{request.employee?.first_name} {request.employee?.last_name}</div>
                                                        <div className="text-[10px] text-gray-400 font-mono tracking-tighter">REF: {request.id}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="text-sm font-semibold text-gray-800">{request.absence_type?.name}</div>
                                                <div className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                                                    <Calendar className="w-3 h-3" />
                                                    {formatDate(request.start_date)} - {formatDate(request.end_date)}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold border ring-1 ${getStatusStyles(request.status)}`}>
                                                    {request.status === 'pending' ? 'Pendiente' : request.status === 'approved' ? 'Aprobado' : 'Rechazado'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2 text-sm text-gray-600 font-medium">
                                                    <ShieldCheck className="w-4 h-4 text-indigo-400" />
                                                    {request.approver?.name || (request.status === 'pending' ? 'En espera' : 'Sistema')}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <button
                                                    onClick={() => alert(`Razón: ${request.reason}\n\n${request.status === 'rejected' && request.rejection_reason ? 'Rechazo: ' + request.rejection_reason : ''}`)}
                                                    className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all"
                                                >
                                                    <Info className="w-5 h-5" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={5} className="px-6 py-12 text-center text-gray-400 text-sm">No se encontraron registros en el historial.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                    <div className="p-4 border-t border-gray-100 bg-gray-50/50">
                        <Pagination links={requests.links} />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default AbsenceRequestHistory;