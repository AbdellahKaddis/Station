<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Employee extends Model
{
    use SoftDeletes;
    protected $fillable = [
        'employee_cin',
        'last_name',
        'first_name',
        'email',
        'phone',
        'gender',
        'date_of_birth',
        'address',
        'nationality',
        'status',
        'cnss_number',
        'contract_type',
    ];

    protected $casts = [
        'date_of_birth' => 'date',
    ];

    public function stations()
    {
        return $this->belongsToMany(Station::class, 'employee_station')
                    ->using(EmployeeStation::class)
                    ->withPivot('start_date', 'end_date');
    }
}
