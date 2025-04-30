<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class EmployeeStationResource extends JsonResource
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
            'employee' => [
                'id' => $this->employee->id,
                'name' => $this->employee->first_name . ' ' . $this->employee->last_name,
            ],
            'station' => [
                'id' => $this->station->id,
                'name' => $this->station->name,
            ],
            'start_date' => $this->start_date,
            'end_date' => $this->end_date,
        ];
    }
}
