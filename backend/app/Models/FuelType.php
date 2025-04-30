<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FuelType extends Model
{
    use HasFactory;
    protected $fillable = ['name'];
    public function tanks()
    {
        return $this->hasMany(Tank::class);
    }

    public function stockEntries()
    {
        return $this->hasMany(StockEntry::class);
    }

    public function salePriceHistories()
    {
        return $this->hasMany(SalePriceHistory::class);
    }
}
