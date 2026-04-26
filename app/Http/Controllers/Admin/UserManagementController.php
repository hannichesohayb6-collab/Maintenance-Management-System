<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Inertia\Inertia;
use Inertia\Response;

class UserManagementController extends Controller
{
    public function index(): Response
    {
        $users = User::query()
            ->where('role', 'client')
            ->latest()
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('admin/users/index', [
            'users' => $users,
        ]);
    }

    public function toggleActive(User $user)
    {
        abort_unless($user->role === 'client', 403);

        $user->update([
            'is_active' => ! $user->is_active,
        ]);

        return back();
    }
}
