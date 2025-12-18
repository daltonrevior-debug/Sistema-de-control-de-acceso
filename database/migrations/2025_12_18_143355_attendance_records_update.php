<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{

    public function up(): void
    {
        Schema::table('attendance_records', function (Blueprint $table) {
            $table->string('check_in_ip', 45)->nullable()->after('check_in_time');
            $table->string('check_out_ip', 45)->nullable()->after('check_out_time');
            $table->string('status')->default('present')->after('check_out_ip');
        });
    }

    public function down(): void
    {
        Schema::table('attendance_records', function (Blueprint $table) {
            $table->dropColumn(['check_in_ip', 'check_out_ip', 'status']);
        });
    }
};
