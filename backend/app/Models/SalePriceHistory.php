<?php

namespace App\Models;

use App\Models\FuelType;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class SalePriceHistory extends Model
{
    use HasFactory;
    protected $fillable = [
        'start_date',
        'end_date',
        'sale_price',
        'fuel_type_id',
    ];
    public $timestamps = false;
    public function fuelType()
    {
        return $this->belongsTo(FuelType::class);
    }
    public function station()
    {
        return $this->belongsTo(Station::class);
    }
    public function sales()
    {
        return $this->hasMany(Sale::class);
    }
}
