<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class EmployeeUpdateRequest extends FormRequest
{
    public function authorize(): bool
    {
        return auth()->check(); 
    }

    public function rules(): array
    {
        $employeeId = $this->route('employee')->id;

        return [
            'first_name' => ['required', 'string', 'max:40'],
            'last_name' => ['required', 'string', 'max:40'],
            'personal_email' => ['nullable', 'string', 'email', 'max:255'], 
            'phone' => ['nullable', 'string', 'max:12'],
            'birth_date' => ['nullable', 'date'],
            'birth_place' => ['nullable', 'string', 'max:255'],
            'marital_status' => ['nullable', 'in:soltero,casado,viudo,divorciado'],
            'current_address' => ['nullable', 'string'],
            'photo' => ['nullable', 'image', 'mimes:jpeg,png,jpg', 'max:2048'],
            'employee_id' => [
                'required', 
                'string', 
                'max:20', 
                Rule::unique('employees', 'employee_id')->ignore($employeeId)
            ],
            'hire_date' => ['required', 'date'],
            'department_id' => ['required', 'exists:departments,id'],
            'position' => ['nullable', 'string', 'max:255'],
            'status' => ['required', 'in:active,inactive,terminated'],
            'schedule_id' => ['nullable', 'exists:schedules,id'],
        ];
    }
}