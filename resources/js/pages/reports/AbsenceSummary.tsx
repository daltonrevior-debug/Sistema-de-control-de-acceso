import React from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Filter, PieChart, TrendingUp, Download } from 'lucide-react';

interface AbsenceSummaryProps {
    totalDaysLost: number;
    absenteeismRate: number;
    topAbsenceType: string;
    typeDistribution: Record<string, number>;
    startDate: string;
    endDate: string;
}

const AbsenceSummary: React.FC<AbsenceSummaryProps> = (props) => {

    const { totalDaysLost, absenteeismRate, topAbsenceType, typeDistribution, startDate, endDate } = props;

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Reportes', href: route('reports.index') },
        { title: 'Resumen de Ausencias', href: route('reports.absence-summary') },
    ];

    const totalDays = Object.values(typeDistribution).reduce((sum, days) => sum + days, 0);
    const distributionData = Object.entries(typeDistribution)
        .sort(([, a], [, b]) => b - a)
        .map(([type, days]) => ({
            type,
            days,
            percentage: totalDays > 0 ? ((days / totalDays) * 100).toFixed(1) : 0,
        }));

    return (
        <AuthenticatedLayout breadcrumbs={breadcrumbs}>
            <Head title="Resumen de Ausencias" />

            <div className="py-12">
                <div className="w-full mx-auto sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-3xl font-extrabold text-gray-900">Resumen de Ausencias</h2>
                        <button className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition">
                            <Download className="w-5 h-5 mr-2" /> Exportar a Excel
                        </button>
                    </div>

                    <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm mb-8 flex flex-wrap md:flex-nowrap items-center gap-6">

                        <div className="flex items-center gap-3 pr-6 border-r border-gray-100">
                            <div className="p-2 bg-gray-50 rounded-lg">
                                <Filter className="w-5 h-5 text-indigo-600" />
                            </div>
                            <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">Filtros</label>
                        </div>

                        <div className="flex items-center gap-4 flex-grow">
                            <div className="flex items-center gap-2">
                                <span className="text-xs font-semibold text-gray-400 uppercase">Desde</span>
                                <input
                                    type="date"
                                    className="border-gray-300 focus:ring-4 focus:ring-indigo-50 focus:border-indigo-500 rounded-lg text-sm transition duration-200 px-3 py-2 outline-none"
                                    defaultValue={startDate}
                                />
                            </div>

                            <div className="h-px w-4 bg-gray-300"></div>

                            <div className="flex items-center gap-2">
                                <span className="text-xs font-semibold text-gray-400 uppercase">Hasta</span>
                                <input
                                    type="date"
                                    className="border-gray-300 focus:ring-4 focus:ring-indigo-50 focus:border-indigo-500 rounded-lg text-sm transition duration-200 px-3 py-2 outline-none"
                                    defaultValue={endDate}
                                />
                            </div>
                        </div>

                        <div className="flex items-center">
                            <button className="px-6 py-2.5 bg-indigo-600 text-white font-semibold rounded-lg text-sm hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-100 transform active:scale-95 transition duration-200 flex items-center gap-2">
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                                Aplicar Filtros
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-3 gap-6 mb-10">
                        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-indigo-500">
                            <p className="text-sm font-medium text-gray-500">Días Perdidos Totales</p>
                            <p className="mt-1 text-3xl font-semibold text-gray-900">{totalDaysLost}</p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-sky-500">
                            <p className="text-sm font-medium text-gray-500">Tasa de Ausentismo</p>
                            <p className="mt-1 text-3xl font-semibold text-gray-900">{absenteeismRate}%</p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-amber-500">
                            <p className="text-sm font-medium text-gray-500">Tipo de Ausencia Más Común</p>
                            <p className="mt-1 text-lg font-semibold text-gray-900">{topAbsenceType}</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <h4 className="font-semibold text-lg mb-4 flex items-center"><PieChart className="w-5 h-5 mr-2" /> Distribución por Tipo</h4>
                            <ul className="space-y-2">
                                {distributionData.map(item => (
                                    <li key={item.type} className="flex justify-between items-center text-sm text-gray-700">
                                        <span>{item.type}</span>
                                        <span className="font-semibold">{item.days} Días ({item.percentage}%)</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <h4 className="font-semibold text-lg mb-4 flex items-center"><TrendingUp className="w-5 h-5 mr-2" /> Tendencia Mensual</h4>
                            <div className="h-64 flex items-center justify-center text-gray-400">
                                [Placeholder para Gráfico de Barras/Líneas]
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default AbsenceSummary;