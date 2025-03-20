<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateSaleRequest extends FormRequest
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
            'quantity' => 'sometimes|numeric',
            'sale_date' => 'sometimes|date',
            'amount' => 'sometimes|numeric',
            'payment_method' => 'sometimes|in:cash,card',
            'sale_price_history_id' => 'sometimes|exists:sale_price_histories,id',
            'meter_reading_id' => 'sometimes|exists:meter_readings,id',
        ];
    }
}
