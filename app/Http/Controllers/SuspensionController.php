<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreSuspensionRequest;
use App\Models\Employee;
use App\Models\Suspension;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\AbsenceType;
use App\Models\AbsenceRequest;
use Illuminate\Support\Facades\DB;

class SuspensionController extends Controller
{
    public function index()
    {
        $suspensions = Suspension::with('employee:id,first_name,last_name,employee_id')
            ->orderBy('start_date', 'desc')
            ->paginate(10);

        return Inertia::render('suspension/SuspensionIndex', [
            'suspensions' => $suspensions
        ]);
    }

    public function create()
    {
        $employees = Employee::select('id', 'first_name', 'last_name', 'employee_id')
            ->orderBy('first_name')
            ->get()
            ->map(function ($employee) {
                return [
                    'id' => $employee->id,
                    'name' => $employee->first_name . ' ' . $employee->last_name . ' (' . $employee->employee_id . ')'
                ];
            });

        return Inertia::render('suspension/SuspensionCreate', [
            'employees' => $employees
        ]);
    }

    public function store(StoreSuspensionRequest $request)
    {
        try {
            DB::beginTransaction();

            $suspension = Suspension::create($request->validated());

            $absenceType = AbsenceType::where('name', 'Suspension')->first();

            if (!$absenceType) {
                throw new \Exception("El tipo de ausencia 'Suspensión Disciplinaria' no existe.");
            }

            AbsenceRequest::create([
                'employee_id'     => $suspension->employee_id,
                'absence_type_id' => $absenceType->id,
                'start_date'      => $suspension->start_date,
                'end_date'        => $suspension->end_date,
                'status'          => 'approved',
                'reason'          => 'Generado automáticamente por Suspensión: ' . $suspension->reason,
                'approver_id'     => $request->user()->id,
            ]);

            DB::commit();

            return redirect()->route('personnel.suspensions.index')
                ->with('message', 'Suspensión y registro de ausencia creados correctamente.');
        } catch (\Exception $e) {
            DB::rollBack();
            return back()->with('error', 'Error al procesar la suspensión: ' . $e->getMessage());
        }
    }

    public function edit(Suspension $suspension)
    {
        $employees = Employee::select('id', 'first_name', 'last_name', 'employee_id')
            ->orderBy('first_name')
            ->get()
            ->map(function ($employee) {
                return [
                    'id' => $employee->id,
                    'name' => $employee->first_name . ' ' . $employee->last_name
                ];
            });

        return Inertia::render('suspension/SuspensionEdit', [
            'suspension' => $suspension,
            'employees'  => $employees
        ]);
    }

    public function update(StoreSuspensionRequest $request, Suspension $suspension)
    {
        try {
            DB::beginTransaction();

            $suspension->update($request->validated());

            AbsenceRequest::where('employee_id', $suspension->employee_id)
                ->where('reason', 'like', 'Generado automáticamente por Suspensión%')
                ->where('start_date', $suspension->getOriginal('start_date'))
                ->update([
                    'start_date' => $suspension->start_date,
                    'end_date'   => $suspension->end_date,
                ]);

            DB::commit();
            return redirect()->route('personnel.suspensions.index')->with('message', 'Registro actualizado.');
        } catch (\Exception $e) {
            DB::rollBack();
            return back()->with('error', 'Error al actualizar.');
        }
    }

    public function destroy(Suspension $suspension)
    {
        try {
            DB::beginTransaction();

            AbsenceRequest::where('employee_id', $suspension->employee_id)
                ->where('start_date', $suspension->start_date)
                ->where('end_date', $suspension->end_date)
                ->where('reason', 'like', 'Generado automáticamente por Suspensión%')
                ->delete();

            $suspension->delete();

            DB::commit();

            return redirect()->route('personnel.suspensions.index')
                ->with('message', 'Suspensión y registro de ausencia eliminados correctamente.');
        } catch (\Exception $e) {
            DB::rollBack();
            return back()->with('error', 'Error al eliminar el registro: ' . $e->getMessage());
        }
    }
}
