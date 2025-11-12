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
Schema::create('schedules', function (Blueprint $table) {
        $table->id();
        $table->string('name')->unique(); // Nombre del horario (Ej: 8 a 4, Tarde)
        
        // Hora exacta de entrada esperada (Ej: '08:00:00')
        $table->time('start_time'); 
        // Hora exacta de salida esperada (Ej: '14:00:00')
        $table->time('end_time');   

        // Tolerancia en minutos para la entrada (Ej: 15 minutos)
        $table->unsignedSmallInteger('tardy_tolerance_minutes')->default(15); 
        
        $table->timestamps();
    });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('schedules');
    }
};
