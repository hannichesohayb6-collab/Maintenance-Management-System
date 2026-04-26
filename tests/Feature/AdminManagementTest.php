<?php

use App\Models\MaintenanceRequest;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;

uses(RefreshDatabase::class);

test('admin can view users management page', function () {
    $admin = User::factory()->create([
        'role' => 'admin',
    ]);

    User::factory()->create([
        'role' => 'user',
    ]);

    $this->actingAs($admin)
        ->get(route('admin.users.index'))
        ->assertOk()
        ->assertInertia(fn (Assert $page): Assert => $page->component('admin/users/index'));
});

test('admin can toggle user active status', function () {
    $admin = User::factory()->create([
        'role' => 'admin',
    ]);

    $user = User::factory()->create([
        'role' => 'user',
        'is_active' => true,
    ]);

    $this->actingAs($admin)
        ->patch(route('admin.users.toggle-active', $user))
        ->assertRedirect();

    $this->assertDatabaseHas('users', [
        'id' => $user->id,
        'is_active' => false,
    ]);
});

test('admin can create technician', function () {
    $admin = User::factory()->create([
        'role' => 'admin',
    ]);

    $this->actingAs($admin)
        ->post(route('admin.technicians.store'), [
            'full_name' => 'Tech Person',
            'email' => 'tech.person@example.com',
            'phone' => '+15550001234',
            'password' => 'password123',
            'password_confirmation' => 'password123',
        ])
        ->assertRedirect();

    $this->assertDatabaseHas('users', [
        'email' => 'tech.person@example.com',
        'role' => 'technician',
        'is_active' => true,
    ]);
});

test('admin can update technician', function () {
    $admin = User::factory()->create([
        'role' => 'admin',
    ]);

    $technician = User::factory()->create([
        'role' => 'technician',
        'is_active' => true,
    ]);

    $this->actingAs($admin)
        ->patch(route('admin.technicians.update', $technician), [
            'full_name' => 'Updated Technician',
            'email' => 'updated.tech@example.com',
            'phone' => '+15559990000',
            'is_active' => false,
        ])
        ->assertRedirect();

    $this->assertDatabaseHas('users', [
        'id' => $technician->id,
        'full_name' => 'Updated Technician',
        'email' => 'updated.tech@example.com',
        'is_active' => false,
    ]);
});

test('admin can view requests management page', function () {
    $admin = User::factory()->create([
        'role' => 'admin',
    ]);

    $user = User::factory()->create([
        'role' => 'user',
    ]);

    MaintenanceRequest::query()->create([
        'user_id' => $user->id,
        'assigned_technician_id' => null,
        'title' => 'Broken Light',
        'description' => 'Light not working in hallway.',
        'location' => 'Hallway 1',
        'priority' => 'low',
        'status' => 'pending',
    ]);

    $this->actingAs($admin)
        ->get(route('admin.requests.index'))
        ->assertOk()
        ->assertInertia(fn (Assert $page): Assert => $page->component('admin/requests/index'));
});

test('non-admin cannot access admin pages', function () {
    $user = User::factory()->create([
        'role' => 'user',
    ]);

    $this->actingAs($user)
        ->get(route('admin.users.index'))
        ->assertForbidden();
});
