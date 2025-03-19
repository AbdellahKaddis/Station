<?php

namespace App\Http\Requests;

use App\Rules\TankMatchesFuelType;
use Illuminate\Foundation\Http\FormRequest;

class UpdateStockEntryRequest extends FormRequest
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
            'entry_date'      => 'sometimes|date',
            'quantity'        => 'sometimes|numeric|min:0',
            'purchase_price'  => 'sometimes|numeric|min:0',
            'tank_id'         =>  ['sometimes', 'exists:tanks,id', new TankMatchesFuelType($this->fuel_type_id)],
            'fuel_type_id'    => 'sometimes|exists:fuel_types,id',
            'supplier_id'     => 'sometimes|exists:suppliers,id',
        ];
    }
}
