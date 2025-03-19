<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tank extends Model
{
    use HasFactory;
    protected $fillable = [
        'name',
        'capacity',
        'current_volume',
        'fuel_type_id',
        'station_id'
    ];

    public function pumps()
    {
        return $this->hasMany(Pump::class);
    }

    public function fuelType()
    {
        return $this->belongsTo(FuelType::class);
    }

    public function station()
    {
        return $this->belongsTo(Station::class);
    }

    public function stockEntries()
    {
        return $this->hasMany(StockEntry::class);
    }
}
