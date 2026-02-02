<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\AbsenceType;

class AbsenceTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        AbsenceType::firstOrCreate(
            ['name' => 'Suspension'],
            [
                'description' => 'Ausencia generada automáticamente por una medida disciplinaria.',
                'is_paid' => false,
            ]
        );
    }
}
