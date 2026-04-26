<?php

namespace App\Http\Controllers\Technician;

use App\Http\Controllers\Controller;
use App\Http\Requests\Technician\UpdateMaintenanceRequestStatusRequest;
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
        $technician = $request->user();

        $requests = MaintenanceRequest::query()
            ->with(['user:id,full_name', 'assignedTechnician:id,full_name'])
            ->where(function ($query) use ($technician): void {
                $query
                    ->where('assigned_technician_id', $technician->id)
                    ->orWhere('status', 'pending');
            })
            ->latest()
            ->get();

        return Inertia::render('technician/received-requests/index', [
            'requests' => $requests,
        ]);
    }

    public function show(Request $request, MaintenanceRequest $maintenanceRequest): Response
    {
        $technician = $request->user();

        $isVisibleToTechnician = $maintenanceRequest->status === 'pending'
            || $maintenanceRequest->assigned_technician_id === $technician->id;

        abort_unless($isVisibleToTechnician, 403);

        $maintenanceRequest->load([
            'user:id,full_name,email,phone',
            'assignedTechnician:id,full_name,email,phone',
            'offers' => fn ($query) => $query->with('technician:id,full_name')->latest(),
            'statusHistory' => fn ($query) => $query->with('changedBy:id,full_name')->orderByDesc('changed_at'),
        ]);

        return Inertia::render('technician/received-requests/show', [
            'maintenanceRequest' => $maintenanceRequest,
            'offers' => $maintenanceRequest->offers,
            'statusHistory' => $maintenanceRequest->statusHistory,
        ]);
    }

    public function acceptRequest(Request $request, MaintenanceRequest $maintenanceRequest): RedirectResponse
    {
        $technician = $request->user();

        abort_unless($maintenanceRequest->status === 'pending', 403);

        DB::transaction(function () use ($maintenanceRequest, $technician): void {
            $oldStatus = $maintenanceRequest->status;

            $maintenanceRequest->update([
                'assigned_technician_id' => $technician->id,
                'status' => 'under_review',
            ]);

            RequestStatusHistory::query()->create([
                'request_id' => $maintenanceRequest->id,
                'changed_by' => $technician->id,
                'old_status' => $oldStatus,
                'new_status' => 'under_review',
                'note' => 'Request accepted by technician.',
                'changed_at' => now(),
            ]);
        });

        return back();
    }

    public function rejectRequest(Request $request, MaintenanceRequest $maintenanceRequest): RedirectResponse
    {
        $technician = $request->user();

        abort_unless($maintenanceRequest->status === 'pending', 403);

        DB::transaction(function () use ($maintenanceRequest, $technician): void {
            $oldStatus = $maintenanceRequest->status;

            $maintenanceRequest->update([
                'assigned_technician_id' => $technician->id,
                'status' => 'cancelled',
            ]);

            RequestStatusHistory::query()->create([
                'request_id' => $maintenanceRequest->id,
                'changed_by' => $technician->id,
                'old_status' => $oldStatus,
                'new_status' => 'cancelled',
                'note' => 'Request rejected by technician.',
                'changed_at' => now(),
            ]);
        });

        return back();
    }

    public function myTasks(Request $request): Response
    {
        $technician = $request->user();

        $tasks = MaintenanceRequest::query()
            ->with('user:id,full_name')
            ->where('assigned_technician_id', $technician->id)
            ->latest()
            ->get();

        return Inertia::render('technician/my-tasks/index', [
            'acceptedOrUnderReview' => $tasks
                ->whereIn('status', ['under_review', 'offer_sent', 'offer_accepted'])
                ->values(),
            'inProgress' => $tasks->where('status', 'in_progress')->values(),
            'completed' => $tasks->where('status', 'completed')->values(),
        ]);
    }

    public function updateStatus(
        UpdateMaintenanceRequestStatusRequest $request,
        MaintenanceRequest $maintenanceRequest,
    ): RedirectResponse {
        $technician = $request->user();

        abort_unless($maintenanceRequest->assigned_technician_id === $technician->id, 403);

        DB::transaction(function () use ($request, $maintenanceRequest, $technician): void {
            $oldStatus = $maintenanceRequest->status;

            $maintenanceRequest->update([
                'status' => $request->validated('status'),
            ]);

            RequestStatusHistory::query()->create([
                'request_id' => $maintenanceRequest->id,
                'changed_by' => $technician->id,
                'old_status' => $oldStatus,
                'new_status' => $request->validated('status'),
                'note' => $request->validated('note'),
                'changed_at' => now(),
            ]);
        });

        return back();
    }
}
