<?php

namespace App\Listeners;

use App\Events\SubscriptionCreated;
use App\Events\SubscriptionToggled;
use App\Services\BillingHistoryService;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class CreateBillingHistoryListener
{
    /**
     * Create the event listener.
     */
    public function __construct(protected BillingHistoryService $service)
    {
        //
    }

    /**
     * Handle the event.
     */
    public function handle(SubscriptionCreated|SubscriptionToggled $event): void
    {
        if ($event instanceof SubscriptionCreated) {
            $this->service->recordCreation($event->subscription);
        }

        if ($event instanceof SubscriptionToggled) {
            $this->service->recordToggle($event->subscription);
        }
    }
}
