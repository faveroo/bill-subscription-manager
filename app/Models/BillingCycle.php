<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;

#[Fillable(['name', 'interval_days'])]
class BillingCycle extends Model
{
    public function subscriptions()
    {
        return $this->hasMany(Subscription::class, 'billing_cycle_id');
    }
}
