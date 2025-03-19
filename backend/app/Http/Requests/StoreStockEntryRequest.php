<?php

namespace App\Http\Requests;

use App\Rules\TankMatchesFuelType;
use Illuminate\Foundation\Http\FormRequest;

class StoreStockEntryRequest extends FormRequest
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
            'entry_date'      => 'required|date',
            'quantity'        => 'required|numeric|min:0',
            'purchase_price'  => 'required|numeric|min:0',
            'tank_id'         =>  ['required', 'exists:tanks,id', new TankMatchesFuelType($this->fuel_type_id)],
            'fuel_type_id'    => 'required|exists:fuel_types,id',
            'supplier_id'     => 'required|exists:suppliers,id',
        ];
    }
}
