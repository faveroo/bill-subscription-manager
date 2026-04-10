<?php

namespace App\Services;

use App\Models\Subscription;
use App\Notifications\SubscriptionExpiring;

class CheckExpiringSubscriptionService
{
    public static function handle(array $daysBefore = [0]): void
    {
        foreach ($daysBefore as $day) {
            if(!is_int($day) || $day < 0) {
                continue;
            }

            Subscription::with('user')
                ->whereBetween('next_billing_date', [today()->addDays($day)->startOfDay(), today()->addDays($day)->endOfDay()])
                ->chunkById(100, function ($subscriptions) use ($day) {
                    foreach ($subscriptions as $subscription) {
                        $subscription->refresh();
                        $user = $subscription->user;

                        if (!$user) {
                            continue;
                        }

                        $notifiedDays = $subscription->notified_at ?? [];

                        if(in_array($day, $notifiedDays)) {
                            continue;
                        }

                        $daysBefore = intVal(max(0, now()->diffInDays($subscription->next_billing_date, false)));
                        print_r($daysBefore);

                        $user->notify(new SubscriptionExpiring(
                            subscriptionId: $subscription->id,
                            subscriptionName: $subscription->name,
                            nextBillingDate: (string) $subscription->next_billing_date,
                            daysBefore: $daysBefore,
                        ));

                        $notifiedDays[] = $day;

                        $subscription->update(['notified_at' => array_values(array_unique($notifiedDays))]);
                    }
                return;
                });
        }
    }
}