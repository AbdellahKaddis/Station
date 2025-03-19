<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class StockEntryResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id'             => $this->id,
            'entry_date'     => $this->entry_date,
            'quantity'       => $this->quantity,
            'purchase_price' => $this->purchase_price,
            'tank'           => new TankResource($this->tank),
            'fuel_type'      => $this->fuelType,
            'supplier'       => new SupplierResource($this->supplier),
            'created_at'     => $this->created_at->toDateTimeString(),
            'updated_at'     => $this->updated_at->toDateTimeString(),
        ];
    }
}
