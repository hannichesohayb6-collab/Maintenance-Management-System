<?php

namespace Database\Seeders;

use App\Models\MaintenanceRequest;
use App\Models\User;
use Illuminate\Database\Seeder;

class MaintenanceRequestSeeder extends Seeder
{
    /**
     * Seed demo requests for the new request lifecycle.
     */
    public function run(): void
    {
        $user = User::query()->where('email', 'client@system.com')->firstOrFail();
        $technician = User::query()->where('email', 'tech@service.com')->firstOrFail();

        $requests = [
            [
                'title' => 'Water leak in kitchen',
                'description' => 'The kitchen sink is leaking under the cabinet.',
                'location' => 'Building A - Kitchen',
                'priority' => 'high',
                'status' => 'pending',
                'assigned_technician_id' => null,
            ],
            [
                'title' => 'Air conditioner inspection',
                'description' => 'The office air conditioner needs inspection.',
                'location' => 'Building C - Office 203',
                'priority' => 'urgent',
                'status' => 'pending',
                'assigned_technician_id' => null,
            ],
            [
                'title' => 'Broken hallway light',
                'description' => 'The main hallway light does not turn on.',
                'location' => 'Building B - Hallway',
                'priority' => 'medium',
                'status' => 'technician_assigned',
                'assigned_technician_id' => $technician->id,
            ],
            [
                'title' => 'Door lock replacement',
                'description' => 'The front office lock is damaged.',
                'location' => 'Building A - Front Office',
                'priority' => 'high',
                'status' => 'in_progress',
                'assigned_technician_id' => $technician->id,
            ],
            [
                'title' => 'Ceiling fan repair',
                'description' => 'The fan makes noise and stops spinning.',
                'location' => 'Building D - Meeting Room',
                'priority' => 'low',
                'status' => 'completed',
                'assigned_technician_id' => $technician->id,
            ],
        ];

        foreach ($requests as $request) {
            MaintenanceRequest::query()->updateOrCreate(
                ['title' => $request['title']],
                [...$request, 'user_id' => $user->id],
            );
        }
    }
}
