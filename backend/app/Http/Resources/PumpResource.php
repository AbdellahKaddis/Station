<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PumpResource extends JsonResource
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
            'code' => $this->code,
            'statuts' => $this->statuts,
            'flow' => $this->flow,
            'tank_id' => $this->tank_id,
            'tank' => new TankResource($this->whenLoaded('tank')),
            'station' => $this->whenLoaded('station'), // Include station if loaded
            // 'station' => new StationResource($this->whenLoaded('station')), // Include station if loaded
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
