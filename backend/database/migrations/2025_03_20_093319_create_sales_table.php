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
        Schema::create('sales', function (Blueprint $table) {
            $table->id();
            $table->decimal('quantity', 10, 2); 
            $table->date('sale_date');
            $table->decimal('amount', 10, 2); 
            $table->enum('payment_method',['cash','card']);

            // Foreign Keys
            $table->unsignedBigInteger('sale_price_history_id'); 
            $table->unsignedBigInteger('meter_reading_id');

            // Foreign Key Constraints
            $table->foreign('sale_price_history_id')->references('id')->on('sale_price_histories')->onDelete('cascade');
            $table->foreign('meter_reading_id')->references('id')->on('meter_readings')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sales');
    }
};
