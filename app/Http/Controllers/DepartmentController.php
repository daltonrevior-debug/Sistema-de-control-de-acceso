<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\Department;
use Illuminate\Validation\Rule;

class DepartmentController extends Controller
{
    public function index()
    {
        $departments = Department::orderBy('name')
            ->paginate(10);

        return Inertia::render('config/DepartmentIndex', [
            'departments' => $departments,
        ]);
    }

    public function create()
    {
        return Inertia::render('config/DepartmentCreate');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:100', 'unique:departments,name'],
            'description' => ['nullable', 'string', 'max:500'],
        ]);
        
        Department::create($validated);

        return redirect()->route('config.departments.index')->with('success', 'Departamento creado exitosamente.');
    }

    public function edit(Department $department)
    {
        return Inertia::render('config/DepartmentEdit', [
            'department' => $department,
        ]);
    }

    public function update(Request $request, Department $department)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:100', Rule::unique('departments', 'name')->ignore($department->id)],
            'description' => ['nullable', 'string', 'max:500'],
        ]);
        
        $department->update($validated);

        return redirect()->route('config.departments.index')->with('success', 'Departamento actualizado exitosamente.');
    }

    public function destroy(Department $department)
    {
        // Antes de eliminar, todos los empleados asignados a este departamento
        // deberían ser reasignados a NULL (o a otro departamento por defecto). Para futuras implementaciones
        $department->delete();

        return redirect()->route('config.departments.index')->with('success', 'Departamento eliminado.');
    }
}
