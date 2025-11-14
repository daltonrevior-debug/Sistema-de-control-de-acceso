import React from 'react';
import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/layouts/app-layout';
import { PaginatedData, PageProps, AbsenceRequest } from '@/types/global';
import { type BreadcrumbItem } from '@/types';
import { Calendar, Handshake, Info } from 'lucide-react';

interface AbsenceRequestHistoryProps extends PageProps {
    requests: PaginatedData<AbsenceRequest>; 
}

const AbsenceRequestHistory: React.FC<AbsenceRequestHistoryProps> = ({ requests }) => {
    
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Asistencias', href: route('attendance.index') },
        { title: 'Historial de Ausencias', href: route('attendance.absence-history') },
    ];

    const getStatusStyles = (status: AbsenceRequest['status']) => {
        switch (status) {
            case 'approved': return 'bg-green-100 text-green-800 border-green-200';
            case 'rejected': return 'bg-red-100 text-red-800 border-red-200';
            case 'pending':
            default: return 'bg-yellow-100 text-yellow-800 border-yellow-200';
        }
    };

    return (
        <AuthenticatedLayout breadcrumbs={breadcrumbs}>
            <Head title="Historial de Ausencias" />

            <div className="py-12">
                <div className="w-full mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            
                            <h3 className="text-xl font-bold mb-6 text-gray-800 flex items-center">
                                <Handshake className="w-6 h-6 mr-2 text-indigo-600" />
                            </h3>

                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Período</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha de Solicitud</th>
                                            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Revisado Por</th>
                                            <th className="relative px-6 py-3"><span className="sr-only">Detalle</span></th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {requests.data.length === 0 ? (
                                            <tr>
                                                <td colSpan={6} className="px-6 py-4 text-center text-gray-500">
                                                    No has enviado ninguna solicitud de ausencia.
                                                </td>
                                            </tr>
                                        ) : (
                                            requests.data.map((request) => (
                                                <tr key={request.id} className="hover:bg-gray-50 transition">
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                        {request.absence_type?.name}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 flex items-center">
                                                        <Calendar className="w-4 h-4 mr-1" />
                                                        {request.start_date} al {request.end_date}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        {new Date(request.created_at).toLocaleDateString()}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-center">
                                                        <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusStyles(request.status)}`}>
                                                            {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        {request.approver?.name || (request.status === 'pending' ? 'N/A' : 'Sistema')}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                        <button 
                                                            title="Ver Razón/Detalle"
                                                            onClick={() => alert(`Razón:\n${request.reason}\n\n${request.status === 'rejected' && request.rejection_reason ? 'Razón de Rechazo: ' + request.rejection_reason : ''}`)}
                                                            className="text-gray-600 hover:text-indigo-600 transition"
                                                        >
                                                            <Info className="w-5 h-5" />
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default AbsenceRequestHistory;