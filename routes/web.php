<?php

use App\Http\Controllers\Admin\RequestManagementController;
use App\Http\Controllers\Admin\TechnicianManagementController;
use App\Http\Controllers\Admin\UserManagementController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\Technician\MaintenanceRequestController as TechnicianMaintenanceRequestController;
use App\Http\Controllers\Technician\OfferController as TechnicianOfferController;
use App\Http\Controllers\User\MaintenanceRequestController as UserMaintenanceRequestController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('public/home');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');

    Route::prefix('user')->name('user.')->middleware('role:user')->group(function () {
        Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');

        Route::prefix('requests')->name('requests.')->group(function () {
            Route::get('/', [UserMaintenanceRequestController::class, 'index'])->name('index');
            Route::get('create', [UserMaintenanceRequestController::class, 'create'])->name('create');
            Route::post('/', [UserMaintenanceRequestController::class, 'store'])->name('store');
            Route::get('{maintenanceRequest}', [UserMaintenanceRequestController::class, 'show'])->name('show');
            Route::patch('{maintenanceRequest}/accept-offer', [UserMaintenanceRequestController::class, 'acceptOffer'])
                ->name('accept-offer');
            Route::patch('{maintenanceRequest}/reject-offer', [UserMaintenanceRequestController::class, 'rejectOffer'])
                ->name('reject-offer');
        });
    });

    Route::prefix('technician')->name('technician.')->middleware('role:technician')->group(function () {
        Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');

        Route::prefix('requests')->name('requests.')->group(function () {
            Route::get('/', [TechnicianMaintenanceRequestController::class, 'index'])->name('index');
            Route::get('{maintenanceRequest}', [TechnicianMaintenanceRequestController::class, 'show'])->name('show');
            Route::patch('{maintenanceRequest}/accept', [TechnicianMaintenanceRequestController::class, 'acceptRequest'])
                ->name('accept');
            Route::patch('{maintenanceRequest}/reject', [TechnicianMaintenanceRequestController::class, 'rejectRequest'])
                ->name('reject');
            Route::patch('{maintenanceRequest}/status', [TechnicianMaintenanceRequestController::class, 'updateStatus'])
                ->name('update-status');
            Route::post('{maintenanceRequest}/offers', [TechnicianOfferController::class, 'store'])->name('offers.store');
        });

        Route::get('my-tasks', [TechnicianMaintenanceRequestController::class, 'myTasks'])->name('my-tasks');
    });

    Route::prefix('admin')->name('admin.')->middleware('role:admin')->group(function () {
        Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');

        Route::prefix('users')->name('users.')->group(function () {
            Route::get('/', [UserManagementController::class, 'index'])->name('index');
            Route::patch('{user}/toggle-active', [UserManagementController::class, 'toggleActive'])->name('toggle-active');
        });

        Route::prefix('technicians')->name('technicians.')->group(function () {
            Route::get('/', [TechnicianManagementController::class, 'index'])->name('index');
            Route::post('/', [TechnicianManagementController::class, 'store'])->name('store');
            Route::patch('{user}', [TechnicianManagementController::class, 'update'])->name('update');
        });

        Route::prefix('requests')->name('requests.')->group(function () {
            Route::get('/', [RequestManagementController::class, 'index'])->name('index');
        });
    });
});

require __DIR__.'/settings.php';
