<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Requests\User\StoreMaintenanceRequestRequest;
use App\Models\MaintenanceRequest;
use App\Models\RequestStatusHistory;
use Illuminate\Http\RedirectResponse;
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

    public function store(StoreMaintenanceRequestRequest $request): RedirectResponse
    {
        $user = $request->user();

        DB::transaction(function () use ($request, $user): void {
            $maintenanceRequest = MaintenanceRequest::query()->create([
                ...$request->validated(),
                'user_id' => $user->id,
                'status' => 'pending',
            ]);

            RequestStatusHistory::query()->create([
                'request_id' => $maintenanceRequest->id,
                'changed_by' => $user->id,
                'old_status' => null,
                'new_status' => 'pending',
                'note' => 'Request created by user.',
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
            'latestOffer' => $maintenanceRequest->offers->first(),
            'statusHistory' => $maintenanceRequest->statusHistory,
        ]);
    }

    public function acceptOffer(Request $request, MaintenanceRequest $maintenanceRequest): RedirectResponse
    {
        abort_unless($maintenanceRequest->user_id === $request->user()->id, 403);

        DB::transaction(function () use ($request, $maintenanceRequest): void {
            $offer = $maintenanceRequest->offers()
                ->where('status', 'sent')
                ->latest('id')
                ->firstOrFail();

            $offer->update([
                'status' => 'accepted',
                'responded_at' => now(),
            ]);

            $oldStatus = $maintenanceRequest->status;

            $maintenanceRequest->update([
                'status' => 'offer_accepted',
            ]);

            RequestStatusHistory::query()->create([
                'request_id' => $maintenanceRequest->id,
                'changed_by' => $request->user()->id,
                'old_status' => $oldStatus,
                'new_status' => 'offer_accepted',
                'note' => 'User accepted the offer.',
                'changed_at' => now(),
            ]);
        });

        return back();
    }

    public function rejectOffer(Request $request, MaintenanceRequest $maintenanceRequest): RedirectResponse
    {
        abort_unless($maintenanceRequest->user_id === $request->user()->id, 403);

        DB::transaction(function () use ($request, $maintenanceRequest): void {
            $offer = $maintenanceRequest->offers()
                ->where('status', 'sent')
                ->latest('id')
                ->firstOrFail();

            $offer->update([
                'status' => 'rejected',
                'responded_at' => now(),
            ]);

            $oldStatus = $maintenanceRequest->status;

            $maintenanceRequest->update([
                'status' => 'offer_rejected',
            ]);

            RequestStatusHistory::query()->create([
                'request_id' => $maintenanceRequest->id,
                'changed_by' => $request->user()->id,
                'old_status' => $oldStatus,
                'new_status' => 'offer_rejected',
                'note' => 'User rejected the offer.',
                'changed_at' => now(),
            ]);
        });

        return back();
    }
}
