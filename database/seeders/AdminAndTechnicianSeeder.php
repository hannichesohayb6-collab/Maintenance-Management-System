<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminAndTechnicianSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // 1. إنشاء حساب المسؤول (Admin)
        User::create([
            'full_name' => 'System Admin',
            'email' => 'admin@system.com',
            'phone' => '123456789',
            'password_hash' => Hash::make('password123'),
            'role' => 'admin',
            'is_active' => true,
        ]);

        // 2. إنشاء حساب فني (Technician)
        User::create([
            'full_name' => 'Professional Tech',
            'email' => 'tech@service.com',
            'phone' => '987654321',
            'password_hash' => Hash::make('password123'),
            'role' => 'technician',
            'is_active' => true,
        ]);
    }
}