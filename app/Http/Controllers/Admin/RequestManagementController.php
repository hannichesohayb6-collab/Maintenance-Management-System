<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\MaintenanceRequest;
use Inertia\Inertia;
use Inertia\Response;

class RequestManagementController extends Controller
{
    public function index(): Response
    {
        $requests = MaintenanceRequest::query()
            ->with([
                'user:id,full_name,email',
                'assignedTechnician:id,full_name,email',
                'offers' => fn ($query) => $query->latest()->limit(1),
            ])
            ->latest()
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('admin/requests/index', [
            'requests' => $requests,
        ]);
    }
}
