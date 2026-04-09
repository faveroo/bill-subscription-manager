<?php

namespace App\Console\Commands;

use App\Models\Subscription;
use Illuminate\Console\Attributes\Description;
use Illuminate\Console\Attributes\Signature;
use Illuminate\Console\Command;

#[Signature('app:update-next-billing')]
#[Description('Command description')]
class UpdateNextBilling extends Command
{
    /**
     * Execute the console command.
     */
    public function handle()
    {
        $subscriptions = Subscription::where('is_active', true)->count();
        $this->info("Found {$subscriptions} active subscriptions. Processing...");

        Subscription::where('is_active', true)
        ->with('billingCycle')
        ->chunkById(100, function ($subscriptions) {
            foreach ($subscriptions as $subscription) {
                if (!$this->checkLastBillingDate($subscription)) {
                    $this->info("Continuing");
                    continue;
                }

                $nextBillingDate = $this->calculateNextBillingDate(
                    $subscription->last_billing,
                    $subscription->billingCycle
                );

                if ($nextBillingDate) {
                    $this->info("Updating subscription ID {$subscription->id}");

                    $subscription->update([
                        'next_billing_date' => $nextBillingDate,
                        'last_billing' => $subscription->next_billing_date,
                    ]);

                    $this->persistHistory($subscription);

                    continue;
                } 

                $this->info("Subscription ID {$subscription->id} is not due for billing yet.");
            }
            });

        $this->info('Next billing dates updated successfully!');
    }

    private function calculateNextBillingDate($lastBilling, $billingCycle)
    {
        return match ($billingCycle->name) {
            'Semanal' => $lastBilling->copy()->addWeek(),
            'Mensal' => $lastBilling->copy()->addMonth(),
            'Anual' => $lastBilling->copy()->addYear(),
            default => null,
        };
    }

    private function checkLastBillingDate(Subscription $subscription): bool
    {
        if (!$subscription->last_billing  || !$subscription->next_billing_date) {
            return false;
        }

        return $subscription->next_billing_date->isToday() || $subscription->next_billing_date->isPast();
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
