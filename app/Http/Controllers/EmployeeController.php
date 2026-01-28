<?php
namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\User;
use App\Models\Department;
use App\Models\Schedule;
use App\Models\Employee;
use App\Http\Requests\EmployeeStoreRequest;
use App\Http\Requests\EmployeeUpdateRequest;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

use Illuminate\Http\Request;

class EmployeeController extends Controller
{
    public function index(Request $request)
    {
        $employees = Employee::with(['department', 'schedule'])
            ->latest()
            ->paginate(10);

        return Inertia::render('personnel/EmployeeIndex', [
            'employees' => $employees,
            'filters' => $request->only('search', 'status'),
        ]);
    }

    public function create()
    {
        $departments = Department::select('id', 'name', 'description')->get();
        $schedule = Schedule::select('id', 'name', 'tardy_tolerance_minutes')->get();

        return Inertia::render('personnel/EmployeeCreate', [
            'departments' => $departments,
            'schedule' => $schedule
        ]);
    }

public function store(EmployeeStoreRequest $request)
    {
        DB::beginTransaction();

        try {
            $data = $request->validated();

            if ($request->hasFile('photo')) {
                // Guarda en storage/app/public/employees
                $data['photo'] = $request->file('photo')->store('employees', 'public');
            }

            Employee::create([
                'first_name'      => $data['first_name'],
                'last_name'       => $data['last_name'],
                'personal_email'  => $data['personal_email'],
                'employee_id'     => $data['employee_id'],
                'hire_date'       => $data['hire_date'],
                'department_id'   => $data['department_id'],
                'schedule_id'     => $data['schedule_id'],
                'position'        => $data['position'],
                'phone'           => $data['phone'],
                'birth_date'      => $data['birth_date'] ?? null,
                'birth_place'     => $data['birth_place'] ?? null,
                'marital_status'  => $data['marital_status'] ?? 'soltero',
                'current_address' => $data['current_address'] ?? null,
                'photo'           => $data['photo'] ?? null,
            ]);

            DB::commit();

            return redirect()->route('personnel.employees.index')
                ->with('success', 'Empleado creado exitosamente con su información completa.');

        } catch (\Exception $e) {
            DB::rollBack();
            return back()->with('error', 'Error al crear el empleado: ' . $e->getMessage());
        }
    }

    public function edit(Employee $employee)
    {
        $employee->load('department');
        $employee->load('schedule');  

        $departments = Department::select('id', 'name','description')->get();
        $schedule = Schedule::select('id', 'name', 'tardy_tolerance_minutes')->get();

        return Inertia::render('personnel/EmployeeEdit', [
            'employee' => $employee,
            'departments' => $departments,
            'schedule' => $schedule
        ]);
    }

public function update(EmployeeUpdateRequest $request, Employee $employee)
    {
        try {
            $data = $request->validated();

            if ($request->hasFile('photo')) {
                if ($employee->photo) {
                    Storage::disk('public')->delete($employee->photo);
                }
                $data['photo'] = $request->file('photo')->store('employees', 'public');
            }

            $employee->update([
                'first_name'      => $data['first_name'],
                'last_name'       => $data['last_name'],
                'personal_email'  => $data['personal_email'],
                'employee_id'     => $data['employee_id'],
                'hire_date'       => $data['hire_date'],
                'department_id'   => $data['department_id'],
                'schedule_id'     => $data['schedule_id'],
                'position'        => $data['position'],
                'phone'           => $data['phone'],
                'status'          => $data['status'],
                'birth_date'      => $data['birth_date'] ?? $employee->birth_date,
                'birth_place'     => $data['birth_place'] ?? $employee->birth_place,
                'marital_status'  => $data['marital_status'] ?? $employee->marital_status,
                'current_address' => $data['current_address'] ?? $employee->current_address,
                'photo'      => $data['photo'] ?? $employee->photo,
            ]);

            return redirect()->route('personnel.employees.index')
                ->with('success', 'Información del empleado actualizada correctamente.');

        } catch (\Exception $e) {
            return back()->with('error', 'Error al actualizar el empleado.');
        }
    }
}
