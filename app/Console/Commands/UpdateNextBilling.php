<?php

namespace App\Console\Commands;

use App\Events\SubscriptionPaid;
use App\Models\Subscription;
use App\Services\SubscriptionService;
use Illuminate\Console\Attributes\Description;
use Illuminate\Console\Attributes\Signature;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;

#[Signature('app:update-next-billing')]
#[Description('Command description')]
class UpdateNextBilling extends Command
{
    /**
     * Execute the console command.
     */
    public function handle()
    {
        Subscription::where('is_active', true)
            ->where('next_billing_date', '<=', now())
            ->with('billingCycle')
            ->chunkById(100, function ($subscriptions) {
                foreach ($subscriptions as $subscription) {
                    DB::transaction(function () use ($subscription) {
                        $subscription->refresh();

                        $nextBillingDate = $this->calculateNextBillingDate(
                            $subscription->next_billing_date,
                            $subscription->billingCycle
                        );

                        if (!$nextBillingDate) {
                            return;
                        }

                        SubscriptionService::update($subscription, [
                            'last_billing' => $subscription->next_billing_date,
                            'next_billing_date' => $nextBillingDate,
                        ]);

                        event(new SubscriptionPaid($subscription));
                    });
                }
            });
    }

    private function calculateNextBillingDate($lastBilling, $billingCycle)
    {
        return match ($billingCycle->name) {
            'Semanal' => $lastBilling->copy()->addWeek(),
            'Mensal' => $lastBilling->copy()->addMonthNoOverflow(),
            'Anual' => $lastBilling->copy()->addYear(),
            default => null,
        };
    }
}
