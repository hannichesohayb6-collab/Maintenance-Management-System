<?php

use App\Models\MaintenanceRequest;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;

uses(RefreshDatabase::class);

test('technician index includes pending requests', function () {
    $technician = User::factory()->create(['role' => 'technician']);
    $user = User::factory()->create(['role' => 'user']);

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

test('technician can accept a pending request', function () {
    $technician = User::factory()->create(['role' => 'technician']);
    $user = User::factory()->create(['role' => 'user']);

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
        ->patch(route('technician.requests.accept', $request))
        ->assertRedirect();

    $this->assertDatabaseHas('maintenance_requests', [
        'id' => $request->id,
        'assigned_technician_id' => $technician->id,
        'status' => 'under_review',
    ]);
});

test('technician can send offer for assigned request', function () {
    $technician = User::factory()->create(['role' => 'technician']);
    $user = User::factory()->create(['role' => 'user']);

    $request = MaintenanceRequest::query()->create([
        'user_id' => $user->id,
        'assigned_technician_id' => $technician->id,
        'title' => 'HVAC tune-up',
        'description' => 'Routine tune-up needed.',
        'location' => 'Building C',
        'priority' => 'medium',
        'status' => 'under_review',
    ]);

    $this->actingAs($technician)
        ->post(route('technician.requests.offers.store', $request), [
            'offer_description' => 'Full HVAC service package.',
            'estimated_cost' => 250,
            'estimated_days' => 3,
        ])
        ->assertRedirect();

    $this->assertDatabaseHas('offers', [
        'request_id' => $request->id,
        'technician_id' => $technician->id,
        'status' => 'sent',
    ]);

    $this->assertDatabaseHas('maintenance_requests', [
        'id' => $request->id,
        'status' => 'offer_sent',
    ]);
});

test('technician cannot update status for unassigned request', function () {
    $technician = User::factory()->create(['role' => 'technician']);
    $otherTechnician = User::factory()->create(['role' => 'technician']);
    $user = User::factory()->create(['role' => 'user']);

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
        ->patch(route('technician.requests.update-status', $request), [
            'status' => 'completed',
            'note' => 'Completed by mistake.',
        ])
        ->assertForbidden();
});
