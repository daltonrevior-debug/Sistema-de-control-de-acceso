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
        Schema::table('employees', function (Blueprint $table) {
            $table->date('birth_date')->nullable()->after('phone');
            $table->string('birth_place')->nullable()->after('birth_date');          
            $table->enum('marital_status', ['soltero', 'casado', 'viudo', 'divorciado'])
                ->default('soltero')
                ->after('birth_place');
            $table->text('current_address')->nullable()->after('marital_status');
            $table->string('photo')->nullable()->after('current_address');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('employees', function (Blueprint $table) {
            $table->dropColumn([
                'birth_date',
                'birth_place',
                'marital_status',
                'current_address',
                'photo'
            ]);
        });
    }
};