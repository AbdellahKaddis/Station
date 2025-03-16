<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateEmployeeRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'employee_cin' => 'sometimes|string|unique:employees,employee_cin,' .$this->employee->id,
            'last_name' => 'sometimes|string',
            'first_name' => 'sometimes|string',
            'email' => 'sometimes|email|unique:employees,email,' .$this->employee->id,
            'phone' => 'sometimes|string',
            'gender' => 'sometimes|in:male,female',
            'date_of_birth' => 'sometimes|date',
            'address' => 'nullable|string',
            'nationality' => 'nullable|string',
            'status' => 'sometimes|in:active,terminated',
            'cnss_number' => 'nullable|string',
            'contract_type' => 'sometimes|in:CDI,CDD',
        ];
    }
}
