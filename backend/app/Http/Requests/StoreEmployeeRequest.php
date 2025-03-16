<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreEmployeeRequest extends FormRequest
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
            'employee_cin' => 'required|string|unique:employees',
            'last_name' => 'required|string',
            'first_name' => 'required|string',
            'email' => 'required|email|unique:employees',
            'phone' => 'required|string',
            'gender' => 'required|in:male,female',
            'date_of_birth' => 'required|date',
            'address' => 'nullable|string',
            'nationality' => 'nullable|string',
            'status' => 'required|in:active,terminated',
            'cnss_number' => 'nullable|string',
            'contract_type' => 'required|in:CDI,CDD',
        ];
    }
}
