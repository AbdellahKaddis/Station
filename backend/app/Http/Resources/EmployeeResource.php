<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class EmployeeResource extends JsonResource
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
        'employee_cin' => $this->employee_cin,
        'first_name' => $this->first_name,
        'last_name' => $this->last_name,
        'email' => $this->email,
        'phone' => $this->phone,
        'gender' => $this->gender,
        'date_of_birth' => $this->date_of_birth->format('Y-m-d'),
        'address' => $this->address,
        'nationality' => $this->nationality,
        'status' => $this->status,
        'cnss_number' => $this->cnss_number,
        'contract_type' => $this->contract_type,
        'created_at' => $this->created_at,
        'updated_at' => $this->updated_at,
        'stations' => $this->stations,
        ];
    }
}
