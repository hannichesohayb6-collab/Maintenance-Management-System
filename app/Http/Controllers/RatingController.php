<?php

namespace App\Http\Controllers;

use App\Models\MaintenanceRequest;
use App\Models\Rating;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class RatingController extends Controller
{
    public function store(Request $request, MaintenanceRequest $maintenanceRequest)
    {
        abort_unless($maintenanceRequest->user_id === Auth::id(), 403);
        abort_unless($maintenanceRequest->status === 'completed', 403);

        $validated = $request->validate([
            'rating' => ['required', 'integer', 'min:1', 'max:5'],
            'comment' => ['nullable', 'string', 'max:1000'],
        ]);

        $technicianId = $maintenanceRequest->assigned_technician_id;
        if (!$technicianId) {
            return response()->json(['message' => 'No technician assigned to this request.'], 422);
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

        return response()->json(['message' => 'Rating submitted successfully']);
    }
}

