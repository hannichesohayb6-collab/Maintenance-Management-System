<?php

use App\Models\MaintenanceRequest;
use App\Models\User;
use Inertia\Testing\AssertableInertia as Assert;

test('admin can view users management page', function () {
    $admin = User::factory()->create([
        'role' => 'admin',
    ]);

    User::factory()->create([
        'role' => 'client',
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
        'role' => 'client',
        'is_active' => true,
    ]);

    $this->actingAs($admin)
        ->post(route('admin.users.toggle-active', $user))
        ->assertRedirect();

    $this->assertDatabaseHas('users', [
        'id' => $user->id,
        'is_active' => false,
    ]);
});

test('admin can toggle technician active status', function () {
    $admin = User::factory()->create([
        'role' => 'admin',
    ]);

    $technician = User::factory()->create([
        'role' => 'technician',
        'is_active' => true,
    ]);

    $this->actingAs($admin)
        ->post(route('admin.technicians.toggle-active', $technician))
        ->assertRedirect();

    $this->assertDatabaseHas('users', [
        'id' => $technician->id,
        'is_active' => false,
    ]);
});

test('admin can view requests management page', function () {
    $admin = User::factory()->create([
        'role' => 'admin',
    ]);

    $user = User::factory()->create([
        'role' => 'client',
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
        'role' => 'client',
    ]);

    $this->actingAs($user)
        ->get(route('admin.users.index'))
        ->assertForbidden();
});
