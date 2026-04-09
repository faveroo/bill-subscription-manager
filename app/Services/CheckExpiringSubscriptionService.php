<?php

namespace App\Services;

use App\Models\Subscription;
use App\Notifications\SubscriptionExpiring;

class CheckExpiringSubscriptionService
{
    public static function handle(array $daysBefore = [0]): void
    {
        foreach ($daysBefore as $days) {
            if(!is_int($days) || $days < 0) {
                continue;
            }

            Subscription::with('user')
                ->whereDate('next_billing_date', today()->addDays($days))
                ->chunkById(100, function ($subscriptions) use ($days) {
                    foreach ($subscriptions as $subscription) {
                        $user = $subscription->user;

                        if (!$user) {
                            continue;
                        }

                        $alreadyNotified = $user->notifications()
                            ->where('type', SubscriptionExpiring::class)
                            ->where('data->subscription_id', $subscription->id)
                            ->where('data->days_before', $days)
                            ->exists();

                        if ($alreadyNotified) {
                            continue;
                        }

                        $user->notify(new SubscriptionExpiring(
                            subscriptionId: $subscription->id,
                            subscriptionName: $subscription->name,
                            nextBillingDate: (string) $subscription->next_billing_date,
                            daysBefore: $days,
                        ));

                        $subscription->forceFill(['notified_at' => now()])->saveQuietly();
                    }
                });
        }
    }
}