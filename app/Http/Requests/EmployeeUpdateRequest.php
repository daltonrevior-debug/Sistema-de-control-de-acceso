<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class EmployeeUpdateRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     * Solo permite la ejecución si el usuario está autenticado
     */
    public function authorize(): bool
    {
        // Temporalmente, solo revisamos que el usuario esté autenticado.
        return auth()->check(); 
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        // Capturamos el ID del empleado que se está editando desde la ruta.
        // Esto es crucial para la regla 'unique'.
        $employeeId = $this->route('employee')->id;

        return [
            // --- Reglas de Datos Personales ---
            'first_name' => ['required', 'string', 'max:100'],
            'last_name' => ['required', 'string', 'max:100'],
            'personal_email' => ['nullable', 'string', 'email', 'max:255'], 
            'phone' => ['nullable', 'string', 'max:15'],

            // --- Reglas de Datos Laborales ---
            
            // employee_id debe ser único, IGNORANDO el ID del empleado actual ($employeeId).
            'employee_id' => [
                'required', 
                'string', 
                'max:20', 
                Rule::unique('employees', 'employee_id')->ignore($employeeId)
            ],
            
            'hire_date' => ['required', 'date'],
            // department_id debe existir en la tabla departments.
            'department_id' => ['required', 'exists:departments,id'],
            'position' => ['nullable', 'string', 'max:255'],
            
            // El estado del empleado (activo, inactivo, terminado) es crucial.
            'status' => ['required', 'in:active,inactive,terminated'],
        ];
    }
}