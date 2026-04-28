<?php

namespace App\Services;

use App\Data\Subscription\CreateSubscriptionData;
use App\Models\Subscription;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
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
                'description' => $data->description,
                'last_billing' => $lastBilling,
            ]);

            event(new SubscriptionCreated($subscription));

            return $subscription;
        });
    }

    public function update(Subscription $subscription, array $data): Subscription
    {
        $previousLastBilling = optional($subscription->last_billing)->toDateString();

        $subscription->update($data);

        if ($data['last_billing'] !== $previousLastBilling) {
            app(CheckExpiringSubscriptionService::class)->handle($subscription->user);
        }

        return $subscription;
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
