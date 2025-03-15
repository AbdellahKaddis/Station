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
        Schema::create('employees', function (Blueprint $table) {
            $table->id();
            $table->string('employee_cin', 20)->unique();
            $table->string('last_name', 100);
            $table->string('first_name', 100);
            $table->string('email', 255)->unique();
            $table->string('phone', 20);
            $table->enum('gender', ['male', 'female']);
            $table->date('date_of_birth');
            $table->string('address', 255)->nullable();
            $table->string('nationality', 100)->nullable();
            $table->enum('status', ['active','terminated']);
            $table->string('cnss_number', 50)->nullable();
            $table->enum('contract_type', ['CDI', 'CDD']);
            $table->softDeletes(); 
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('employees');
    }
};
