<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\Employee;
use App\Models\AbsenceType;
use App\Models\AbsenceRequest;
use App\Models\Department;
use App\Models\AttendanceRecord; 
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use App\Models\User;

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
    
    public function absenceSummary(Request $request) { 
        $startDate = $request->input('start_date', Carbon::now()->startOfYear()->toDateString());
        $endDate = $request->input('end_date', Carbon::now()->endOfYear()->toDateString());
        
        // --- Consulta de Ausencias Aprobadas ---
        $requests = AbsenceRequest::where('status', 'approved')
            ->whereBetween('start_date', [$startDate, $endDate])
            ->with('absenceType:id,name')
            ->get();

        $totalDaysLost = 0;
        $typeCounts = [];

        foreach ($requests as $req) {
            $start = Carbon::parse($req->start_date);
            $end = Carbon::parse($req->end_date);
            
            // Cálculo de días (simple: incluye fines de semana; el cálculo de días hábiles es más complejo)
            $days = $start->diffInDays($end) + 1; 
            $totalDaysLost += $days;

            $typeName = $req->absenceType->name ?? 'Desconocido';
            $typeCounts[$typeName] = ($typeCounts[$typeName] ?? 0) + $days;
        }

        // --- Cálculo de Tasa de Ausentismo (Simplificado) ---
        $employeeCount = Employee::count();
        $workingDaysInPeriod = Carbon::parse($startDate)->diffInDaysFiltered(function(Carbon $date) {
            return $date->isWeekday(); 
        }, Carbon::parse($endDate));
        
        $totalPotentialWorkDays = $employeeCount * $workingDaysInPeriod;
        
        $absenteeismRate = $totalPotentialWorkDays > 0 ? ($totalDaysLost / $totalPotentialWorkDays) * 100 : 0;
        
        // --- Encontrar Tipo de Ausencia Más Común ---
        arsort($typeCounts);
        $topAbsenceType = key($typeCounts) ?? 'N/A';
        
        return Inertia::render('reports/AbsenceSummary', [
            'totalDaysLost' => round($totalDaysLost, 0),
            'absenteeismRate' => round($absenteeismRate, 2),
            'topAbsenceType' => $topAbsenceType,
            'typeDistribution' => $typeCounts,
            'startDate' => $startDate,
            'endDate' => $endDate,
        ]); 
    }
    
    public function leaveBalance() { 
        $employeeBalances = Employee::select('id', 'first_name', 'last_name')
            ->orderBy('last_name')
            ->get()
            ->map(function ($employee) {
                return [
                    'employeeId' => $employee->id,
                    'employeeName' => "{$employee->first_name} {$employee->last_name}",
                    'balances' => [
                        ['type' => 'Vacaciones', 'assigned' => 15, 'used' => rand(0, 15), 'remaining' => 15 - rand(0, 15)],
                        ['type' => 'Días Personales', 'assigned' => 5, 'used' => rand(0, 5), 'remaining' => 5 - rand(0, 5)],
                    ]
                ];
            });

        return Inertia::render('reports/LeaveBalance', [
            'employeeBalances' => $employeeBalances,
        ]);
    }
    
    public function attendanceDetail(Request $request) { 
        $employeeId = $request->input('employee_id');
        $startDate = $request->input('start_date', Carbon::now()->startOfMonth()->toDateString());
        $endDate = $request->input('end_date', Carbon::now()->today()->toDateString());
        
        // --- Consulta de Registros de Asistencia ---
        $query = AttendanceRecord::with('employee:id,first_name,last_name')
            ->whereBetween('check_in_time', [
                Carbon::parse($startDate)->startOfDay(), 
                Carbon::parse($endDate)->endOfDay()
            ]);
            
        if ($employeeId) {
            $query->where('employee_id', $employeeId);
        }
        
        $records = $query->orderByDesc('check_in_time')
            ->paginate(15);
            
        // --- Transformación de Datos (Cálculo de Duración) ---
        $records->getCollection()->transform(function ($record) {
            $checkIn = Carbon::parse($record->check_in_time);
            $checkOut = $record->check_out_time ? Carbon::parse($record->check_out_time) : null;
            
            $durationFormatted = 'N/A';
            if ($checkOut) {
                $durationSeconds = $checkIn->diffInSeconds($checkOut);
                // Formato H:i (ej: 8h 30m)
                $durationFormatted = gmdate('G\h i\m', $durationSeconds);
            }

            return [
                'id' => $record->id,
                'employeeName' => "{$record->employee->first_name} {$record->employee->last_name}",
                'date' => $checkIn->toDateString(),
                'checkIn' => $checkIn->format('H:i'),
                'checkOut' => $checkOut ? $checkOut->format('H:i') : 'N/A',
                'duration' => $durationFormatted,
            ];
        });

        // Obtener lista de empleados para el filtro del frontend
        $employees = Employee::select('id', 'first_name', 'last_name')->get()->map(function ($employee) {
            return ['id' => $employee->id, 'name' => "{$employee->first_name} {$employee->last_name}"];
        });
        
        return Inertia::render('reports/AttendanceDetail', [
            'records' => $records,
            'employees' => $employees,
            'filters' => $request->only('employee_id', 'start_date', 'end_date')
        ]);
    }
    
    public function personnelList() { 
        $query = Employee::with('department:id,name')
            ->select('id', 'first_name', 'last_name', 'department_id', 'position', 'hire_date', 'personal_email');

        $employees = $query->orderBy('last_name')
            ->paginate(20);
            
        // --- Transformación de Datos ---
        $employees->getCollection()->transform(function ($employee) {
            return [
                'id' => $employee->id,
                'fullName' => "{$employee->first_name} {$employee->last_name}",
                'department' => $employee->department->name ?? 'No Asignado',
                'position' => $employee->position,
                'hiringDate' => Carbon::parse($employee->hire_date)->toDateString(),
                'email' => $employee->personal_email ?? 'N/A',
            ];
        });
        
        // Lista de departamentos para el filtro del frontend
        $departments = Department::select('id', 'name')->get();
        
        return Inertia::render('reports/PersonnelList', [
            'employees' => $employees,
            'departments' => $departments,
        ]);
    }
}
