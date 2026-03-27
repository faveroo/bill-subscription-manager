<?php

namespace App\Http\Controllers;

use App\Models\BillingCycle;
use Illuminate\Http\Request;

class SubscriptionController extends Controller
{
    public function create()
    {
        return inertia('subscriptions/New', [
            'billingCycles' => BillingCycle::select('id', 'name')->get()
        ]);
    }

    public function store(Request $request)
    {
        return dd($request->all());
    }
}
