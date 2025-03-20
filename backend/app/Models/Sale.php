<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Sale extends Model
{
    use HasFactory;

    protected $fillable = [
        'quantity',
        'sale_date',
        'payment_method',
        'sale_price_history_id',
        'meter_reading_id',
        'amount'
    ];

    // Relationships
    public function salePriceHistory()
    {
        return $this->belongsTo(SalePriceHistory::class);
    }

    public function meterReading()
    {
        return $this->belongsTo(MeterReading::class);
    }
}
