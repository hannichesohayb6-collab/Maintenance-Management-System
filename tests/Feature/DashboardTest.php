<?php

use App\Models\User;
use Inertia\Testing\AssertableInertia as Assert;

test('guests are redirected to the login page', function () {
    $response = $this->get(route('dashboard'));

    $response->assertRedirect(route('login'));
});

test('users are sent to the user dashboard component', function () {
    $user = User::factory()->create();

    $this->actingAs($user)
        ->get(route('dashboard'))
        ->assertOk()
        ->assertInertia(fn (Assert $page): Assert => $page->component('user/dashboard'));
});

test('technicians are sent to the technician dashboard component', function () {
    $technician = User::factory()->create([
        'role' => 'technician',
    ]);

    $this->actingAs($technician)
        ->get(route('dashboard'))
        ->assertOk()
        ->assertInertia(fn (Assert $page): Assert => $page->component('technician/dashboard'));
});

test('admins are sent to the admin dashboard component', function () {
    $admin = User::factory()->create([
        'role' => 'admin',
    ]);

    $this->actingAs($admin)
        ->get(route('dashboard'))
        ->assertOk()
        ->assertInertia(fn (Assert $page): Assert => $page->component('admin/dashboard'));
});

test('role middleware blocks users from technician dashboard routes', function () {
    $user = User::factory()->create([
        'role' => 'user',
    ]);

    $this->actingAs($user)
        ->get(route('technician.dashboard'))
        ->assertForbidden();
});

test('inactive users are logged out when they hit a role protected route', function () {
    $user = User::factory()->create([
        'role' => 'user',
        'is_active' => false,
    ]);

    $this->actingAs($user)
        ->get(route('user.dashboard'))
        ->assertRedirect(route('login'));

    $this->assertGuest();
});
