<?php

namespace App\Services;

use App\Models\Subscription;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;

class DashboardLoaderService
{
    public function load(): array
    {
        $subscriptions = Auth::user()
            ->subscriptions()
            ->where('is_active', true)
            ->get();
        $events = [];
        foreach ($subscriptions as $subscription) {
            $date = $subscription->next_billing_date;
            $date = $date->toDateString();

            $events[$date][] = [
                'label' => $subscription->name,
                'type' => 'payable'
            ];
        }


        return [
            'subscriptions' => User::find(Auth::id())
                ->subscriptions()
                ->where('next_billing_date', '<=', Carbon::now()->addDays(10))
                ->where('is_active', true)
                ->with('billingCycle')
                ->get()
                ->toArray(),
            'totalSubscriptions' => $this->totalSubscriptions(),
            'valueOfSubscriptions' => $this->valueOfSubscriptions(),
            'totalAnnually' => $this->totalAnnually(),
            'events' => $events
        ];
    }

    public function totalSubscriptions(): int
    {

        return auth()
            ->user()
            ->subscriptions()
            ->where('is_active', true)
            ->count();
    }

    public function valueOfSubscriptions(): float
    {
        return auth()
            ->user()
            ->subscriptions()
            ->where('is_active', true)
            ->sum('price');
    }

    public function totalAnnually(): float
    {
        $startYear = today()->copy()->startOfYear();
        $endYear = today()->copy()->endOfYear();
        $totalAnnually = 0;
        $subscriptions = auth()->user()->subscriptions()->with('billingCycle')->get();

        foreach ($subscriptions as $subscription) {
            $billingDate = Carbon::parse($subscription->created_at);

            while ($billingDate < $startYear) {
                $billingDate = self::nextBillingDate($billingDate, $subscription->billingCycle->name);
            }

            while ($billingDate <= $endYear) {

                if ($subscription->inactivated_at && $billingDate >= $subscription->inactivated_at) {
                    break;
                }

                $totalAnnually += $subscription->price;

                $billingDate = self::nextBillingDate($billingDate, $subscription->billingCycle->name);
            }
        }

        return $totalAnnually;
    }

    private static function nextBillingDate(Carbon $date, string $cycle): Carbon
    {
        return match ($cycle) {
            'Semanal' => $date->copy()->addWeek(),
            'Mensal' => $date->copy()->addMonthNoOverflow(),
            'Anual' => $date->copy()->addYear(),
        };
    }
}
