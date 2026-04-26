<?php

use App\Models\MaintenanceRequest;
use App\Models\Offer;
use App\Models\User;
use Inertia\Testing\AssertableInertia as Assert;

test('user can create a maintenance request', function () {
    $user = User::factory()->create([
        'role' => 'client',
    ]);

    $this->actingAs($user)
        ->post(route('user.requests.store'), [
            'title' => 'Broken AC',
            'description' => 'The AC unit in room 101 is not cooling.',
            'location' => 'Room 101',
            'priority' => 'high',
        ])
        ->assertRedirect(route('user.requests.index'));

    $request = MaintenanceRequest::query()->first();

    expect($request)->not->toBeNull();
    expect($request->user_id)->toBe($user->id);
    expect($request->status)->toBe('pending');

    $this->assertDatabaseHas('request_status_history', [
        'request_id' => $request->id,
        'changed_by' => $user->id,
        'new_status' => 'pending',
    ]);
});

test('user can only view their own maintenance request', function () {
    $owner = User::factory()->create(['role' => 'client']);
    $otherUser = User::factory()->create(['role' => 'client']);

    $request = MaintenanceRequest::query()->create([
        'user_id' => $owner->id,
        'assigned_technician_id' => null,
        'title' => 'Leaking Pipe',
        'description' => 'Water leakage in kitchen.',
        'location' => 'Kitchen',
        'priority' => 'medium',
        'status' => 'pending',
    ]);

    $this->actingAs($otherUser)
        ->get(route('user.requests.show', $request))
        ->assertForbidden();
});

test('user can accept one sent offer and assign that technician', function () {
    $user = User::factory()->create(['role' => 'client']);
    $selectedTechnician = User::factory()->create(['role' => 'technician']);
    $otherTechnician = User::factory()->create(['role' => 'technician']);

    $request = MaintenanceRequest::query()->create([
        'user_id' => $user->id,
        'assigned_technician_id' => null,
        'title' => 'Door Repair',
        'description' => 'Main door hinge is broken.',
        'location' => 'Main Entrance',
        'priority' => 'medium',
        'status' => 'pending',
    ]);

    $acceptedOffer = Offer::query()->create([
        'request_id' => $request->id,
        'technician_id' => $selectedTechnician->id,
        'offer_description' => 'Replace hinges and align frame.',
        'estimated_cost' => 120,
        'estimated_days' => 2,
        'status' => 'sent',
        'sent_at' => now(),
    ]);

    Offer::query()->create([
        'request_id' => $request->id,
        'technician_id' => $otherTechnician->id,
        'offer_description' => 'Replace the hinges only.',
        'estimated_cost' => 90,
        'estimated_days' => 1,
        'status' => 'sent',
        'sent_at' => now(),
    ]);

    $this->actingAs($user)
        ->post(route('user.requests.accept-offer', $request), [
            'offer_id' => $acceptedOffer->id,
        ])
        ->assertRedirect();

    $this->assertDatabaseHas('offers', [
        'request_id' => $request->id,
        'status' => 'accepted',
    ]);

    $this->assertDatabaseHas('offers', [
        'request_id' => $request->id,
        'technician_id' => $otherTechnician->id,
        'status' => 'rejected',
    ]);

    $this->assertDatabaseHas('maintenance_requests', [
        'id' => $request->id,
        'assigned_technician_id' => $selectedTechnician->id,
        'status' => 'technician_assigned',
    ]);
});

test('user requests index renders expected inertia page', function () {
    $user = User::factory()->create(['role' => 'client']);

    $this->actingAs($user)
        ->get(route('user.requests.index'))
        ->assertOk()
        ->assertInertia(fn (Assert $page): Assert => $page->component('user/maintenance-requests/index'));
});
