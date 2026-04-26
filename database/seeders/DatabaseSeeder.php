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
        // Seed demo accounts and request data for local testing.
        $this->call([
            AdminAndTechnicianSeeder::class,
            MaintenanceRequestSeeder::class,
            OfferSeeder::class,
            RequestStatusHistorySeeder::class,
        ]);
    }
}
