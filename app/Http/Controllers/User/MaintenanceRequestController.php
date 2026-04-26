<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Requests\User\StoreMaintenanceRequestRequest;
use App\Models\MaintenanceRequest;
use App\Models\RequestStatusHistory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class MaintenanceRequestController extends Controller
{
    public function index(Request $request): Response
    {
        $user = $request->user();

        $requests = MaintenanceRequest::query()
            ->with(['assignedTechnician:id,full_name'])
            ->where('user_id', $user->id)
            ->latest()
            ->get();

        return Inertia::render('user/maintenance-requests/index', [
            'requests' => $requests,
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('user/maintenance-requests/create');
    }

    public function store(StoreMaintenanceRequestRequest $request)
    {
        $user = $request->user();

        DB::transaction(function () use ($request, $user): void {
            $maintenanceRequest = MaintenanceRequest::query()->create([
                ...$request->validated(),
                'user_id' => $user->id,
                'status' => 'pending',
            ]);

            // Save the first status entry when the request is created.
            RequestStatusHistory::query()->create([
                'request_id' => $maintenanceRequest->id,
                'changed_by' => $user->id,
                'old_status' => null,
                'new_status' => 'pending',
                'note' => 'Request created by client.',
                'changed_at' => now(),
            ]);
        });

        return to_route('user.requests.index');
    }

    public function show(Request $request, MaintenanceRequest $maintenanceRequest): Response
    {
        abort_unless($maintenanceRequest->user_id === $request->user()->id, 403);

        $maintenanceRequest->load([
            'user:id,full_name,email,phone',
            'assignedTechnician:id,full_name,email,phone',
            'offers' => fn ($query) => $query->with('technician:id,full_name')->latest(),
            'statusHistory' => fn ($query) => $query->with('changedBy:id,full_name')->orderByDesc('changed_at'),
        ]);

        return Inertia::render('user/maintenance-requests/show', [
            'maintenanceRequest' => $maintenanceRequest,
            'offers' => $maintenanceRequest->offers,
            'statusHistory' => $maintenanceRequest->statusHistory,
        ]);
    }

    public function acceptOffer(Request $request, MaintenanceRequest $maintenanceRequest)
    {
        abort_unless($maintenanceRequest->user_id === $request->user()->id, 403);

        $validated = $request->validate([
            'offer_id' => ['required', 'integer'],
        ]);

        DB::transaction(function () use ($request, $maintenanceRequest, $validated): void {
            $offer = $maintenanceRequest->offers()
                ->whereKey($validated['offer_id'])
                ->where('status', 'sent')
                ->firstOrFail();

            $offer->update([
                'status' => 'accepted',
                'responded_at' => now(),
            ]);

            // Close the other open offers after the client chooses one technician.
            $maintenanceRequest->offers()
                ->where('id', '!=', $offer->id)
                ->where('status', 'sent')
                ->update([
                    'status' => 'rejected',
                    'responded_at' => now(),
                ]);

            $oldStatus = $maintenanceRequest->status;

            $maintenanceRequest->update([
                'assigned_technician_id' => $offer->technician_id,
                'status' => 'technician_assigned',
            ]);

            // Save the moment the request becomes assigned.
            RequestStatusHistory::query()->create([
                'request_id' => $maintenanceRequest->id,
                'changed_by' => $request->user()->id,
                'old_status' => $oldStatus,
                'new_status' => 'technician_assigned',
                'note' => 'Client accepted an offer.',
                'changed_at' => now(),
            ]);
        });

        return back();
    }

    public function rejectOffer(Request $request, MaintenanceRequest $maintenanceRequest)
    {
        abort_unless($maintenanceRequest->user_id === $request->user()->id, 403);

        $validated = $request->validate([
            'offer_id' => ['required', 'integer'],
        ]);

        DB::transaction(function () use ($maintenanceRequest, $validated): void {
            $offer = $maintenanceRequest->offers()
                ->whereKey($validated['offer_id'])
                ->where('status', 'sent')
                ->firstOrFail();

            $offer->update([
                'status' => 'rejected',
                'responded_at' => now(),
            ]);
        });

        return back();
    }
}
