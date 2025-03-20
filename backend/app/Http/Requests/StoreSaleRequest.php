<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreSaleRequest extends FormRequest
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
            'quantity' => 'required|numeric',
            'amount' => 'required|numeric',
            'sale_date' => 'required|date',
            'payment_method' => 'required|in:cash,card',
            'sale_price_history_id' => 'required|exists:sale_price_histories,id',
            'meter_reading_id' => 'required|exists:meter_readings,id',
        ];
    }
}
