<?php

use App\Models\MaintenanceRequest;
use App\Models\User;
use Inertia\Testing\AssertableInertia as Assert;

test('technician index includes pending requests', function () {
    $technician = User::factory()->create(['role' => 'technician']);
    $user = User::factory()->create(['role' => 'client']);

    MaintenanceRequest::query()->create([
        'user_id' => $user->id,
        'assigned_technician_id' => null,
        'title' => 'Power outage',
        'description' => 'No power in office.',
        'location' => 'Office 9',
        'priority' => 'urgent',
        'status' => 'pending',
    ]);

    $this->actingAs($technician)
        ->get(route('technician.requests.index'))
        ->assertOk()
        ->assertInertia(fn (Assert $page): Assert => $page->component('technician/received-requests/index'));
});

test('technician can send one offer for a pending request', function () {
    $technician = User::factory()->create(['role' => 'technician']);
    $user = User::factory()->create(['role' => 'client']);

    $request = MaintenanceRequest::query()->create([
        'user_id' => $user->id,
        'assigned_technician_id' => null,
        'title' => 'Window crack',
        'description' => 'Broken window in hallway.',
        'location' => 'Hallway B',
        'priority' => 'high',
        'status' => 'pending',
    ]);

    $this->actingAs($technician)
        ->post(route('technician.requests.offers.store', $request), [
            'offer_description' => 'Replace the broken glass and seal the frame.',
            'estimated_cost' => 180,
            'estimated_days' => 2,
        ])
        ->assertRedirect();

    $this->assertDatabaseHas('offers', [
        'request_id' => $request->id,
        'technician_id' => $technician->id,
        'status' => 'sent',
    ]);

    $this->assertDatabaseHas('maintenance_requests', [
        'id' => $request->id,
        'status' => 'pending',
        'assigned_technician_id' => null,
    ]);
});

test('technician cannot update status for unassigned request', function () {
    $technician = User::factory()->create(['role' => 'technician']);
    $otherTechnician = User::factory()->create(['role' => 'technician']);
    $user = User::factory()->create(['role' => 'client']);

    $request = MaintenanceRequest::query()->create([
        'user_id' => $user->id,
        'assigned_technician_id' => $otherTechnician->id,
        'title' => 'Elevator issue',
        'description' => 'Elevator stuck on floor 3.',
        'location' => 'Tower 2',
        'priority' => 'urgent',
        'status' => 'in_progress',
    ]);

    $this->actingAs($technician)
        ->post(route('technician.requests.update-status', $request), [
            'status' => 'completed',
            'note' => 'Completed by mistake.',
        ])
        ->assertForbidden();
});

test('technician cannot send a second offer for the same request', function () {
    $technician = User::factory()->create(['role' => 'technician']);
    $user = User::factory()->create(['role' => 'client']);

    $request = MaintenanceRequest::query()->create([
        'user_id' => $user->id,
        'assigned_technician_id' => null,
        'title' => 'Water pressure issue',
        'description' => 'The tap pressure is very low.',
        'location' => 'Apartment 12',
        'priority' => 'medium',
        'status' => 'pending',
    ]);

    $payload = [
        'offer_description' => 'Check the valve and clean the pipe line.',
        'estimated_cost' => 70,
        'estimated_days' => 1,
    ];

    $this->actingAs($technician)
        ->post(route('technician.requests.offers.store', $request), $payload)
        ->assertRedirect();

    $this->actingAs($technician)
        ->post(route('technician.requests.offers.store', $request), $payload)
        ->assertForbidden();
});
