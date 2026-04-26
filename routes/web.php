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

    Route::prefix('user')->name('user.')->middleware('role:client')->group(function () {
        Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');

        Route::prefix('requests')
            ->name('requests.')
            ->controller(UserMaintenanceRequestController::class)
            ->group(function () {
                Route::get('/', 'index')->name('index');
                Route::get('create', 'create')->name('create');
                Route::post('/', 'store')->name('store');
                Route::get('{maintenanceRequest}', 'show')->name('show');
                Route::post('{maintenanceRequest}/accept-offer', 'acceptOffer')->name('accept-offer');
                Route::post('{maintenanceRequest}/reject-offer', 'rejectOffer')->name('reject-offer');
            });
    });

    Route::prefix('technician')->name('technician.')->middleware('role:technician')->group(function () {
        Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');

        Route::prefix('requests')
            ->name('requests.')
            ->controller(TechnicianMaintenanceRequestController::class)
            ->group(function () {
                Route::get('/', 'index')->name('index');
                Route::get('{maintenanceRequest}', 'show')->name('show');
                Route::post('{maintenanceRequest}/status', 'updateStatus')->name('update-status');
                Route::post('{maintenanceRequest}/offers', [TechnicianOfferController::class, 'store'])->name('offers.store');
            });

        Route::get('my-tasks', [TechnicianMaintenanceRequestController::class, 'myTasks'])->name('my-tasks');
    });

    Route::prefix('admin')->name('admin.')->middleware('role:admin')->group(function () {
        Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');

        Route::prefix('users')
            ->name('users.')
            ->controller(UserManagementController::class)
            ->group(function () {
                Route::get('/', 'index')->name('index');
                Route::post('{user}/toggle-active', 'toggleActive')->name('toggle-active');
            });

        Route::prefix('technicians')
            ->name('technicians.')
            ->controller(TechnicianManagementController::class)
            ->group(function () {
                Route::get('/', 'index')->name('index');
                Route::post('{user}/toggle-active', 'toggleActive')->name('toggle-active');
            });

        Route::prefix('requests')->name('requests.')->group(function () {
            Route::get('/', [RequestManagementController::class, 'index'])->name('index');
        });
    });
});

require __DIR__.'/settings.php';
