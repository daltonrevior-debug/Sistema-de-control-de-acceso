<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\Employee;
use App\Models\AbsenceType;
use App\Models\AbsenceRequest;

class ReportController extends Controller
{
    public function index()
    {
        // Datos de resumen rápido para el dashboard de reportes
        $employeeCount = Employee::count();
        $absenceTypeCount = AbsenceType::count();
        
        // Conteo de solicitudes pendientes
        $pendingRequestsCount = AbsenceRequest::where('status', 'pending')->count();

        return Inertia::render('reports/ReportsIndex', [
            'employeeCount' => $employeeCount,
            'absenceTypeCount' => $absenceTypeCount,
            'pendingRequestsCount' => $pendingRequestsCount,
        ]);
    }
    
    public function absenceSummary() { 
        return Inertia::render('reports/AbsenceSummary'); 
    }
    
    public function leaveBalance() { 
        return Inertia::render('reports/LeaveBalance'); 
    }
    
    public function attendanceDetail() { 
        return Inertia::render('reports/AttendanceDetail'); 
    }
    
    public function personnelList() { 
        return Inertia::render('reports/PersonnelList'); 
    }
}
