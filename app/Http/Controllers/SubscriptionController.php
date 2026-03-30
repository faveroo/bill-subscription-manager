<?php

namespace App\Http\Controllers;

use App\Models\BillingCycle;
use App\Models\Subscription;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class SubscriptionController extends Controller
{   
    public function index()
    {
        $subscriptions = Auth::user()->subscriptions()->with('billingCycle')->get();
        return inertia('subscriptions/Index', [
            'subscriptions' => $subscriptions
        ]);
    }
    public function create()
    {
        return inertia('subscriptions/New', [
            'billingCycles' => BillingCycle::select('id', 'name')->get()
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'price' => ['required', 'numeric', 'min:0'],
            'billing_cycle_id' => ['required', 'exists:billing_cycles,id'],
            'last_billing' => ['required', 'date'],
        ]);

        /** @var \App\Models\User $user */
        $user = Auth::user();
        $subscription = $user->subscriptions()->create($data);
        return redirect()->route('subscriptions.show', $subscription->id)->with('success', 'Assinatura criada com sucesso!');
    }

    public function show($id)
    {
            /** @var \App\Models\User $user */
            $user = Auth::user();
            $subscription = $user->subscriptions()->with('billingCycle')->findOrFail($id);
            dd($subscription);
    }
}
