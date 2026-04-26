<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminAndTechnicianSeeder extends Seeder
{
    /**
     * Seed the main demo accounts.
     */
    public function run(): void
    {
        // Create the admin account used for demos.
        User::query()->updateOrCreate(
            ['email' => 'admin@system.com'],
            [
                'full_name' => 'System Admin',
                'phone' => '123456789',
                'password_hash' => Hash::make('password123'),
                'role' => 'admin',
                'is_active' => true,
            ],
        );

        // Create the technician account used for demos.
        User::query()->updateOrCreate(
            ['email' => 'tech@service.com'],
            [
                'full_name' => 'Professional Tech',
                'phone' => '987654321',
                'password_hash' => Hash::make('password123'),
                'role' => 'technician',
                'is_active' => true,
            ],
        );

        // Create one client account for the full request flow.
        User::query()->updateOrCreate(
            ['email' => 'client@system.com'],
            [
                'full_name' => 'Demo Client',
                'phone' => '555123456',
                'password_hash' => Hash::make('password123'),
                'role' => 'client',
                'is_active' => true,
            ],
        );
    }
}
