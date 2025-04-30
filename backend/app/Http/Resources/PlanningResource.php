<?php

namespace App\Http\Resources;

use DateTime;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PlanningResource extends JsonResource
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
            'week' => $this->week,
            'day' => $this->day,
            'start_time' => (new DateTime($this->start_time))->format('H:i'),  // Format start_time to 'HH:MM'
            'end_time' => (new DateTime($this->end_time))->format('H:i'),  
            'year' => $this->year,
            'employee_id' => $this->employee_id,
            'employee' => new EmployeeResource($this->whenLoaded('employee')), // Include employee data if loaded
            'created_at' => $this->created_at->toDateTimeString(),
            'updated_at' => $this->updated_at->toDateTimeString(),
        ];
    }
}
