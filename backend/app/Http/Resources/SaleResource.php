<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SaleResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return  [
            'id' => $this->id,
            'quantity' => $this->quantity,
            'sale_date' => $this->sale_date,
            'amount' => $this->amount,
            'payment_method' => $this->payment_method,
            'sale_price_history' => $this->salePriceHistory,
            'meter_reading' => $this->meterReading,
            'created_at' => $this->created_at->toDateTimeString(),
            'updated_at' => $this->updated_at->toDateTimeString(),
        ];
    }
}
