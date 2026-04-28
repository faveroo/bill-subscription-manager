<?php

namespace App\Data\Subscription;

use Illuminate\Http\Request;

class CreateSubscriptionData
{
    public function __construct(
        public string $name,
        public float $price,
        public string $lastBilling,
        public int $category,
        public int $billingCycle,
        public ?string $description,
        public int $userId,
        public int $freeTrialDays
    ) {}

    public static function fromRequest(Request $request): self
    {
        return new self(
            name: $request->input('name'),
            price: (float) $request->input('price'),
            lastBilling: $request->input('last_billing'),
            category: $request->input('category_id'),
            billingCycle: $request->input('billing_cycle_id'),
            description: $request->input('description'),
            userId: auth()->id(),
            freeTrialDays: $request->input('free_trial_days')
        );
    }
}
