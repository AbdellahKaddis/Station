<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;

class Station extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'name',
        'address',
        'city',
        'service_start_date',
        'latitude',
        'longitude',
        'phone',
        'email',
        'status',
    ];

    public function openingHours()
    {
        return $this->hasMany(StationOpeningHour::class);
    }

    public function employees()
    {
        return $this->belongsToMany(Employee::class, 'employee_station')
                    ->using(EmployeeStation::class)
                    ->withPivot('start_date', 'end_date');
    }
}
