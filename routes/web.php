<?php

use App\Http\Controllers\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware('guest')->group(function () {
    Route::inertia('/', 'auth/Login')->name('login');
    Route::post('/login', [AuthController::class, 'login']);
    Route::inertia('/register', 'auth/Register')->name('register');
    Route::post('/register', [AuthController::class, 'store']);
});
