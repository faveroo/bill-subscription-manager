<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;

class DashboardLoaderService
{
    public function load(): array
    {
        $subscriptions = Auth::user()->subscriptions()->where('is_active', true)->get();
        $events = [];
        foreach($subscriptions as $subscription) {
            $date = $subscription->next_billing_date;
            $date = $date->toDateString();
            
            $events[$date][] = [
                'label' => $subscription->name,
                'type' => 'payable'
            ];
        }


        return [
            'subscriptions' => User::find(Auth::id())->subscriptions()->where('next_billing_date', '<=', Carbon::now()->addDays(10))->with('billingCycle')->get()->toArray(),
            'totalSubscriptions' => $this->totalSubscriptions(),
            'valueOfSubscriptions' => $this->valueOfSubscriptions(),
            'events' => $events
        ];
    }

    public function totalSubscriptions(): int
    {

        return auth()->user()->subscriptions()->where('is_active', true)->count();
    }

    public function valueOfSubscriptions(): float
    {
        return auth()->user()->subscriptions()->where('is_active', true)->sum('price');
    }


}