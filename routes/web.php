<?php

use App\Http\Controllers\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware('guest')->group(function () {
    Route::inertia('/', 'auth/Login')->name('login');
    Route::post('/login', [AuthController::class, 'login'])->middleware('throttle:5,1');
    Route::inertia('/register', 'auth/Register')->name('register');
    Route::post('/register', [AuthController::class, 'store'])->middleware('throttle:5,1');
});

Route::middleware('auth')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout'])->name('logout');
    Route::inertia('/dashboard', 'main/Dashboard')->name('dashboard');

    Route::inertia('/subscriptions', 'subscriptions/Index')->name('subscriptions.index');

    Route::inertia('/categories', 'categories/Index')->name('categories.index');
    
    Route::inertia('/reports', 'reports/Index')->name('reports.index');
    
    Route::inertia('/settings', 'settings/Index')->name('settings.index');

});
