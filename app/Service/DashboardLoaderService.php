<?php

namespace App\Service;

use App\Models\User;
use Illuminate\Support\Facades\Auth;
use App\Models\Subscription;
use Carbon\Carbon;

class DashboardLoaderService
{
    public function load(): array
    {
        
        return [
            'subscriptions' => User::find(Auth::id())->subscriptions()->where('next_billing_date', '<=', Carbon::now()->addDays(10))->with('billingCycle')->get()->toArray(),
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