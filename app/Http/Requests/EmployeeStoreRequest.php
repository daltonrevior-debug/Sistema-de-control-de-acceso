<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class EmployeeStoreRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        // return auth()->user()->hasRole('admin');
        return auth()->check(); //Solo se valida si el usuario esta logeado por los momento, aca se validara si tiene los permisos necesarios para proceder, ejemplo si posee rol admin
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            // --- Reglas para la tabla 'users' ---
            'first_name' => ['required', 'string', 'max:100'],
            'last_name' => ['required', 'string', 'max:100'],
            'personal_email' => ['nullable', 'string', 'email', 'max:255'],

            // --- Reglas para la tabla 'employees' ---
            // employee_id debe ser único en la tabla employees
            'employee_id' => ['required', 'string', 'max:20', 'unique:employees,employee_id'],
            'hire_date' => ['required', 'date'],
            // department_id debe existir en la tabla departments
            'department_id' => ['required', 'exists:departments,id'],
            'position' => ['nullable', 'string', 'max:255'],
            'phone' => ['nullable', 'string', 'max:15'],
        ];
    }
}
