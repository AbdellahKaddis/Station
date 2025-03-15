<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class StationOpeningHour extends Model
{
    protected $fillable = [
        'station_id',
        'day',
        'opening_time',
        'closing_time',
    ];

    // Define the relationship with Station
    public function station()
    {
        return $this->belongsTo(Station::class);
    }
}
