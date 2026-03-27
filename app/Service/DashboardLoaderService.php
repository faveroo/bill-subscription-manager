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
            'subscriptions' => User::find(Auth::id())->subscriptions()->get()->toArray(),
            'totalSubscriptions' => $this->totalSubscriptions(),
            'valueOfSubscriptions' => $this->valueOfSubscriptions(),
        ];
    }

    public function totalSubscriptions(): int
    {
        return Subscription::count();
    }

    public function valueOfSubscriptions(): float
    {
        return Subscription::sum('price');
    }


}