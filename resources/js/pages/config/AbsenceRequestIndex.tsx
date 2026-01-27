import React, { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/layouts/app-layout';
import { Check, X, User, Clock } from 'lucide-react';
import { PaginatedData, PageProps, AbsenceRequest } from '@/types/global';
import { type BreadcrumbItem } from '@/types';
import { formatDate } from '@/lib/utils';

interface AbsenceRequestIndexProps extends PageProps {
    requests: PaginatedData<AbsenceRequest>;
}

const AbsenceRequestIndex: React.FC<AbsenceRequestIndexProps> = ({ requests }) => {

    const [rejectionModalOpen, setRejectionModalOpen] = useState(false);
    const [selectedRequest, setSelectedRequest] = useState<AbsenceRequest | null>(null);
    const [rejectionReason, setRejectionReason] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Gestión', href: '#' },
        { title: 'Solicitudes de Ausencia', href: route('config.absence-requests.index') }
    ];

    const handleApprove = (request: AbsenceRequest) => {
        if (request.status !== 'pending') return;

        if (confirm(`¿Confirmar aprobación de la solicitud de ${request.employee?.first_name} por ${request.absence_type?.name}?`)) {
            router.post(route('config.absence-requests.approve', request.id), {}, {
                onStart: () => setIsSubmitting(true),
                onFinish: () => setIsSubmitting(false),
            });
        }
    };

    const openRejectModal = (request: AbsenceRequest) => {
        if (request.status !== 'pending') return;

        setSelectedRequest(request);
        setRejectionReason('');
        setRejectionModalOpen(true);
    };

    const handleReject = () => {
        if (!selectedRequest || !rejectionReason.trim() || isSubmitting) return;

        router.post(route('config.absence-requests.reject', selectedRequest.id), {
            rejection_reason: rejectionReason
        }, {
            onStart: () => setIsSubmitting(true),
            onSuccess: () => {
                setRejectionModalOpen(false);
                setRejectionReason('');
                setSelectedRequest(null);
                setIsSubmitting(false);
            },
            onError: () => setIsSubmitting(false),
            onFinish: () => setIsSubmitting(false),
        });
    };

    const getStatusStyles = (status: AbsenceRequest['status']) => {
        switch (status) {
            case 'approved': return 'bg-green-100 text-green-800 border border-green-200';
            case 'rejected': return 'bg-red-100 text-red-800 border border-red-200';
            case 'pending':
            default: return 'bg-yellow-100 text-yellow-800 border border-yellow-200';
        }
    };

    return (
        <AuthenticatedLayout breadcrumbs={breadcrumbs}>
            <Head title="Solicitudes de Ausencia" />

            <div className="py-12">
                <div className="w-full mx-auto sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-extrabold text-gray-900 mb-8">Listas de Solicitudes</h2>
                    <div className="bg-white overflow-hidden sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <h3 className="text-xl font-bold mb-6 text-gray-800">Revisión de Solicitudes</h3>
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Empleado</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Período</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Razón</th>
                                            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                                            <th className="relative px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {requests.data.length === 0 ? (
                                            <tr>
                                                <td colSpan={6} className="px-6 py-4 text-center text-gray-500">
                                                    No hay solicitudes de ausencia.
                                                </td>
                                            </tr>
                                        ) : (
                                            requests.data.map((request) => (
                                                <tr key={request.id} className={request.status === 'pending' ? 'hover:bg-yellow-50 transition' : 'hover:bg-gray-50 transition'}>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 flex items-center">
                                                        <User className="w-4 h-4 mr-2 text-indigo-500" />
                                                        {request.employee?.first_name} {request.employee?.last_name}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        {request.absence_type?.name}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        {formatDate(request.start_date)} - {formatDate(request.end_date)}
                                                    </td>
                                                    <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate" title={request.reason}>{request.reason}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-center">
                                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusStyles(request.status)}`}>
                                                            {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                                                        </span>
                                                        {request.status === 'rejected' && request.rejection_reason && (
                                                            <p className="text-xs text-red-500 mt-1 max-w-xs truncate" title={`Razón: ${request.rejection_reason}`}>
                                                                Razón: {request.rejection_reason}
                                                            </p>
                                                        )}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                                                        {request.status === 'pending' ? (
                                                            <div className="flex justify-center space-x-2">
                                                                <button
                                                                    onClick={() => handleApprove(request)}
                                                                    disabled={isSubmitting}
                                                                    className="text-green-600 hover:text-green-900 disabled:opacity-50 transition"
                                                                    title="Aprobar"
                                                                >
                                                                    <Check className="w-5 h-5" />
                                                                </button>
                                                                <button
                                                                    onClick={() => openRejectModal(request)}
                                                                    disabled={isSubmitting}
                                                                    className="text-red-600 hover:text-red-900 disabled:opacity-50 transition"
                                                                    title="Rechazar"
                                                                >
                                                                    <X className="w-5 h-5" />
                                                                </button>
                                                            </div>
                                                        ) : (
                                                            <Clock className={`w-5 h-5 mx-auto ${request.status === 'approved' ? 'text-green-500' : 'text-red-500'}`} />
                                                        )}
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

            {rejectionModalOpen && selectedRequest && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-75 overflow-y-auto h-full w-full z-50 flex items-center justify-center">
                    <div className="relative bg-white p-8 rounded-lg shadow-2xl max-w-md w-full animate-in zoom-in-95">
                        <h4 className="text-lg font-bold mb-4 text-gray-800">Rechazar Solicitud de {selectedRequest.employee?.first_name}</h4>
                        <p className="mb-4 text-sm text-gray-600">
                            Tipo: **{selectedRequest.absence_type?.name}** ({selectedRequest.start_date} al {selectedRequest.end_date})
                        </p>

                        <textarea
                            value={rejectionReason}
                            onChange={(e) => setRejectionReason(e.target.value)}
                            rows={4}
                            placeholder="Razón de rechazo detallada y obligatoria (mínimo 10 caracteres)..."
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-red-500 focus:ring-red-500"
                        />

                        <div className="mt-6 flex justify-end space-x-3">
                            <button
                                onClick={() => setRejectionModalOpen(false)}
                                disabled={isSubmitting}
                                className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 disabled:opacity-50"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={handleReject}
                                disabled={isSubmitting || rejectionReason.trim().length < 10}
                                className="px-4 py-2 text-white bg-red-600 rounded-lg hover:bg-red-700 disabled:opacity-50"
                            >
                                {isSubmitting ? 'Procesando...' : 'Confirmar Rechazo'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    );
};

export default AbsenceRequestIndex;