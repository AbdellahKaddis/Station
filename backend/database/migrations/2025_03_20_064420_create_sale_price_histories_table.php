<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('sale_price_histories', function (Blueprint $table) {
            $table->id();
            $table->date('start_date'); 
            $table->date('end_date')->nullable(); 
            $table->decimal('sale_price', 10, 2);
            $table->foreignId('fuel_type_id')->constrained('fuel_types')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sale_price_histories');
    }
};
