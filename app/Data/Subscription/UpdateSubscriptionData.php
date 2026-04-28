<?php

namespace App\Data\Subscription;

use Illuminate\Http\Request;

class UpdateSubscriptionData
{
    public function __construct(
        public ?string $name,
        public ?float $price,
        public ?string $billingCycle,
        public ?int $category,
    ) {}

    public static function fromRequest(Request $request): self
    {
        return new self(
            name: $request->input('name'),
            price: (float) $request->input('price'),
            billingCycle: $request->input('billing_cycle_id'),
            category: $request->input('category_id')
        );
    }
}
