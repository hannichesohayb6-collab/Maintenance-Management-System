<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Inertia\Inertia;
use Inertia\Response;

class TechnicianManagementController extends Controller
{
    public function index(): Response
    {
        $technicians = User::query()
            ->where('role', 'technician')
            ->latest()
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('admin/technicians/index', [
            'technicians' => $technicians,
        ]);
    }

    public function toggleActive(User $user)
    {
        abort_unless($user->role === 'technician', 403);

        // Let the admin quickly enable or disable a technician account.
        $user->update([
            'is_active' => ! $user->is_active,
        ]);

        return back();
    }
}
