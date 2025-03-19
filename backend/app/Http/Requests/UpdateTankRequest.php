<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateTankRequest extends FormRequest
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
            'name' => 'sometimes|string|unique:tanks,name,'.$this->tank->id,
            'capacity' => 'sometimes|numeric|min:0',
            'current_volume' => 'sometimes|numeric|min:0|max:' . $this->input('capacity'),
            'fuel_type_id' => 'sometimes|exists:fuel_types,id',
            'station_id' => 'sometimes|exists:stations,id',
        ];
    }
}
