<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\Pivot;

class EmployeeStation extends Pivot
{
    protected $fillable = ['employee_id', 'station_id', 'start_date', 'end_date'];
    public $timestamps = false;
    public function employee()
    {
        return $this->belongsTo(Employee::class, 'employee_id');
    }

    public function station()
    {
        return $this->belongsTo(Station::class, 'station_id');
    }
}
