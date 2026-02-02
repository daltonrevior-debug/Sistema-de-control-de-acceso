import React, { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/layouts/app-layout';
import {
    Check,
    X,
    Clock,
    Calendar,
    AlertCircle,
    FileText,
    CheckCircle2,
    XCircle,
    CheckCheck,
} from 'lucide-react';
import { PaginatedData, PageProps, AbsenceRequest } from '@/types/global';
import { type BreadcrumbItem } from '@/types';
import { formatDate } from '@/lib/utils';
import Pagination from '@/components/Pagination';

interface AbsenceRequestIndexProps extends PageProps {
    requests: PaginatedData<AbsenceRequest>;
}

const AbsenceRequestIndex: React.FC<AbsenceRequestIndexProps> = ({ requests }) => {
    const [rejectionModalOpen, setRejectionModalOpen] = useState(false);
    const [confirmModalOpen, setConfirmModalOpen] = useState(false);
    const [selectedRequest, setSelectedRequest] = useState<AbsenceRequest | null>(null);
    const [rejectionReason, setRejectionReason] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Gestión', href: '#' },
        { title: 'Solicitudes de Ausencia', href: route('config.absence-requests.index') }
    ];

    const getStatusStyles = (status: string) => {
        switch (status) {
            case 'approved':
                return 'bg-emerald-50 text-emerald-700 border-emerald-100 ring-emerald-500/10';
            case 'rejected':
                return 'bg-rose-50 text-rose-700 border-rose-100 ring-rose-500/10';
            default:
                return 'bg-amber-50 text-amber-700 border-amber-100 ring-amber-500/10';
        }
    };

    const handleApprove = () => {
        if (!selectedRequest || selectedRequest.status !== 'pending') return;
        router.post(route('config.absence-requests.approve', selectedRequest.id), {}, {
            onStart: () => setIsSubmitting(true),
            onSuccess: () => setConfirmModalOpen(false),
            onFinish: () => setIsSubmitting(false),
        });
    };

    const openRejectionModal = (request: AbsenceRequest) => {
        setSelectedRequest(request);
        setRejectionReason('');
        setRejectionModalOpen(true);
    };

    const openConfirmModal = (request: AbsenceRequest) => {
        setSelectedRequest(request);
        setConfirmModalOpen(true);
    };

    const handleReject = () => {
        if (!selectedRequest || rejectionReason.trim().length < 10) return;
        router.post(route('config.absence-requests.reject', selectedRequest.id), {
            rejection_reason: rejectionReason
        }, {
            onStart: () => setIsSubmitting(true),
            onSuccess: () => setRejectionModalOpen(false),
            onFinish: () => setIsSubmitting(false),
        });
    };

    return (
        <AuthenticatedLayout breadcrumbs={breadcrumbs}>
            <Head title="Solicitudes de Ausencia" />

            <div className="max-w-7xl py-8 px-4 sm:px-6 lg:px-8 space-y-6">

                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                            <Clock className="w-7 h-7 text-indigo-600" />
                            Revision de Ausencias
                        </h1>
                        <p className="text-sm text-gray-500 mt-1">Gestiona y revisa los permisos solicitados por el personal.</p>
                    </div>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden transition-all hover:shadow-md">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50/50 border-b border-gray-100">
                                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Miliciano</th>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Tipo y Motivo</th>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Periodo</th>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Estado</th>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Acciones</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {requests.data.map((request) => (
                                    <tr key={request.id} className="hover:bg-gray-50/50 transition-colors group">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="h-10 w-10 rounded-full bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-700 font-semibold shadow-sm">
                                                    {request.employee?.first_name.charAt(0)}{request.employee?.last_name.charAt(0)}
                                                </div>
                                                <div>
                                                    <div className="text-sm font-bold text-gray-900">{request.employee?.first_name} {request.employee?.last_name}</div>
                                                    <div className="text-xs text-gray-500 font-mono">ID: {request.employee?.id}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="max-w-[200px]">
                                                <div className="text-sm font-semibold text-gray-800">{request.absence_type?.name}</div>
                                                <div className="text-xs text-gray-500 truncate mt-0.5" title={request.reason}>
                                                    {request.reason}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col text-sm text-gray-600">
                                                <span className="flex items-center gap-1.5 font-medium">
                                                    <Calendar className="w-3.5 h-3.5 text-indigo-400" />
                                                    {formatDate(request.start_date)}
                                                </span>
                                                <span className="text-xs text-gray-400 ml-5">al {formatDate(request.end_date)}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold border ring-1 ${getStatusStyles(request.status)}`}>
                                                {request.status === 'pending' && <AlertCircle className="w-3 h-3 mr-1" />}
                                                {request.status === 'approved' && <CheckCircle2 className="w-3 h-3 mr-1" />}
                                                {request.status === 'rejected' && <XCircle className="w-3 h-3 mr-1" />}
                                                {request.status === 'pending' ? 'Pendiente' : request.status === 'approved' ? 'Aprobado' : 'Rechazado'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            {request.status === 'pending' ? (
                                                <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <button
                                                        onClick={() => openConfirmModal(request)}
                                                        disabled={isSubmitting}
                                                        className="p-2 bg-emerald-50 text-emerald-600 rounded-lg hover:bg-emerald-600 hover:text-white transition-all shadow-sm active:scale-95"
                                                        title="Aprobar"
                                                    >
                                                        <Check className="w-4 h-4" />
                                                    </button>
                                                    <button
                                                        onClick={() => openRejectionModal(request)}
                                                        disabled={isSubmitting}
                                                        className="p-2 bg-rose-50 text-rose-600 rounded-lg hover:bg-rose-600 hover:text-white transition-all shadow-sm active:scale-95"
                                                        title="Rechazar"
                                                    >
                                                        <X className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            ) : (
                                                <span className="text-xs text-gray-400 font-medium italic">Procesado</span>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="px-6 py-4 border-t border-gray-100 bg-gray-50/30">
                        <Pagination links={requests.links} />
                    </div>
                </div>
            </div>

            {rejectionModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 animate-in fade-in duration-200">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden transform transition-all scale-100 animate-in zoom-in-95 duration-200">
                        <div className="p-6 border-b border-gray-100">
                            <div className="flex items-center gap-3 text-rose-600">
                                <div className="p-2 bg-rose-50 rounded-full">
                                    <XCircle className="w-6 h-6" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900">Rechazar Solicitud</h3>
                            </div>
                        </div>

                        <div className="p-6 space-y-4">
                            <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                                <div className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-1">Solicitante</div>
                                <div className="text-sm font-semibold text-gray-800">
                                    {selectedRequest?.employee?.first_name} {selectedRequest?.employee?.last_name}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                                    <FileText className="w-4 h-4 text-gray-400" />
                                    Motivo del rechazo
                                </label>
                                <textarea
                                    value={rejectionReason}
                                    onChange={(e) => setRejectionReason(e.target.value)}
                                    rows={4}
                                    placeholder="Explica detalladamente por qué se rechaza esta solicitud (mín. 10 caracteres)..."
                                    className="w-full rounded-xl border-gray-200 focus:ring-rose-500 focus:border-rose-500 text-sm p-4 transition-all bg-gray-50/50"
                                />
                                <p className={`text-[11px] ${rejectionReason.length < 10 ? 'text-amber-600' : 'text-emerald-600'} font-medium`}>
                                    Caracteres: {rejectionReason.length} / 10 mínimo
                                </p>
                            </div>
                        </div>

                        <div className="p-6 bg-gray-50 flex justify-end gap-3">
                            <button
                                onClick={() => setRejectionModalOpen(false)}
                                className="px-5 py-2.5 text-sm font-bold text-gray-500 hover:text-gray-700 transition-colors"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={handleReject}
                                disabled={isSubmitting || rejectionReason.trim().length < 10}
                                className="px-6 py-2.5 bg-gray-900 text-white rounded-xl text-sm font-bold hover:bg-rose-600 disabled:opacity-50 disabled:hover:bg-gray-900 transition-all shadow-lg active:scale-95"
                            >
                                {isSubmitting ? 'Procesando...' : 'Confirmar Rechazo'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {confirmModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 animate-in fade-in duration-200">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden transform transition-all scale-100 animate-in zoom-in-95 duration-200">
                        <div className="p-6 border-b border-gray-100">
                            <div className="flex items-center gap-3 text-green-600">
                                <div className="p-2 bg-rose-50 rounded-full">
                                    <CheckCheck className="w-6 h-6" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900">Aprovar Solicitud</h3>
                            </div>
                        </div>

                        <div className="p-6 space-y-4">
                            <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                                <div className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-1">Solicitante</div>
                                <div className="text-sm font-semibold text-gray-800">
                                    {selectedRequest?.employee?.first_name} {selectedRequest?.employee?.last_name}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                                    <FileText className="w-4 h-4 text-gray-400" />
                                    Motivo de la Ausencia
                                </label>
                                <textarea
                                    disabled
                                    value={selectedRequest?.reason}
                                    rows={4}
                                    placeholder="Explica detalladamente por qué se rechaza esta solicitud (mín. 10 caracteres)..."
                                    className="w-full rounded-xl border-gray-200 focus:ring-rose-500 focus:border-rose-500 text-sm p-4 transition-all bg-gray-50/50"
                                />
                            </div>
                        </div>

                        <div className="p-6 bg-gray-50 flex justify-end gap-3">
                            <button
                                onClick={() => setConfirmModalOpen(false)}
                                className="px-5 py-2.5 text-sm font-bold text-gray-500 hover:text-gray-700 transition-colors"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={handleApprove}
                                disabled={isSubmitting}
                                className="cursor-pointer px-6 py-2.5 bg-gray-900 text-white rounded-xl text-sm font-bold hover:bg-green-600 disabled:opacity-50 disabled:hover:bg-gray-900 transition-all shadow-lg active:scale-95"
                            >
                                {isSubmitting ? 'Procesando...' : 'Aprovar Solicitud'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    );
};

export default AbsenceRequestIndex;