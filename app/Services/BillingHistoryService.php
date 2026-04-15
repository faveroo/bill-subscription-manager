<?php

namespace App\Services;

use App\Models\Subscription;
use App\Enums\BillingHistoryType;

class BillingHistoryService
{
    public function recordCreation(Subscription $subscription): void
    {
        $this->create($subscription, BillingHistoryType::ACTIVATION);
    }

    public function recordToggle(Subscription $subscription): void
    {
        $type = $subscription->is_active
            ? BillingHistoryType::REACTIVATION
            : BillingHistoryType::CANCELLATION;

        $this->create($subscription, $type);
    }

    private function create(Subscription $subscription, BillingHistoryType $type): void
    {
        $subscription->billingHistories()->create([
            'user_id' => $subscription->user_id,
            'event_date' => now(),
            'amount' => $subscription->price,
            'type' => $type->value,
        ]);
    }
}
