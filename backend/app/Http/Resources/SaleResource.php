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
        return [
            'id' => $this->id,
            'quantity' => $this->quantity,
            'sale_date' => $this->sale_date,
            'amount' => $this->amount,
            'payment_method' => $this->payment_method,
            'sale_price_history' => $this->salePriceHistory,
            'meter_reading' => $this->meterReading ? [
                'id' => $this->meterReading->id,
                'initial_reading' => $this->meterReading->initial_reading,
                'final_reading' => $this->meterReading->final_reading,
                'pump_id' => $this->meterReading->pump_id,
                'created_at' => $this->meterReading->created_at->toDateTimeString(),
                'updated_at' => $this->meterReading->updated_at->toDateTimeString(),
                'pump' => $this->meterReading->pump ? [
                    'id' => $this->meterReading->pump->id,
                    'code' => $this->meterReading->pump->code,
                    'status' => $this->meterReading->pump->status,
                    'flow' => $this->meterReading->pump->flow,
                    'tank' => $this->meterReading->pump->tank ? [
                        'id' => $this->meterReading->pump->tank->id,
                        'fuel_type' => $this->meterReading->pump->tank->fuelType,
                        'station' => $this->meterReading->pump->tank->station,
                        // Add other tank attributes here if needed
                    ] : null,
                ] : null,
            ] : null,
            'created_at' => $this->created_at->toDateTimeString(),
            'updated_at' => $this->updated_at->toDateTimeString(),
        ];
    }
}
