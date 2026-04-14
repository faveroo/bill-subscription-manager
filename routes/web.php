<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\MainController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\SubscriptionController;
use Illuminate\Support\Facades\Route;

Route::middleware('guest')->group(function () {
    Route::inertia('/', 'auth/Login')->name('login');
    Route::post('/login', [AuthController::class, 'login'])->middleware('throttle:5,1');
    Route::inertia('/register', 'auth/Register')->name('register');
    Route::post('/register', [AuthController::class, 'store'])->middleware('throttle:5,1');
});

Route::middleware('auth')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout'])->name('logout');
    Route::get('/dashboard', [MainController::class, 'dashboard'])->name('dashboard');

    Route::get('/notifications', [NotificationController::class, 'index'])->name('notifications.index');
    Route::patch('/notifications/{id}/read', [NotificationController::class, 'markAsRead'])->name('notifications.read');
    Route::patch('/notifications/read-all', [NotificationController::class, 'markAllAsRead'])->name('notifications.readAll');

    Route::get('/subscriptions', [SubscriptionController::class, 'index'])->name('subscriptions.index');
    Route::post('/subscriptions', [SubscriptionController::class, 'store'])->name('subscriptions.store');
    Route::get('/subscriptions/new', [SubscriptionController::class, 'create'])->name('subscriptions.new');
    Route::get('/subscriptions/{id}', [SubscriptionController::class, 'show'])->name('subscriptions.show');
    Route::put('/subscriptions/{id}', [SubscriptionController::class, 'update'])->name('subscriptions.update')->middleware('throttle:10,1');
    Route::patch('/subscriptions/{id}/toggle-active', [SubscriptionController::class, 'toggleActive'])->name('subscriptions.toggleActive')->middleware('throttle:10,1');
    Route::get('/subscriptions/{id}/edit', [SubscriptionController::class, 'edit'])->name('subscriptions.edit');
    Route::get('/subscriptions/{id}/history', [SubscriptionController::class, 'history'])->name('subscriptions.history');

    Route::inertia('/history', 'history/Index')->name('history.index');

    Route::inertia('/reports', 'reports/Index')->name('reports.index');

    Route::inertia('/settings', 'settings/Index')->name('settings.index');

    Route::inertia('/profile', 'profile/Index')->name('profile.index');
});
