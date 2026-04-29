<?php

namespace App\Services;

use App\Data\Subscription\CreateSubscriptionData;
use App\Data\Subscription\UpdateSubscriptionData;
use App\Models\Subscription;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use App\Events\SubscriptionCreated;
use App\Events\SubscriptionToggled;

class SubscriptionService
{
    public function create(CreateSubscriptionData $data): Subscription
    {
        $user = User::findOrFail($data->userId);

        return DB::transaction(function () use ($user, $data) {
            $lastBilling = $this->calculateLastBilling(
                $data->lastBilling,
                $data->freeTrialDays
            );

            $subscription = $user->subscriptions()->create([
                'name' => $data->name,
                'price' => $data->price,
                'billing_cycle_id' => $data->billingCycle,
                'category_id' => $data->category,
                'last_billing' => $lastBilling,
            ]);

            event(new SubscriptionCreated($subscription));

            return $subscription;
        });
    }

   public function update(Subscription $subscription, UpdateSubscriptionData $data): Subscription
    {
        return DB::transaction(function () use ($subscription, $data) {
            $previousLastBilling = $subscription->last_billing?->toDateString();

            if ($data->name !== null) {
                $subscription->name = $data->name;
            }

            if ($data->price !== null) {
                $subscription->price = $data->price;
            }

            if ($data->category !== null) {
                $subscription->category_id = $data->category;
            }

            if ($data->billingCycleId !== null) {
                $subscription->billing_cycle_id = $data->billingCycleId;
            }

            if ($data->lastBilling !== null) {
                $subscription->last_billing = $this->calculateLastBilling(
                    $data->lastBilling,
                    0
                );
            }

            $subscription->save();

            return $subscription->fresh();
        });
    }


    public function toggle(Subscription $subscription): Subscription
    {
        return DB::transaction(function () use ($subscription) {
            $subscription->update([
                'is_active' => !$subscription->is_active,
                'inactivated_at' => !$subscription->is_active ? null : now()
            ]);

            event(new SubscriptionToggled($subscription));

            return $subscription;
        });
    }

    protected function calculateLastBilling(string $lastBilling, ?int $freeTrialDays): Carbon
    {
        return Carbon::parse($lastBilling)
            ->addDays($freeTrialDays ?? 0);
    }
}
