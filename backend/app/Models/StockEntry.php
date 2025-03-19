<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StockEntry extends Model
{
    use HasFactory;
    protected $fillable = [
        'entry_date',
        'quantity',
        'purchase_price',
        'tank_id',
        'supplier_id',
        'fuel_type_id',
    ];

    // Relationship to Tank
    public function tank()
    {
        return $this->belongsTo(Tank::class);
    }

    // Relationship to Supplier
    public function supplier()
    {
        return $this->belongsTo(Supplier::class);
    }

    public function fuelType()
    {
        return $this->belongsTo(FuelType::class);
    }
}
