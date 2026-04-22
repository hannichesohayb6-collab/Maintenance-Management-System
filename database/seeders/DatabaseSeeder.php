<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // استدعاء الـ Seeder الخاص بحسابات المسؤول والفني
        $this->call([
            AdminAndTechnicianSeeder::class,
        ]);
    }
}