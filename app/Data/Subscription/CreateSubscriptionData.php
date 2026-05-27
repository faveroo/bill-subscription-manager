<?php

namespace App\Data\Subscription;

use App\Http\Requests\SubscriptionRequest;

class CreateSubscriptionData
{
    public function __construct(
        public string $name,
        public float $price,
        public string $lastBilling,
        public int $category,
        public int $billingCycle,
        public int $userId,
        public string $service_url,
        public string $login_identifier,
        public string $notes,
        public ?int $freeTrialDays
    ) {}

    public static function fromRequest(SubscriptionRequest $request): self
    {
        $validated = $request->validated();

        return new self(
            name: $validated['name'],
            price: (float) $validated['price'],
            lastBilling: $validated['last_billing'],
            billingCycle: $validated['billing_cycle_id'],
            category: $validated['category_id'],
            service_url: $validated['service_url'],
            login_identifier: $validated['login_identifier'],
            notes: $validated['notes'],
            userId: auth()->id(),
            freeTrialDays: $validated['free_trial_days']
        );
    }
}
