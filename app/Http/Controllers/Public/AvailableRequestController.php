<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\MaintenanceRequest;
use Inertia\Inertia;
use Inertia\Response;

class AvailableRequestController extends Controller
{
    public function __invoke(): Response
    {
        $requests = MaintenanceRequest::query()
            ->with('user:id,full_name')
            ->where('status', 'pending')
            ->latest()
            ->get();

        return Inertia::render('public/available-requests', [
            'requests' => $requests,
        ]);
    }
}
