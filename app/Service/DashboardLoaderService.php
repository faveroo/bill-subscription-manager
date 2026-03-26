<?php

namespace App\Service;

use App\Models\User;
use Illuminate\Support\Facades\Auth;
use App\Models\Subscription;

class DashboardLoaderService
{
    public function load(): array
    {
        return [
            'subscriptions' => User::find(Auth::id())->subscriptions()->get(),
        ];
    }
}