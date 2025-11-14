import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { List, Download, Hourglass } from 'lucide-react';

interface EmployeeBalance {
    employeeId: number;
    employeeName: string;
    balances: {
        type: string;
        assigned: number;
        used: number;
        remaining: number;
    }[];
}

interface LeaveBalanceProps {
    employeeBalances: EmployeeBalance[];
}

const LeaveBalance: React.FC<LeaveBalanceProps> = ({ employeeBalances }) => {
    
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Reportes', href: route('reports.index') },
        { title: 'Balance de Días Libres', href: route('reports.leave-balance') },
    ];
    
    const flattenedBalances = employeeBalances.flatMap(emp => 
        emp.balances.map(b => ({
            employeeName: emp.employeeName,
            ...b
        }))
    );
    
    return (
        <AuthenticatedLayout breadcrumbs={breadcrumbs}>
            <Head title="Balance de Días Libres" />

            <div className="py-12">
                <div className="w-full mx-auto sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-3xl font-extrabold text-gray-900">Balance de Días Libres</h2>
                        <button className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition">
                            <Download className="w-5 h-5 mr-2" /> Exportar
                        </button>
                    </div>

                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <p className="text-sm text-gray-500 mb-4 flex items-center">
                                <Hourglass className="w-4 h-4 mr-1" /> Muestra el saldo acumulado y utilizado por empleado.
                            </p>
                            
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Empleado</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo de Permiso</th>
                                            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Asignados</th>
                                            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Utilizados</th>
                                            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Restantes</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {flattenedBalances.map((balance, index) => (
                                            <tr key={index} className="hover:bg-gray-50">
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{balance.employeeName}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{balance.type}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-900">{balance.assigned}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-900">{balance.used}</td>
                                                <td className={`px-6 py-4 whitespace-nowrap text-center text-sm font-bold ${balance.remaining <= 1 ? 'text-red-600' : 'text-green-600'}`}>
                                                    {balance.remaining}
                                                </td>
                                            </tr>
                                        ))}
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

export default LeaveBalance;