<?php

namespace App\Http\Controllers;

use App\Models\MaintenanceRequest;
use App\Models\Offer;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function index(Request $request): Response|RedirectResponse
    {
        /** @var User|null $user */
        $user = $request->user();

        if ($user === null) {
            return redirect()->route('login');
        }

        if ($user->role === 'user') {
            $requests = MaintenanceRequest::query()
                ->where('user_id', $user->id);

            return Inertia::render('user/dashboard', [
                'totalRequests' => (clone $requests)->count(),
                'pendingRequests' => (clone $requests)->where('status', 'pending')->count(),
                'inProgressRequests' => (clone $requests)->where('status', 'in_progress')->count(),
                'completedRequests' => (clone $requests)->where('status', 'completed')->count(),
            ]);
        }

        if ($user->role === 'technician') {
            $assignedRequests = MaintenanceRequest::query()
                ->where('assigned_technician_id', $user->id);

            return Inertia::render('technician/dashboard', [
                'newRequests' => MaintenanceRequest::query()->where('status', 'pending')->count(),
                'offersSent' => Offer::query()
                    ->where('technician_id', $user->id)
                    ->where('status', 'sent')
                    ->count(),
                'inProgressRequests' => (clone $assignedRequests)->where('status', 'in_progress')->count(),
                'completedRequests' => (clone $assignedRequests)->where('status', 'completed')->count(),
            ]);
        }

        if ($user->role === 'admin') {
            return Inertia::render('admin/dashboard', [
                'totalUsers' => User::query()->where('role', 'user')->count(),
                'totalTechnicians' => User::query()->where('role', 'technician')->count(),
                'totalRequests' => MaintenanceRequest::query()->count(),
                'completedRequests' => MaintenanceRequest::query()
                    ->where('status', 'completed')
                    ->count(),
            ]);
        }

        abort(403);
    }
}
