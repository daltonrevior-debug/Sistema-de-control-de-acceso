<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\Attendance;
use App\Models\AttendanceRecord;
use App\Models\Employee;
use Carbon\Carbon;

class AttendanceController extends Controller
{

    protected function getEmployeeId()
    {
        $employee = Employee::first();
        return $employee ? $employee->id : null; 
    }

    protected function getEmployee()
    {
        return Employee::with('schedule')->find($this->getEmployeeId()); 
    }

    // --- MÉTODOS DEL CONTROLADOR ---

    public function index()
    {
        $employeeId = $this->getEmployeeId();
        
        // Si no se encuentra un empleado ligado, mostrar un error
        if (!$employeeId) {
            return back()->with('error', 'No se pudo vincular al usuario autenticado con un registro de empleado.');
        }

        // Buscar el último marcaje de entrada sin salida (para el día actual)
        $todayAttendance = Attendance::where('employee_id', $employeeId)
            ->whereDate('check_in_at', Carbon::today())
            ->whereNull('check_out_at')
            ->orderByDesc('check_in_at')
            ->first();

        return Inertia::render('attendance/AttendanceIndex', [
            'todayAttendance' => $todayAttendance, 
        ]);
    }

    public function checkIn(Request $request)
    {
        $employee = $this->getEmployee();
        $employeeId = $this->getEmployeeId();
    
        if (!$employee) {
            return back()->with('error', 'No se pudo identificar al empleado.');
        }

        if (!$employeeId) {
            return back()->with('error', 'No se pudo identificar al empleado.');
        }

        // --- Lógica de Tolerancia ---
        $status = 'normal';
        $now = Carbon::now();

        if ($employee->schedule) {
            $scheduledStart = Carbon::parse($employee->schedule->start_time);
            $toleranceMinutes = $employee->schedule->tardy_tolerance_minutes;
        
            // Calcular el tiempo máximo permitido (Hora de inicio + Tolerancia)
            $tardyThreshold = $scheduledStart->copy()->addMinutes($toleranceMinutes);
        
            // Si la hora actual es después del umbral de tolerancia, marca como 'tardy'
            if ($now->greaterThan($tardyThreshold)) {
                $status = 'tardy';
            }
        }

        // Verificar si ya marcó entrada y no ha marcado salida
        $isClockedIn = Attendance::where('employee_id', $employeeId)
            ->whereDate('check_in_at', Carbon::today())
            ->whereNull('check_out_at')
            ->exists();

        if ($isClockedIn) {
            return back()->with('error', 'Ya tienes un marcaje de entrada abierto para hoy.');
        }

        Attendance::create([
            'employee_id' => $employee->id,
            'check_in_at' => $now,
            'check_in_ip' => $request->ip(),
            'status' => $status,
        ]);

        $message = ($status === 'tardy') 
            ? 'Check-In registrado. ¡Llegaste tarde! T:' . $employee->schedule->tardy_tolerance_minutes
            : '¡Check-In registrado exitosamente!';

        return redirect()->route('attendance.index')->with('success', $message);
    }

    public function checkOut(Request $request)
    {
        $employeeId = $this->getEmployeeId();
        
        if (!$employeeId) {
            return back()->with('error', 'No se pudo identificar al empleado.');
        }

        // Buscar el último Check-In abierto (sin salida)
        $latestAttendance = Attendance::where('employee_id', $employeeId)
            ->whereNull('check_out_at')
            ->orderByDesc('check_in_at')
            ->first();

        if (!$latestAttendance) {
            return back()->with('error', 'No se encontró una entrada abierta para registrar la salida.');
        }

        $latestAttendance->update([
            'check_out_at' => Carbon::now(),
            'check_out_ip' => $request->ip(),
        ]);

        return redirect()->route('attendance.index')->with('success', '¡Check-Out registrado!');
    }

    public function history(Request $request)
    {
        // $employeeId = $this->getEmployeeId();
        
        // if (!$employeeId) {
        //     return back()->with('error', 'No se pudo identificar al empleado.');
        // }

        // --- Filtros ---
        // Rango de fechas: Por defecto, los últimos 30 días
        $startDate = $request->input('start_date', Carbon::now()->subDays(30)->toDateString());
        $endDate = $request->input('end_date', Carbon::now()->toDateString());
        
        // --- Consulta de Datos ---
        $attendances = AttendanceRecord::whereDate('check_in_time', '>=', $startDate)
            ->whereDate('check_in_time', '<=', $endDate)
            ->whereNotNull('check_out_time')
            ->orderByDesc('check_in_time')
            ->get();
            
        // --- Formateo y Cálculo de Horas ---
        // Usamos una colección para mapear y calcular la duración de la jornada
        $historyData = $attendances->map(function ($attendance) {
            
            $checkIn = Carbon::parse($attendance->check_in_at);
            $checkOut = Carbon::parse($attendance->check_out_time);
            
            // Calcula la duración total de la jornada
            $duration = $checkIn->diff($checkOut);
            
            return [
                'id' => $attendance->id,
                'date' => $checkIn->toDateString(),
                'check_in' => $checkIn->format('H:i:s'),
                'check_out' => $checkOut->format('H:i:s'),
                'status' => $attendance->status, // Normal, tardy, etc.
                'total_time' => sprintf('%dh %dm', $duration->h, $duration->i),
            ];
        });

        return Inertia::render('attendance/AttendanceHistory', [
            'historyData' => $historyData,
            'filters' => [
                'start_date' => $startDate,
                'end_date' => $endDate,
            ]
        ]);
    }
}
