<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ScheduleUpdateRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return auth()->check();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $scheduleId = $this->route('schedule');

        $id = $scheduleId instanceof \App\Models\Schedule ? $scheduleId->id : $scheduleId;

        return [
            'name' => ['required', 'string', 'max:100', \Illuminate\Validation\Rule::unique('schedules', 'name')->ignore($id)],
            'start_time' => ['required', 'date_format:H:i'],
            'end_time' => ['required', 'date_format:H:i', 'after:start_time'],
            'tardy_tolerance_minutes' => ['required', 'integer', 'min:0', 'max:60'],
        ];
    }
}
