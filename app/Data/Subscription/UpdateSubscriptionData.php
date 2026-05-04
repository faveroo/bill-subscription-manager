<?php

namespace App\Data\Subscription;

use App\Http\Requests\SubscriptionEditRequest;
use App\Models\Subscription;

class UpdateSubscriptionData
{
    public function __construct(
        public ?string $name = null,
        public ?float $price = null,
        public ?int $billingCycleId = null,
        public ?string $lastBilling = null,
        public ?int $category = null,
        public bool $resetNotifiedAt = false,
    ) {}

    public static function fromRequest(SubscriptionEditRequest $request): self
    {
        $validated = $request->validated();

        return new self(
            name: $validated['name'],
            price: (float) $validated['price'],
            billingCycleId: (int) $validated['billing_cycle_id'],
            lastBilling: $validated['last_billing'],
            category: (int) $validated['category_id'],
        );
    }

    public static function forBillingRollForward(Subscription $subscription): self
    {
        return new self(
            billingCycleId: $subscription->billing_cycle_id,
            lastBilling: $subscription->next_billing_date?->toDateString(),
            resetNotifiedAt: true,
        );
    }
}
