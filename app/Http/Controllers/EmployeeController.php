<?php
namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\User;
use App\Models\Department;
use App\Models\Schedule;
use App\Models\Employee;
use App\Http\Requests\EmployeeStoreRequest;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;
use App\Http\Requests\EmployeeUpdateRequest;

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

            Employee::create([
                'first_name' => $request->first_name,
                'last_name' => $request->last_name,
                'personal_email' => $request->personal_email,
                'employee_id' => $request->employee_id,
                'hire_date' => $request->hire_date,
                'department_id' => $request->department_id,
                'schedule_id' => $request->schedule_id,
                'position' => $request->position,
                'phone' => $request->phone,
            ]);

            DB::commit();

            return redirect()->route('personnel.employees.index')->with('success', 'Empleado creado exitosamente como registro de personal.');

        } catch (\Exception $e) {
            DB::rollBack();
            // Esto es importante para mostrar un error al usuario si la transacción falla
            return back()->with('error', 'Error al crear el empleado. Intente de nuevo. Detalles: ' . $e->getMessage());
        }
    }

    /**
     * Muestra el formulario para editar el empleado especificado.
     * @param Employee $employee - Inyección de dependencia (Model Binding)
     */
    public function edit(Employee $employee)
    {
        // Precargar la información relacionada con el empleado.
        $employee->load('department');
        $employee->load('schedule');  

        // Necesitamos la lista de departamentos para el select del formulario.
        $departments = Department::select('id', 'name','description')->get();
        $schedule = Schedule::select('id', 'name', 'tardy_tolerance_minutes')->get();

        return Inertia::render('personnel/EmployeeEdit', [
            'employee' => $employee,
            'departments' => $departments,
            'schedule' => $schedule
        ]);
    }

    /**
     * Actualiza el empleado especificado en la base de datos.
     * @param EmployeeUpdateRequest $request - Validación de la actualización
     * @param Employee $employee - El empleado a actualizar
     */
    public function update(EmployeeUpdateRequest $request, Employee $employee)
    {
        try {
            // Actualizar solo los campos de la tabla 'employees'
            $employee->update([
                'first_name' => $request->first_name,
                'last_name' => $request->last_name,
                'personal_email' => $request->personal_email,
                'employee_id' => $request->employee_id,
                'hire_date' => $request->hire_date,
                'department_id' => $request->department_id,
                'schedule_id' => $request->schedule_id,
                'position' => $request->position,
                'phone' => $request->phone,
                'status' => $request->status,
            ]);

            return redirect()->route('personnel.employees.index')->with('success', 'Información del empleado actualizada exitosamente.');

        } catch (\Exception $e) {
            return back()->with('error', 'Error al actualizar el empleado. Intente de nuevo.');
        }
    }
}
