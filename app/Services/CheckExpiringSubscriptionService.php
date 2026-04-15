<?php

namespace App\Services;

use App\Models\User;
use App\Models\Subscription;
use App\Notifications\SubscriptionExpiring;

class CheckExpiringSubscriptionService
{
    public static function handle($user, array $daysBefore = [0]): void
    {
        $user->subscriptions()
            ->with('user')
            ->whereNotNull('next_billing_date')
            ->chunkById(100, function ($subscriptions) use ($daysBefore) {
                foreach ($subscriptions as $subscription) {
                    foreach ($daysBefore as $day) {
                        if (!is_int($day) || $day < 0) {
                            continue;
                        }

                        if (!$subscription->next_billing_date) {
                            continue;
                        }

                        $targetDate = today()->addDays($day);

                        if (!$subscription->next_billing_date->isSameDay($targetDate)) {
                            continue;
                        }

                        $notifiedDays = $subscription->notified_at ?? [];

                        if (in_array($day, $notifiedDays)) {
                            continue;
                        }

                        $daysUntil = max(
                            0,
                            now()->diffInDays($subscription->next_billing_date, false)
                        );

                        $subscription->user->notify(new SubscriptionExpiring(
                            subscriptionId: $subscription->id,
                            subscriptionName: $subscription->name,
                            nextBillingDate: (string) $subscription->next_billing_date,
                            daysBefore: $daysUntil,
                        ));

                        $notifiedDays[] = $day;

                        $subscription->update([
                            'notified_at' => array_values(array_unique($notifiedDays))
                        ]);
                    }
                }
            });
    }
}
