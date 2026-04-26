<?php

namespace App\Http\Controllers\Technician;

use App\Http\Controllers\Controller;
use App\Http\Requests\Technician\StoreOfferRequest;
use App\Models\MaintenanceRequest;
use App\Models\RequestStatusHistory;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\DB;

class OfferController extends Controller
{
    public function store(
        StoreOfferRequest $request,
        MaintenanceRequest $maintenanceRequest,
    ): RedirectResponse {
        $technician = $request->user();

        abort_unless($maintenanceRequest->assigned_technician_id === $technician->id, 403);

        DB::transaction(function () use ($request, $maintenanceRequest, $technician): void {
            $maintenanceRequest->offers()->create([
                ...$request->validated(),
                'technician_id' => $technician->id,
                'status' => 'sent',
                'sent_at' => now(),
            ]);

            $oldStatus = $maintenanceRequest->status;

            $maintenanceRequest->update([
                'status' => 'offer_sent',
            ]);

            RequestStatusHistory::query()->create([
                'request_id' => $maintenanceRequest->id,
                'changed_by' => $technician->id,
                'old_status' => $oldStatus,
                'new_status' => 'offer_sent',
                'note' => 'Offer sent by technician.',
                'changed_at' => now(),
            ]);
        });

        return back();
    }
}
