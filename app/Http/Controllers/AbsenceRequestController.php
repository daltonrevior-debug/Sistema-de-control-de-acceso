<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\AbsenceRequest;
use App\Models\AbsenceType;
use App\Models\Employee;

class AbsenceRequestController extends Controller
{
    protected function getEmployeeId()
    {
        $employee = Employee::first(); 
        return $employee ? $employee->id : null; 
    }

    public function createEmployeeRequest()
    {
        $absenceTypes = AbsenceType::select('id', 'name', 'is_paid')->get();
        
        return Inertia::render('attendance/AbsenceRequestCreate', [
            'absenceTypes' => $absenceTypes,
        ]);
    }

    public function storeEmployeeRequest(Request $request)
    {
        $employeeId = $this->getEmployeeId();
        if (!$employeeId) {
            return back()->with('error', 'No se pudo vincular al usuario autenticado con un registro de empleado.');
        }
        
        $validated = $request->validate([
            'absence_type_id' => ['required', 'exists:absence_types,id'],
            'start_date' => ['required', 'date', 'after_or_equal:today'],
            'end_date' => ['required', 'date', 'after_or_equal:start_date'],
            'reason' => ['required', 'string', 'max:500'],
        ]);

        AbsenceRequest::create([
            'employee_id' => $employeeId,
            'absence_type_id' => $validated['absence_type_id'],
            'start_date' => $validated['start_date'],
            'end_date' => $validated['end_date'],
            'reason' => $validated['reason'],
            'status' => 'pending',
        ]);

        return redirect()->route('attendance.index')->with('success', 'Solicitud de ausencia enviada. Esperando aprobación.');
    }

    public function indexAdminReview()
    {
        $requests = AbsenceRequest::with('employee:id,first_name,last_name', 'absenceType:id,name')
            ->orderByRaw("FIELD(status, 'pending', 'approved', 'rejected')")
            ->orderByDesc('created_at')
            ->paginate(10);

        return Inertia::render('config/AbsenceRequestIndex', [
            'requests' => $requests,
        ]);
    }

    public function approve(AbsenceRequest $absenceRequest)
    {
        if ($absenceRequest->status !== 'pending') { return back()->with('error', 'Esta solicitud ya fue procesada.'); }

        $absenceRequest->update([
            'status' => 'approved',
            'approver_id' => auth()->id(), 
        ]);

        return redirect()->route('config.absence-requests.index')->with('success', 'Solicitud de ausencia aprobada.');
    }

    public function reject(Request $request, AbsenceRequest $absenceRequest)
    {
        if ($absenceRequest->status !== 'pending') { return back()->with('error', 'Esta solicitud ya fue procesada.'); }
        
        $request->validate(['rejection_reason' => ['required', 'string', 'min:10']]);

        $absenceRequest->update([
            'status' => 'rejected',
            'rejection_reason' => $request->rejection_reason,
            'approver_id' => auth()->id(),
        ]);

        return redirect()->route('config.absence-requests.index')->with('success', 'Solicitud de ausencia rechazada.');
    }

    public function employeeHistory()
    {
        $employeeId = $this->getEmployeeId(); 

        if (!$employeeId) {
            return back()->with('error', 'Su perfil de usuario no está vinculado a un empleado activo.');
        }

        $requests = AbsenceRequest::where('employee_id', $employeeId)
            ->with('absenceType:id,name', 'approver:id,name')
            ->orderByDesc('created_at')
            ->paginate(10);

        return Inertia::render('attendance/AbsenceRequestHistory', [
            'requests' => $requests,
        ]);
    }
}
