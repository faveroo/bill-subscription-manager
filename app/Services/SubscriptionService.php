<?php

namespace App\Services;

use App\Models\Subscription;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use App\Events\SubscriptionCreated;
use App\Events\SubscriptionToggled;

class SubscriptionService
{
    public static function create(User $user, array $data): Subscription
    {
        return DB::transaction(function () use ($user, $data) {
            $data['last_billing'] = Carbon::parse($data['last_billing'])
                ->addDays(intval($data['free_trial_days'] ?? 0));

            $subscription = $user->subscriptions()->create($data);

            event(new SubscriptionCreated($subscription));

            return $subscription;
        });
    }

    public function update(Subscription $subscription, array $data): Subscription
    {
        $previousLastBilling = optional($subscription->last_billing)->toDateString();

        $subscription->update($data);

        if ($data['last_billing'] !== $previousLastBilling) {
            app(CheckExpiringSubscriptionService::class)->handle($subscription->user);
        }

        return $subscription;
    }


    public static function toggle(Subscription $subscription): Subscription
    {
        return DB::transaction(function () use ($subscription) {
            $subscription->update([
                'is_active' => !$subscription->is_active
            ]);

            event(new SubscriptionToggled($subscription));

            return $subscription;
        });
    }
}
