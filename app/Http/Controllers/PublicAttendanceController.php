<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Employee;
use App\Models\AttendanceRecord;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class PublicAttendanceController extends Controller
{
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

        $record = AttendanceRecord::where('employee_id', $employeeId)->whereDate('check_in_time', $today)->first();

        try {
            DB::beginTransaction();

            if (!$record) {
                AttendanceRecord::create([
                    'employee_id' => $employeeId,
                    'check_in_time' => $currentTime,
                    'date' => $today,
                    'status' => 'present',
                ]);
                $message = 'Check-in registrado con éxito a las ' . $currentTime->format('H:i:s');
            } elseif (empty($record->check_out_time)) {
                $record->check_out_time = $currentTime;
                // $duration = $record->check_in_time->diffInMinutes($currentTime); 
                $record->save();
                $message = 'Check-out registrado con éxito a las ' . $currentTime->format('H:i:s');
            } else {
                DB::rollBack();
                return back()->with('error', 'Ya has registrado tu entrada y salida hoy.');
            }

            DB::commit();
            return back()->with('success', $message);
            
        } catch (\Exception $e) {
            DB::rollBack();
            return back()->with('error', 'Ocurrió un error al registrar el marcaje.');
        }
    }
}
