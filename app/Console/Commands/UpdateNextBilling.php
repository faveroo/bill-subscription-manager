<?php

namespace App\Console\Commands;

use App\Data\Subscription\UpdateSubscriptionData;
use App\Events\SubscriptionPaid;
use App\Models\Subscription;
use App\Services\SubscriptionService;
use Illuminate\Console\Attributes\Description;
use Illuminate\Console\Attributes\Signature;
use Illuminate\Console\Command;

#[Signature('app:update-next-billing')]
#[Description('Command description')]
class UpdateNextBilling extends Command
{
    public function __construct(private SubscriptionService $service)
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     */
    public function handle(): int
    {
        $updatedSubscriptions = 0;

        Subscription::where('is_active', true)
            ->where('next_billing_date', '<=', now())
            ->with('billingCycle')
            ->chunkById(100, function ($subscriptions) use (&$updatedSubscriptions) {
                foreach ($subscriptions as $subscription) {
                    $subscription->refresh();

                    if (!$subscription->next_billing_date) {
                        continue;
                    }

                    $updatedSubscription = $this->service->update(
                        $subscription,
                        UpdateSubscriptionData::forBillingRollForward($subscription),
                    );

                    event(new SubscriptionPaid($updatedSubscription));

                    $updatedSubscriptions++;
                }
            });

        $this->info("{$updatedSubscriptions} assinatura(s) atualizada(s).");

        return self::SUCCESS;
    }
}
