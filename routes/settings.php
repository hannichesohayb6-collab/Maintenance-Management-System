<?php

use App\Http\Controllers\Settings\ProfileController;
use App\Http\Controllers\Settings\SecurityController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth'])->group(function () {
    Route::get('settings', fn () => redirect()->route('profile.edit'));

    Route::controller(ProfileController::class)->group(function () {
        Route::get('settings/profile', 'edit')->name('profile.edit');
        Route::post('settings/profile', 'update')->name('profile.update');
    });
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::post('settings/profile/delete', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('settings/security', [SecurityController::class, 'edit'])->name('security.edit');

    Route::post('settings/password', [SecurityController::class, 'update'])
        ->middleware('throttle:6,1')
        ->name('user-password.update');

    Route::inertia('settings/appearance', 'settings/appearance')->name('appearance.edit');
});
