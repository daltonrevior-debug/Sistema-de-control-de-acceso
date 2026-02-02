<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Employee;
use App\Models\AttendanceRecord;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use App\Models\Suspension;

class PublicAttendanceController extends Controller
{

    protected function getEmployee($employeeId)
    {
        return Employee::with('schedule')->find($employeeId);
    }

    public function scanner()
    {
        return Inertia::render('public/AttendanceScanner');
    }

    public function mark(Request $request)
    {
        $request->validate([
            'employee_id' => 'required|exists:employees,id',
        ]);


        $employeeId = $request->input('employee_id');
        $today = Carbon::today()->toDateString();
        $currentTime = Carbon::now();

        $employee = $this->getEmployee($employeeId);
        $record = AttendanceRecord::where('employee_id', $employeeId)->whereDate('check_in_time', $today)->first();

        if (!$employee) {
            return back()->with('error', 'No se pudo identificar al empleado.');
        }

        if ($employee->status !== "active") {
            return back()->with('deny', 'No tienes permitida la entrada.');
        }

        $isSuspended = Suspension::where('employee_id', $employeeId)
            ->whereDate('start_date', '<=', $today)
            ->whereDate('end_date', '>=', $today)
            ->first();

        if ($isSuspended) {
            return back()->with('deny', "Acceso denegado: Te encuentras bajo una medida de suspensión desde el {$isSuspended->start_date->format('d/m/Y')} hasta el {$isSuspended->end_date->format('d/m/Y')}.");
        }

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

        try {
            DB::beginTransaction();

            if (!$record) {

                AttendanceRecord::create([
                    'employee_id' => $employeeId,
                    'check_in_time' => $currentTime,
                    'check_in_ip' => $request->ip(),
                    'date' => $today,
                    'status' =>  $status,
                ]);
                $message = ($status === 'tardy')
                    ? 'Check-In registrado. ¡Llegaste tarde! T:' . $employee->schedule->tardy_tolerance_minutes
                    : 'Check-in registrado con éxito a las ' . $currentTime->format('H:i:s');
            } elseif (empty($record->check_out_time)) {
                $record->check_out_time = $currentTime;
                $record->check_out_ip = $request->ip();
                // $duration = $record->check_in_time->diffInMinutes($currentTime); 
                $record->save();
                $message = 'Check-out registrado con éxito a las ' . $currentTime->format('H:i:s');
            } else {
                DB::rollBack();
                return back()->with('deny', 'Ya has registrado tu entrada y salida hoy.');
            }

            DB::commit();
            return back()->with('success', $message);
        } catch (\Exception $e) {
            DB::rollBack();
            return back()->with('error', 'Ocurrió un error al registrar el marcaje.');
        }
    }
}
