<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pump extends Model
{
    use HasFactory;
    protected $fillable = [
        'code',
        'statuts',
        'flow',
        'tank_id',
    ];
    public function tank()
    {
        return $this->belongsTo(Tank::class);
    }

        // Define an indirect relationship to FuelType through Tank
        public function fuelType()
        {
            return $this->hasOneThrough(FuelType::class, Tank::class, 'id', 'id', 'tank_id', 'fuel_type_id');
        }
        public function station()
        {
            return $this->hasOneThrough(Station::class, Tank::class, 'id', 'id', 'tank_id', 'station_id');
        }
}
