<?php

namespace Database\Seeders;

use App\Models\MaintenanceRequest;
use App\Models\RequestStatusHistory;
use App\Models\User;
use Illuminate\Database\Seeder;

class RequestStatusHistorySeeder extends Seeder
{
    /**
     * Seed a readable history trail for demo requests.
     */
    public function run(): void
    {
        $user = User::query()->where('email', 'client@system.com')->firstOrFail();
        $technician = User::query()->where('email', 'tech@service.com')->firstOrFail();

        $history = [
            'Water leak in kitchen' => [
                ['old_status' => null, 'new_status' => 'pending', 'note' => 'Request created by client.', 'changed_by' => $user->id, 'changed_at' => now()->subHours(8)],
            ],
            'Broken hallway light' => [
                ['old_status' => null, 'new_status' => 'pending', 'note' => 'Request created by client.', 'changed_by' => $user->id, 'changed_at' => now()->subDays(2)],
                ['old_status' => 'pending', 'new_status' => 'technician_assigned', 'note' => 'Client accepted an offer.', 'changed_by' => $user->id, 'changed_at' => now()->subDay()],
            ],
            'Air conditioner inspection' => [
                ['old_status' => null, 'new_status' => 'pending', 'note' => 'Request created by client.', 'changed_by' => $user->id, 'changed_at' => now()->subDays(3)],
            ],
            'Door lock replacement' => [
                ['old_status' => null, 'new_status' => 'pending', 'note' => 'Request created by client.', 'changed_by' => $user->id, 'changed_at' => now()->subDays(5)],
                ['old_status' => 'pending', 'new_status' => 'technician_assigned', 'note' => 'Client accepted an offer.', 'changed_by' => $user->id, 'changed_at' => now()->subDays(2)],
                ['old_status' => 'technician_assigned', 'new_status' => 'in_progress', 'note' => 'Work started.', 'changed_by' => $technician->id, 'changed_at' => now()->subDay()],
            ],
            'Ceiling fan repair' => [
                ['old_status' => null, 'new_status' => 'pending', 'note' => 'Request created by client.', 'changed_by' => $user->id, 'changed_at' => now()->subDays(7)],
                ['old_status' => 'pending', 'new_status' => 'technician_assigned', 'note' => 'Client accepted an offer.', 'changed_by' => $user->id, 'changed_at' => now()->subDays(4)],
                ['old_status' => 'technician_assigned', 'new_status' => 'in_progress', 'note' => 'Work started.', 'changed_by' => $technician->id, 'changed_at' => now()->subDays(3)],
                ['old_status' => 'in_progress', 'new_status' => 'completed', 'note' => 'Repair completed.', 'changed_by' => $technician->id, 'changed_at' => now()->subDays(2)],
            ],
        ];

        foreach ($history as $title => $entries) {
            $request = MaintenanceRequest::query()->where('title', $title)->firstOrFail();

            foreach ($entries as $entry) {
                RequestStatusHistory::query()->updateOrCreate(
                    [
                        'request_id' => $request->id,
                        'new_status' => $entry['new_status'],
                        'changed_at' => $entry['changed_at'],
                    ],
                    [
                        'changed_by' => $entry['changed_by'],
                        'old_status' => $entry['old_status'],
                        'note' => $entry['note'],
                    ],
                );
            }
        }
    }
}
