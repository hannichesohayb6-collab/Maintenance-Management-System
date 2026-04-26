<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreTechnicianRequest;
use App\Http\Requests\Admin\UpdateTechnicianRequest;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Hash;
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

    public function store(StoreTechnicianRequest $request): RedirectResponse
    {
        User::query()->create([
            'full_name' => $request->validated('full_name'),
            'email' => $request->validated('email'),
            'phone' => $request->validated('phone'),
            'password_hash' => Hash::make($request->validated('password')),
            'role' => 'technician',
            'is_active' => true,
        ]);

        return back();
    }

    public function update(UpdateTechnicianRequest $request, User $user): RedirectResponse
    {
        abort_unless($user->role === 'technician', 403);

        $user->update($request->validated());

        return back();
    }
}
