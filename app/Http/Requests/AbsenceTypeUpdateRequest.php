<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class AbsenceTypeUpdateRequest extends FormRequest
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
        $typeId = $this->route('absence_type')->id;

        return [
            'name' => ['required', 'string', 'max:100', \Illuminate\Validation\Rule::unique('absence_types', 'name')->ignore($typeId)],
            'description' => ['nullable', 'string', 'max:500'],
            'is_paid' => ['required', 'boolean'],
        ];
    }
}
