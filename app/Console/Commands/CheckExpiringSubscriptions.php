<?php

namespace App\Console\Commands;

use App\Models\Subscription;
use App\Notifications\SubscriptionExpiring;
use Carbon\Carbon;
use Illuminate\Console\Command;

class CheckExpiringSubscriptions extends Command
{
    protected $signature = 'subscriptions:check-expiring';
    protected $description = 'Notifica usuários sobre assinaturas próximas do vencimento';

    public function handle()
    {
        $daysBefore = [7, 3, 1, 0]; // múltiplos lembretes
        $this->info('Verificando assinaturas próximas do vencimento...');

        foreach ($daysBefore as $days) {
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

        $this->info('Notificações processadas!');
    }
}

