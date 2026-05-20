<?php

namespace App\Http\Controllers;

use App\Models\MaintenanceRequest;
use App\Models\Rating;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class RatingController extends Controller
{
    public function store(Request $request, MaintenanceRequest $maintenanceRequest)
    {
        if ($maintenanceRequest->user_id !== Auth::id()) {
            return back()->withErrors(['message' => 'Unauthorized.']);
        }

        if ($maintenanceRequest->status !== 'completed') {
            return back()->withErrors(['message' => 'You can only rate completed requests.']);
        }

        $validated = $request->validate([
            'rating' => ['required', 'integer', 'min:1', 'max:5'],
            'comment' => ['nullable', 'string', 'max:1000'],
        ]);

        $technicianId = $maintenanceRequest->assigned_technician_id;
        if (!$technicianId) {
            return back()->withErrors(['message' => 'No technician assigned to this request.']);
        }

        Rating::updateOrCreate(
            ['maintenance_request_id' => $maintenanceRequest->id],
            [
                'technician_id' => $technicianId,
                'user_id' => Auth::id(),
                'rating' => $validated['rating'],
                'comment' => $validated['comment'],
            ]
        );

        return back()->with('toast', [
            'type' => 'success',
            'message' => 'Rating submitted successfully',
        ]);
    }
}

