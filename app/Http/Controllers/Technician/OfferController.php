<?php

namespace App\Http\Controllers\Technician;

use App\Http\Controllers\Controller;
use App\Http\Requests\Technician\StoreOfferRequest;
use App\Models\MaintenanceRequest;

class OfferController extends Controller
{
    public function store(
        StoreOfferRequest $request,
        MaintenanceRequest $maintenanceRequest,
    ) {
        $technician = $request->user();

        abort_unless($maintenanceRequest->status === 'pending', 403);
        abort_if($maintenanceRequest->offers()->where('technician_id', $technician->id)->exists(), 403);

        $maintenanceRequest->offers()->create([
            ...$request->validated(),
            'technician_id' => $technician->id,
            'status' => 'sent',
            'sent_at' => now(),
        ]);

        return back();
    }
}
