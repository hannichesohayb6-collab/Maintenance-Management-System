<?php

namespace Database\Seeders;

use App\Models\MaintenanceRequest;
use App\Models\Offer;
use App\Models\User;
use Illuminate\Database\Seeder;

class OfferSeeder extends Seeder
{
    /**
     * Seed demo offers for requests with open and accepted offers.
     */
    public function run(): void
    {
        $technician = User::query()->where('email', 'tech@service.com')->firstOrFail();

        $offers = [
            [
                'request_title' => 'Air conditioner inspection',
                'offer_description' => 'Inspect the unit, clean filters, and test cooling output.',
                'estimated_cost' => 180.00,
                'estimated_days' => 2,
                'status' => 'sent',
                'sent_at' => now()->subDay(),
                'responded_at' => null,
            ],
            [
                'request_title' => 'Broken hallway light',
                'offer_description' => 'Replace the light fixture and test the wiring.',
                'estimated_cost' => 85.00,
                'estimated_days' => 1,
                'status' => 'accepted',
                'sent_at' => now()->subDays(3),
                'responded_at' => now()->subDays(2),
            ],
            [
                'request_title' => 'Door lock replacement',
                'offer_description' => 'Replace the damaged lock and test two spare keys.',
                'estimated_cost' => 95.00,
                'estimated_days' => 1,
                'status' => 'accepted',
                'sent_at' => now()->subDays(3),
                'responded_at' => now()->subDays(2),
            ],
            [
                'request_title' => 'Ceiling fan repair',
                'offer_description' => 'Repair the fan motor and tighten the ceiling mount.',
                'estimated_cost' => 75.00,
                'estimated_days' => 1,
                'status' => 'accepted',
                'sent_at' => now()->subDays(5),
                'responded_at' => now()->subDays(4),
            ],
        ];

        foreach ($offers as $offer) {
            $request = MaintenanceRequest::query()->where('title', $offer['request_title'])->firstOrFail();

            Offer::query()->updateOrCreate(
                [
                    'request_id' => $request->id,
                    'technician_id' => $technician->id,
                ],
                [
                    'offer_description' => $offer['offer_description'],
                    'estimated_cost' => $offer['estimated_cost'],
                    'estimated_days' => $offer['estimated_days'],
                    'status' => $offer['status'],
                    'sent_at' => $offer['sent_at'],
                    'responded_at' => $offer['responded_at'],
                ],
            );
        }
    }
}
