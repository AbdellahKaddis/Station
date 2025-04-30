<?php

// app/Models/Invitation.php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Invitation extends Model
{
    protected $fillable = ['email', 'token_hash', 'expires_at'];

    protected $casts = ['expires_at' => 'datetime'];

    public function scopeValid($query)
    {
        return $query->where('expires_at', '>', now());
    }
    
    // public function isExpired()
    // {
    //     return $this->expires_at->isPast();
    // }
}