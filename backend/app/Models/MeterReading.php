<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MeterReading extends Model
{
    use HasFactory;
    protected $fillable = [
        'initial_reading',
        'final_reading',
        'pump_id',
    ];

    public function pump()
    {
        return $this->belongsTo(Pump::class);
    }

    public function sales()
    {
        return $this->hasMany(Sale::class);
    }
}
