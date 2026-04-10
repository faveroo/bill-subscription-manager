<?php

namespace App\Console\Commands;

use App\Models\Subscription;
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

                        if ($this->checkLastBillingDate($subscription)) {
                            return;
                        }

                        $nextBillingDate = $this->calculateNextBillingDate(
                            $subscription->last_billing_date,
                            $subscription->billingCycle
                        );

                        if (!$nextBillingDate) {
                            return;
                        }

                        $subscription->update([
                            'last_billing' => $subscription->next_billing_date,
                            'next_billing_date' => $nextBillingDate,
                        ]);
                    
                        $subscription->billingHistories()->create([
                            'user_id' => $subscription->user_id,
                            'billing_date' => $subscription->last_billing,
                            'amount' => $subscription->price,
                        ]);
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

    private function checkLastBillingDate(Subscription $subscription): bool
    {
        if (!$subscription->last_billing  || !$subscription->next_billing_date) {
            return false;
        }

        return $subscription->last_billing_date > now();
    }

    private function persistHistory(Subscription $subscription): void
    {
        $subscription->billingHistories()->create([
            'user_id' => $subscription->user_id,
            'billing_date' => $subscription->next_billing_date,
            'amount' => $subscription->price,
        ]);
    }
}
