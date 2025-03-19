<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreTankRequest extends FormRequest
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
            'name' => 'required|string|unique:tanks,name',
            'capacity' => 'required|numeric|min:0',
            'current_volume' => 'required|numeric|min:0|max:' . $this->input('capacity'),
            'fuel_type_id' => 'required|exists:fuel_types,id',
            'station_id' => 'required|exists:stations,id',
        ];
    }
}
