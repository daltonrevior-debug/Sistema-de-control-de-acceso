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
        //Se actualizara la tabla de department para borrar la columna is_Active y reemplazarla con description
        Schema::table('departments', function (Blueprint $table) {
            $table->dropColumn('is_active'); 
            $table->text('description')->nullable()->after('name'); 
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('departments', function (Blueprint $table) {
            $table->dropColumn('description');  
            $table->boolean('is_active')->default(true);
        });
    }
};
