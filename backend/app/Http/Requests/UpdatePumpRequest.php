<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdatePumpRequest extends FormRequest
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
            'code' => 'sometimes|string|unique:pumps,code,' . $this->pump->id,
            'statuts' => 'sometimes|in:active,under_maintenance,out_of_service',
            'flow' => 'sometimes|numeric|min:0',
            'tank_id' => 'sometimes|exists:tanks,id',
        ];
    }
}
