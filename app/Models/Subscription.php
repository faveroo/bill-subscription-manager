<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;

#[Fillable(['subscription_id', 'user_id', 'name', 'price', 'next_billing_date', 'billing_cycle_id', 'last_billing'])]
class Subscription extends Model
{
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function billingCycle(): BelongsTo
    {
        return $this->belongsTo(BillingCycle::class, 'billing_cycle_id');
    }

    public function getNextBillingDate()
    {
        $date = Carbon::parse($this->attributes['last_billing']);
        return match($this->billingCycle->name) {
            'Semanal' => $date->addWeek(),
            'Mensal' => $date->addMonthNoOverflow(),
            'Trimestral' => $date->addMonthNoOverflow(3),
            'Anual' => $date->addYear(),
            default => throw new \Exception('Ciclo de cobrança desconhecido'),
        };
    }

    protected static function booted()
    {
        static::saving(function ($subscription) {
            $subscription->next_billing_date = $subscription->getNextBillingDate();
        });
    }
}
