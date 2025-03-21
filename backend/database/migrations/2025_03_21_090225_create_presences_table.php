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
        Schema::create('presences', function (Blueprint $table) {
            $table->id();
            $table->unsignedSmallInteger('week'); 
            $table->unsignedTinyInteger('day'); 
            $table->time('start_time'); 
            $table->time('end_time'); 
            $table->unsignedSmallInteger('year'); 
            $table->unsignedBigInteger('employee_id'); 
            $table->enum('status',['present','absent']); 
            $table->timestamps(); 
            // Foreign key constraint
            $table->foreign('employee_id')
                  ->references('id')
                  ->on('employees')
                  ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('presences');
    }
};
