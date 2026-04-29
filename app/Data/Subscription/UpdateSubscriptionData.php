<?php

namespace App\Data\Subscription;

use App\Http\Requests\SubscriptionEditRequest;
use Illuminate\Http\Request;

class UpdateSubscriptionData
{
    public function __construct(
        public ?string $name,
        public ?float $price,
        public ?string $billingCycleId,
        public ?string $lastBilling,
        public ?int $category,
    ) {}

    public static function fromRequest(SubscriptionEditRequest $request): self
    {
        $validated = $request->validated();

        return new self(
            name: $validated['name'],
            price: (float) $validated['price'],
            billingCycleId: $validated['billing_cycle_id'],
            lastBilling: $validated['last_billing'],
            category: $validated['category_id'],
        );
    }
}
