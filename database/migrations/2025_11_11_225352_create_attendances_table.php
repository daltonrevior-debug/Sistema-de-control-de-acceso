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
Schema::create('attendances', function (Blueprint $table) {
            $table->id();
            $table->foreignId('employee_id')->constrained()->onDelete('cascade');      
            $table->dateTime('check_in_at');
            $table->dateTime('check_out_at')->nullable(); 
            $table->string('check_in_ip')->nullable();
            $table->string('check_out_ip')->nullable();
            $table->enum('status', ['normal', 'tardy', 'corrected'])->default('normal');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('attendances');
    }
};
